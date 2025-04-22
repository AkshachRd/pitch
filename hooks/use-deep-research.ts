import { useState } from 'react';
import { streamText, smoothStream } from 'ai';
import { addToast } from '@heroui/react';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

import { useTaskStore } from '@/store/task';
import { getSystemPrompt, generateQuestionsPrompt } from '@/utils/prompts/prompts';
import { parseError } from '@/utils/error';

function getResponseLanguagePrompt(lang: string) {
    return `**Respond in ${lang}**`;
}

function removeJsonMarkdown(text: string) {
    text = text.trim();
    if (text.startsWith('```json')) {
        text = text.slice(7);
    } else if (text.startsWith('json')) {
        text = text.slice(4);
    } else if (text.startsWith('```')) {
        text = text.slice(3);
    }
    if (text.endsWith('```')) {
        text = text.slice(0, -3);
    }

    return text.trim();
}

function smoothTextStream() {
    return smoothStream({
        chunking: 'word',
        delayInMs: 0,
    });
}

function handleError(error: unknown) {
    const errorMessage = parseError(error);

    addToast({
        title: 'Deep search error',
        description: errorMessage,
        color: 'danger',
    });
}

const openrouterApiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

if (!openrouterApiKey) {
    throw new Error('OPENROUTER_API_KEY environment variable is not set');
}

const openrouter = createOpenRouter({ apiKey: openrouterApiKey });
const model = openrouter('deepseek/deepseek-r1:free');

export function useDeepResearch() {
    const taskStore = useTaskStore();
    const [status, setStatus] = useState<string>('');

    async function askQuestions() {
        const { question } = useTaskStore.getState();

        setStatus('Thinking...');
        const result = streamText({
            model,
            system: getSystemPrompt(),
            prompt: [generateQuestionsPrompt(question), getResponseLanguagePrompt('english')].join(
                '\n\n',
            ),
            experimental_transform: smoothTextStream(),
            onError: handleError,
        });
        let content = '';

        taskStore.setQuestion(question);
        for await (const textPart of result.textStream) {
            content += textPart;
            taskStore.updateQuestions(content);
        }
    }

    return {
        status,
        askQuestions,
    };
}
