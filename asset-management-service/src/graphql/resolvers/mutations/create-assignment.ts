import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { SignJWT } from 'jose';
import { AssetStatusEnum, MutationResolvers, Response } from '../../../types/generated';
import { assignments, employees } from '../../../db';
import * as schema from '../../../db';

export const createAssignment: MutationResolvers['createAssignment'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB, { schema });
	const assignmentId = crypto.randomUUID();

	try {
		// 1. AVAILABILITY CHECK
		const targetAsset = await DB.query.assets.findFirst({
			where: (assets, { eq }) => eq(assets.id, input.assetId),
			with: {
				category: true,
			},
		});

		if (!targetAsset) {
			throw new Error('Asset not found.');
		}

		if (targetAsset.status !== AssetStatusEnum.Available) {
			throw new Error(`Cannot assign: Asset is currently ${targetAsset.status}.`);
		}

		// 2. INSERT ASSIGNMENT
		await DB.insert(assignments).values({
			id: assignmentId,
			assetId: input.assetId,
			employeeId: input.employeeId,
			assignedAt: input.assignedAt ? new Date(input.assignedAt) : new Date(),
			conditionAtAssign: input.conditionAtAssign,
			accessoriesJson: input.accessoriesJson ?? undefined,
		});

		// 3. FETCH EMPLOYEE FOR EMAIL
		const [employee] = await DB.select().from(employees).where(eq(employees.id, input.employeeId));

		if (employee?.email) {
			const secret = new TextEncoder().encode(context.env.JWT_SECRET);

			// 🔥 CHANGE: Sign the employeeId (sub) instead of assignmentId
			// This allows the frontend to query for ALL pending items for this person.
			const token = await new SignJWT({ employeeId: employee.id })
				.setProtectedHeader({ alg: 'HS256' })
				.setIssuedAt()
				.setExpirationTime('72h')
				.sign(secret);

			const frontendUrl = context.env.FRONTEND_URL || 'http://localhost:3000';

			// 🔥 CHANGE: Update path to reflect a "Portal" or "Verification" view
			const magicLink = `${frontendUrl}/test-sign?token=${token}`;

			await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					from: 'Asset Manager <noreply@pinequest.winnerscourse.com>',
					to: employee.email,
					subject: 'Action Required: Equipment Assignment Signature',
					html: `
                        <p>Hello ${employee.firstName},</p>
                        <p>New equipment (<strong>${targetAsset.category?.name || 'Asset'}</strong>) has been assigned to you.</p>
                        <p>Please click the link below to review all pending items and provide your signature:</p>
                        <a href="${magicLink}" style="padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">Review & Sign Equipment</a>
                        <p>Note: This link will show you all items currently waiting for your verification.</p>
                    `,
				}),
			});
		}

		return Response.Success;
	} catch (error) {
		console.error('Create Assignment Error:', error);
		return Response.Failed;
	}
};
