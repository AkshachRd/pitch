import { streamText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import {
    generateQuestionsPrompt,
    getResponseLanguagePrompt,
    getSystemPrompt,
} from '@/utils/prompts/prompts';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const openrouterApiKey = process.env.OPENROUTER_API_KEY;

if (!openrouterApiKey) {
    throw new Error('OPENROUTER_API_KEY environment variable is not set');
}

const openrouter = createOpenRouter({ apiKey: openrouterApiKey });
const model = openrouter('deepseek/deepseek-r1:free');

export async function POST(req: Request) {
    const { question, language }: { question: string; language: string } = await req.json();

    const result = streamText({
        model,
        system: getSystemPrompt(),
        prompt: [generateQuestionsPrompt(question), getResponseLanguagePrompt(language)].join(
            '\n\n',
        ),
    });

    return result.toDataStreamResponse();
}
