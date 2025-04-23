'use server';

import { streamText, smoothStream } from 'ai';
import { getSystemPrompt } from '@/utils/prompts/prompts';
import { createStreamableValue } from 'ai/rsc';
import { thinkingModel } from './models';

function smoothTextStream() {
    return smoothStream({
        chunking: 'word',
        delayInMs: 0,
    });
}

export async function generateQuestions(prompt: string) {
    const stream = createStreamableValue('');

    (async () => {
        const { textStream } = streamText({
            model: thinkingModel,
            system: getSystemPrompt(),
            prompt,
            experimental_transform: smoothTextStream(),
        });

        for await (const delta of textStream) {
            stream.update(delta);
        }

        stream.done();
    })();

    return { output: stream.value };
}
