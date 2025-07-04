import { streamText } from 'ai';

import { getSystemPrompt } from '../lib/prompts';

import { fleshModel } from '@/shared/ai/llm-models';

export async function POST(req: Request) {
    const { prompt }: { prompt: string } = await req.json();

    const result = streamText({
        model: fleshModel,
        system: getSystemPrompt(),
        prompt,
        onFinish: (result) => {
            console.log(result);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    return result.toDataStreamResponse();
}
