// src/services/notifications.ts
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db';

export async function notifyAdmins(
	context: any,
	assetId: string,
	type: 'MANUAL_UPDATE' | 'SIGNATURE',
	details?: { status?: string; employeeName?: string },
) {
	const DB = drizzle(context.env.DB, { schema });

	try {
		// 1. Fetch the Asset & Admins in parallel for speed
		const [assetData, admins] = await Promise.all([
			DB.query.assets.findFirst({
				where: (assets, { eq }) => eq(assets.id, assetId),
				with: { category: true },
			}),
			DB.query.employees.findMany({
				where: (employees, { eq }) => eq(employees.isAdmin, true),
				columns: { email: true },
			}),
		]);

		if (!assetData || admins.length === 0) return;

		const adminEmails = admins.map((a) => a.email);
		const isSignature = type === 'SIGNATURE';

		// 2. Construct the Email
		const subject = isSignature ? `✅ Equipment Verified: ${assetData.assetTag}` : `⚠️ Asset Updated: ${assetData.assetTag}`;

		const html = `
            <div style="font-family: sans-serif; color: #0f172a; max-width: 600px;">
                <h2 style="color: ${isSignature ? '#10b981' : '#0f172a'};">
                    ${isSignature ? 'Signature Received' : 'Asset Modified'}
                </h2>
                <p>Asset <strong>${assetData.assetTag}</strong> (${assetData.category?.name || 'Equipment'}) was ${isSignature ? 'officially signed for' : 'updated'}.</p>
                
                <div style="background: #f8fafc; border-left: 4px solid #ffc300; padding: 15px; margin: 20px 0;">
                    ${details?.employeeName ? `<p><strong>Employee:</strong> ${details.employeeName}</p>` : ''}
                    ${details?.status ? `<p><strong>New Status:</strong> ${details.status}</p>` : ''}
                    <p><strong>System ID:</strong> ${assetId}</p>
                </div>

                <a href="${context.env.FRONTEND_URL}/inventory/${assetId}" 
                   style="padding: 12px 24px; background-color: #0f172a; color: #ffc300; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                    View in Pinequest
                </a>
            </div>
        `;

		// 3. Fire to Resend
		await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: 'Pinequest <noreply@pinequest.winnerscourse.com>',
				to: adminEmails,
				subject,
				html,
			}),
		});
	} catch (err) {
		console.error('Notification Service Error:', err);
	}
}
