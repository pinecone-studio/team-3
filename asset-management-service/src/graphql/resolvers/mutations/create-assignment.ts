import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm'; // Import eq for the employee lookup
import { SignJWT } from 'jose'; // Recommended for Cloudflare Workers
import { MutationResolvers, Response } from '../../../types/generated';
import { assignments } from '../../../db/schema/assigments.schema';
import { employees } from '../../../db/schema/employees.schema'; // Import your employee schema

export const createAssignment: MutationResolvers['createAssignment'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);
	const assignmentId = crypto.randomUUID();

	try {
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
			console.log('email', employee.email);

			const secret = new TextEncoder().encode(context.env.JWT_SECRET);
			const token = await new SignJWT({ assignmentId })
				.setProtectedHeader({ alg: 'HS256' })
				.setIssuedAt()
				.setExpirationTime('72h')
				.sign(secret);

			const magicLink = `https://your-inventory-app.mn/sign/${token}`;
			const demoLink = 'https://winnerscourse.com';
			console.log(context.env.JWT_SECRET, context.env.RESEND_API_KEY, context.env.DB);
			await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					from: 'Acme <onboarding@resend.dev>',
					to: employee.email,
					subject: 'Action Required: Equipment Assignment Signature',
					html: `
			            <p>Hello ${employee.firstName},</p>
			            <p>An asset has been assigned to you. Please click the link below to verify the condition and sign for the item:</p>
			            <a href="${demoLink}" style="padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">Sign for Equipment</a>
			            <p>This link will expire in 48 hours.</p>
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
