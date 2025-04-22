import { useState } from 'react';
import { streamText, smoothStream } from 'ai';
import { parsePartialJson } from '@ai-sdk/ui-utils';
import { openai } from '@ai-sdk/openai';
import { useTranslation } from 'react-i18next';
import Plimit from 'p-limit';
import { toast } from 'sonner';
import useModelProvider from '@/hooks/useAiProvider';
import useWebSearch from '@/hooks/useWebSearch';
import { useTaskStore } from '@/store/task';
import { useHistoryStore } from '@/store/history';
import { useSettingStore } from '@/store/setting';
import {
    getSystemPrompt,
    getOutputGuidelinesPrompt,
    generateQuestionsPrompt,
    generateSerpQueriesPrompt,
    processResultPrompt,
    processSearchResultPrompt,
    reviewSerpQueriesPrompt,
    writeFinalReportPrompt,
    getSERPQuerySchema,
} from '@/utils/deep-research';
import { isNetworkingModel } from '@/utils/model';
import { parseError } from '@/utils/error';
import { pick, flat } from 'radash';

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
    toast.error(errorMessage);
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
