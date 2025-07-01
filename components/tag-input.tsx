'use client';

import { Button, Card, CardBody, Input } from '@heroui/react';
import { FC } from 'react';

import { AIAnimationWrapper } from './ai-animation-wrapper';

import { Tag } from '@/components/tag';
import { Tag as TagType } from '@/models/tag';
import { CardWithTags } from '@/types';
import { useGenerateTags } from '@/hooks/use-generate-tags';
import { useTagsStore } from '@/store/tags';
import { useCardStore } from '@/store/cards';

interface TagInputProps {
    tags: TagType[];
    card: CardWithTags;
}

export const TagInput: FC<TagInputProps> = ({ tags, card }: TagInputProps) => {
    const { addTag } = useTagsStore();
    const { addTagsToCard } = useCardStore();
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

    const mergedTags = showSaveAndCancelButton ? aiGeneratedTags : tags;

    const showGenButton = mergedTags.length === 0 && !isLoading;
    const showStopButton = isLoading;
    const showInput = !isLoading;

    const handleSaveTags = async () => {
        aiGeneratedTags.forEach((tag) => {
            addTag(tag);
        });

        addTagsToCard(card.id, aiGeneratedTags);

        setShowSaveAndCancelButton(false);
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
