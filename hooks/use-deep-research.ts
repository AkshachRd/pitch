import { useEffect, useState } from 'react';
import { useTaskStore } from '@/store/task';
import { generateQuestionsPrompt } from '@/utils/prompts/prompts';
import { useCompletion } from '@ai-sdk/react';
import { addToast } from '@heroui/react';
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

export function handleError(error: unknown) {
    const errorMessage = parseError(error);

    addToast({
        title: 'Deep search error',
        description: errorMessage,
        color: 'danger',
    });
}

export function useDeepResearch() {
    const taskStore = useTaskStore();
    const [status, setStatus] = useState<string>('');
    const { completion, complete, isLoading } = useCompletion({
        api: '/api/ai/questions',
        onError: (error) => {
            handleError(error);
        },
    });

    useEffect(() => {
        taskStore.updateQuestions(completion);
    }, [completion]);

    async function askQuestions() {
        const { question } = useTaskStore.getState();

        setStatus('Thinking...');
        const prompt = [
            generateQuestionsPrompt(question),
            getResponseLanguagePrompt('english'),
        ].join('\n\n');

        taskStore.setQuestion(question);
        await complete(prompt);
    }

    return {
        isThinking: isLoading,
        status,
        askQuestions,
    };
}
