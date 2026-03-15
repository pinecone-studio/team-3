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
		// We fetch the asset first to verify it is actually available for a new assignment.
		const targetAsset = await DB.query.assets.findFirst({
			where: (assets, { eq }) => eq(assets.id, input.assetId),
			with: {
				category: true, // This pulls in the related Category object
			},
		});

		if (!targetAsset) {
			throw new Error('Asset not found.');
		}

		// Strict check: Only allow the process to start if status is 'AVAILABLE'
		if (targetAsset.status !== AssetStatusEnum.Available) {
			throw new Error(`Cannot assign: Asset is currently ${targetAsset.status}.`);
		}

		await DB.insert(assignments).values({
			id: assignmentId,
			assetId: input.assetId,
			employeeId: input.employeeId,
			assignedAt: input.assignedAt ? new Date(input.assignedAt) : new Date(),
			conditionAtAssign: input.conditionAtAssign,
			accessoriesJson: input.accessoriesJson ?? undefined,
		});

		const [employee] = await DB.select().from(employees).where(eq(employees.id, input.employeeId));

		if (employee?.email) {
			const secret = new TextEncoder().encode(context.env.JWT_SECRET);
			const token = await new SignJWT({ assignmentId })
				.setProtectedHeader({ alg: 'HS256' })
				.setIssuedAt()
				.setExpirationTime('72h')
				.sign(secret);

			const frontendUrl = context.env.FRONTEND_URL || 'http://localhost:3000';
			const magicLink = `${frontendUrl}/test-sign?token=${token}`;

			await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					from: 'Inventory System <onboarding@resend.dev>',
					to: employee.email,
					subject: 'Action Required: Equipment Assignment Signature',
					html: `
                        <p>Hello ${employee.firstName},</p>
                        <p>An asset (<strong>${targetAsset.category?.name}</strong>) has been prepared for you.</p>
                        <p>Please click the link below to verify its condition and sign to complete the assignment:</p>
                        <a href="${magicLink}" style="padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">Sign for Equipment</a>
                        <p>This link will expire in 72 hours.</p>
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
