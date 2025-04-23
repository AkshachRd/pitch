'use server';

import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouterApiKey = process.env.OPENROUTER_API_KEY;

if (!openrouterApiKey) {
    throw new Error('OPENROUTER_API_KEY environment variable is not set');
}

const openrouter = createOpenRouter({ apiKey: openrouterApiKey });
export const thinkingModel = openrouter('deepseek/deepseek-r1:free');
