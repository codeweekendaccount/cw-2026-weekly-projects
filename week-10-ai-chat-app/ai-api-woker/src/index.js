import { OpenAI } from 'openai';

export default {
	async fetch(request, env) {
		const openai = new OpenAI({
			apiKey: env.OPENAI_KEY,
			baseURL: env.API_URL,
		});

		const res = await openai.chat.completions.create({
			model: env.AI_MODEL,
			messages: [
				{
					role: 'user',
					content:
						'who is creator of javascript',
				},
			],
		});

		return new Response(JSON.stringify(res.choices[0].message));
	},
};
