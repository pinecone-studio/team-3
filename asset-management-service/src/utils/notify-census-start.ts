// Add to src/services/notifications.ts

export async function notifyCensusStart(context: any, employee: { email: string; name: string }, censusName: string, assetTags: string[]) {
	try {
		const html = `
      <div style="font-family: sans-serif; color: #0f172a; max-width: 600px;">
          <h2 style="color: #0f172a;">Action Required: Inventory Census</h2>
          <p>Hello <strong>${employee.name}</strong>,</p>
          <p>A new census event <strong>"${censusName}"</strong> has started. Please verify the following equipment in your possession:</p>
          
          <div style="background: #f8fafc; border-left: 4px solid #ffc300; padding: 15px; margin: 20px 0;">
              <ul style="margin: 0; padding-left: 20px;">
                  ${assetTags.map((tag) => `<li style="margin-bottom: 8px;"><strong>${tag}</strong></li>`).join('')}
              </ul>
          </div>

          <a href="${context.env.FRONTEND_URL}/employee-dashboard" 
             style="padding: 12px 24px; background-color: #0f172a; color: #ffc300; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Confirm My Assets
          </a>
      </div>
    `;

		await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: 'Pinequest <noreply@pinequest.winnerscourse.com>',
				to: [employee.email],
				subject: `Inventory Census: ${censusName}`,
				html,
			}),
		});
	} catch (err) {
		console.error('Census Notification Error:', err);
	}
}
