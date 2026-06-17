import { OpenAI } from 'openai';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request, env, ctx) {
		if (request.method === 'OPTIONS') {
			return new Response(JSON.stringify({}, { status: 200, headers: corsHeaders }));
		}

		if (request.method !== 'POST') {
			return new Response(
				JSON.stringify(
					{
						message: 'Method not allowed!',
					},
					{ status: 405, headers: corsHeaders },
				),
			);
		}


		try {
			const openai = new OpenAI({
				apiKey: env.OPENAI_KEY,
				baseURL: env.API_URL,
			});

			const data = await request.json();

			const res = await openai.chat.completions.create({
				model: env.AI_MODEL,
				messages: data,
			});

			return new Response(JSON.stringify(res.choices[0].message), {
				status: 200,
				headers: corsHeaders,
			});
		} catch (error) {
			return new Response(
				JSON.stringify(
					{
						message: 'Somthing went wrong' + error.message,
					},
					{
						status: 500,
						headers: corsHeaders,
					},
				),
			);
		}
	},
};
