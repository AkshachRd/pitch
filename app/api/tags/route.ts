import { streamText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const openrouterApiKey = process.env.OPENROUTER_API_KEY;

if (!openrouterApiKey) {
    throw new Error('OPENROUTER_API_KEY environment variable is not set');
}

const openrouter = createOpenRouter({ apiKey: openrouterApiKey });
const model = openrouter('deepseek/deepseek-chat-v3-0324:free');

export async function POST(req: Request) {
    const { prompt }: { prompt: string } = await req.json();

    const result = streamText({
        model,
        prompt: `Generate tags for a card in this context: ${prompt}.
        Write only generated tags separated by commas, no other text. Use lowercase letters.`,
        onFinish: (result) => {
            console.log(result);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    return result.toDataStreamResponse();
}
