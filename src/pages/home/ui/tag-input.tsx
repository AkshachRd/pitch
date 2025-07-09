'use client';

import { Button, Card, CardBody, Input } from '@heroui/react';
import { FC } from 'react';

import { useGenerateTags } from '../../../pages/home/model/use-generate-tags';

import { AIAnimationWrapper } from '@/entities/ai';
import { TagComponent } from '@/entities/tag';
import { Tag } from '@/entities/tag';
import { CardWithTags } from '@/entities/card';
import { useTagsStore } from '@/entities/tag';
import { useCardStore } from '@/entities/card';

interface TagInputProps {
    tags: Tag[];
    card: CardWithTags;
}

export const TagInput: FC<TagInputProps> = ({ tags, card }: TagInputProps) => {
    const { addTag, removeTag } = useTagsStore();
    const { addTagsToCard, removeTagsFromCard } = useCardStore();
    const {
        input,
        setInput,
        generateTags,
        isLoading,
        stopGeneration,
        generatedTagNames,
        clearCompletion,
        showSaveAndCancelButton,
        setShowSaveAndCancelButton,
    } = useGenerateTags();

    const mergedTags = showSaveAndCancelButton
        ? generatedTagNames.map((name) => ({ name, color: 'default' as const }))
        : tags;

    const showGenButton = mergedTags.length === 0 && !isLoading;
    const showStopButton = isLoading;
    const showInput = !isLoading;
    const showAddTagButton = input.length > 0;

    const handleSaveGeneratedTags = async () => {
        generatedTagNames.forEach((tagName) => {
            const tag = addTag(tagName);

            addTagsToCard(card.id, [tag.id]);
        });

        setShowSaveAndCancelButton(false);
    };

    const handleAddManualTags = async () => {
        const tag = addTag(input);

        addTagsToCard(card.id, [tag.id]);
        setInput('');
    };

    const handleRemoveTag = async (tagId: string) => {
        removeTagsFromCard(card.id, [tagId]);
        removeTag(tagId);
    };

    return (
        <AIAnimationWrapper isLoading={isLoading}>
            <Card className="w-full">
                <CardBody className="flex-row flex-wrap items-center gap-2">
                    {mergedTags.map((tag, index) => (
                        <TagComponent
                            key={index}
                            color={tag.color}
                            onClose={'id' in tag ? () => handleRemoveTag(tag.id) : undefined}
                        >
                            {tag.name}
                        </TagComponent>
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
                            <Button type="button" onPress={handleSaveGeneratedTags}>
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
                    <div className="flex flex-grow flex-row gap-2">
                        {showInput && (
                            <Input
                                className="flex-grow"
                                fullWidth={false}
                                placeholder="Enter tags"
                                value={input}
                                onInput={(e) => setInput(e.currentTarget.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && input.length > 0) {
                                        handleAddManualTags();
                                    }
                                }}
                            />
                        )}
                        {showAddTagButton && (
                            <Button type="button" onPress={handleAddManualTags}>
                                Add
                            </Button>
                        )}
                    </div>
                </CardBody>
            </Card>
        </AIAnimationWrapper>
    );
};
