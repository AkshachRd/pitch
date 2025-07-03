import { useCompletion } from '@ai-sdk/react';
import { useState } from 'react';
import { nanoid } from 'nanoid';

import { Tag } from '@/entities/tag';
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
        complete(`card_front_side: ${card.frontSide}, card_back_side: ${card.backSide}`);
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
