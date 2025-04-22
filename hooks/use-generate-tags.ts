import { useCompletion } from '@ai-sdk/react';
import { useState } from 'react';
import { Tag as TagType } from '@/types/tag';
import { Card as CardType } from '@/types/card';

export const parseAIGeneratedTags = (tags: string): TagType[] => {
    if (!tags) return [];

    return tags.split(',').map((tag) => ({
        name: tag,
        color: 'default',
    }));
};

interface UseGenerateTagsReturn {
    completion: string;
    input: string;
    setInput: (input: string) => void;
    generateTags: (card: CardType) => void;
    isLoading: boolean;
    stopGeneration: () => void;
    aiGeneratedTags: TagType[];
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

    const generateTags = (card: CardType) => {
        complete(`card_front_side: ${card.front_side}, card_back_side: ${card.back_side}`);
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
