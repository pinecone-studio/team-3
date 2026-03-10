import { CloudflareWorkersHandler } from '@as-integrations/cloudflare-workers';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export const corsWrapper =
	(handler: CloudflareWorkersHandler<Env>): CloudflareWorkersHandler<Env> =>
	async (request, env, ctx) => {
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: corsHeaders,
			});
		}

		const response = await handler(request, env, ctx);

		const newHeaders = new Headers(response.headers);
		Object.entries(corsHeaders).forEach(([k, v]) => newHeaders.set(k, v));

		return new Response(response.body, {
			status: response.status,
			headers: newHeaders,
		});
	};
