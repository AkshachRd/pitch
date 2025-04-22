'use client';

import { Button, Card, CardBody, Input } from '@heroui/react';
import { FC } from 'react';

import { AIAnimationWrapper } from './ai-animation-wrapper';

import { Tag } from '@/components/tag';
import { Tag as TagType } from '@/types/tag';
import { Card as CardType } from '@/types/card';
import { useCreateTagsMutation } from '@/hooks/use-create-tags-mutation';
import { useGenerateTags } from '@/hooks/use-generate-tags';

interface TagInputProps {
    tags: TagType[];
    card: CardType;
}

export const TagInput: FC<TagInputProps> = ({ tags, card }: TagInputProps) => {
    const { mutate: createTags, isPending: isCreatingTags } = useCreateTagsMutation();
    const {
        input,
        setInput,
        generateTags,
        isLoading,
        stopGeneration,
        aiGeneratedTags,
        clearCompletion,
        showSaveAndCancelButton,
        setShowSaveAndCancelButton,
    } = useGenerateTags();

    const mergedTags = [...tags, ...aiGeneratedTags];

    const showGenButton = mergedTags.length === 0 && !isLoading;
    const showStopButton = isLoading;
    const showInput = !isLoading;

    const handleSaveTags = async () => {
        try {
            await createTags({
                tags: aiGeneratedTags,
                cardId: card.id,
            });

            setShowSaveAndCancelButton(false);
        } catch (error) {
            // You might want to show an error toast or notification here
            setShowSaveAndCancelButton(false);
        }
    };

    return (
        <AIAnimationWrapper isLoading={isLoading}>
            <Card className="w-full">
                <CardBody className="flex-row flex-wrap items-center gap-2">
                    {mergedTags.map((tag, index) => (
                        <Tag key={index} color={tag.color}>
                            {tag.name}
                        </Tag>
                    ))}
                    {showGenButton && (
                        <Button type="button" onPress={() => generateTags(card)}>
                            Gen tags
                        </Button>
                    )}
                    {showStopButton && (
                        <Button type="button" onPress={stopGeneration}>
                            Stop
                        </Button>
                    )}
                    {showSaveAndCancelButton && (
                        <div className="flex-grow flex-row gap-2">
                            <Button type="button" onPress={handleSaveTags}>
                                Save
                            </Button>
                            <Button
                                type="button"
                                onPress={() => {
                                    clearCompletion();
                                    setShowSaveAndCancelButton(false);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    )}
                    {showInput && (
                        <Input
                            className="flex-grow"
                            fullWidth={false}
                            placeholder="Enter tags"
                            value={input}
                            onInput={(e) => setInput(e.currentTarget.value)}
                        />
                    )}
                </CardBody>
            </Card>
        </AIAnimationWrapper>
    );
};
