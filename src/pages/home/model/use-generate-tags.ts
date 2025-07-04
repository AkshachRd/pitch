import { useCompletion } from '@ai-sdk/react';
import { useState } from 'react';
import { nanoid } from 'nanoid';

import { generatePrompt } from '../lib/prompts';

import { Tag, useTagsStore } from '@/entities/tag';
import { Card } from '@/entities/card';

export const parseAIGeneratedTags = (tags: string): Tag[] => {
    if (!tags) return [];

    return tags.split(',').map((tag) => ({
        id: nanoid(),
        name: tag,
        color: 'default',
    }));
};

interface UseGenerateTagsReturn {
    completion: string;
    input: string;
    setInput: (input: string) => void;
    generateTags: (card: Card) => void;
    isLoading: boolean;
    stopGeneration: () => void;
    aiGeneratedTags: Tag[];
    clearCompletion: () => void;
    showSaveAndCancelButton: boolean;
    setShowSaveAndCancelButton: (show: boolean) => void;
}

export const useGenerateTags = (): UseGenerateTagsReturn => {
    const [showSaveAndCancelButton, setShowSaveAndCancelButton] = useState(false);

    const { completion, input, setInput, complete, isLoading, stop, setCompletion } = useCompletion(
        {
            api: '/api/ai/tags',
            onFinish: () => {
                setShowSaveAndCancelButton(true);
            },
        },
    );

    const generateTags = (card: Card) => {
        const { tags } = useTagsStore.getState();

        const currentTags = tags.filter((tag) => card.tagIds.includes(tag.id));

        complete(
            generatePrompt(
                card.frontSide,
                card.backSide,
                currentTags.map((tag) => tag.name).join(', '),
                tags.map((tag) => tag.name).join(','),
            ),
        );
    };

    const stopGeneration = () => {
        stop();
    };

    const clearCompletion = () => {
        setCompletion('');
    };

    const aiGeneratedTags = parseAIGeneratedTags(completion);

    return {
        completion,
        input,
        setInput,
        generateTags,
        isLoading,
        stopGeneration,
        aiGeneratedTags,
        clearCompletion,
        showSaveAndCancelButton,
        setShowSaveAndCancelButton,
    };
};
