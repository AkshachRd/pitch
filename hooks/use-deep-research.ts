import { useState } from 'react';
import { streamText, smoothStream } from 'ai';
import { addToast } from '@heroui/react';

import useModelProvider from '@/hooks/useAiProvider';
import { useTaskStore } from '@/store/task';
import { useSettingStore } from '@/store/setting';
import { getSystemPrompt, generateQuestionsPrompt } from '@/utils/deep-research';
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

export function useDeepResearch() {
    const taskStore = useTaskStore();
    const { createProvider, getModel } = useModelProvider();
    const [status, setStatus] = useState<string>('');

    async function askQuestions() {
        const { language } = useSettingStore.getState();
        const { question } = useTaskStore.getState();
        const { thinkingModel } = getModel();

        setStatus('Thinking...');
        const result = streamText({
            model: createProvider(thinkingModel),
            system: getSystemPrompt(),
            prompt: [generateQuestionsPrompt(question), getResponseLanguagePrompt(language)].join(
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
