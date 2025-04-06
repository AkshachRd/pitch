'use client';

import { Button, Card, CardBody, Input } from '@heroui/react';
import { useCompletion } from '@ai-sdk/react';
import { FC, useState } from 'react';

import { AIAnimationWrapper } from './ai-animation-wrapper';

import { useSupabaseBrowser } from '@/utils/supabase/client';
import { createTag } from '@/queries/create-tag';
import { Tag } from '@/components/tag';
import { Tag as TagType } from '@/types/tag';
import { Card as CardType } from '@/types/card';

interface TagInputProps {
    tags: TagType[];
    card: CardType;
}

const parseAIGeneratedTags = (tags: string): TagType[] => {
    if (!tags) return [];

    return tags.split(',').map((tag) => ({
        name: tag,
        color: 'default',
    }));
};

export const TagInput: FC<TagInputProps> = ({ tags, card }: TagInputProps) => {
    const supabase = useSupabaseBrowser();
    const { tag: tagQuery, cardHasTag: cardHasTagQuery } = createTag(supabase);
    const [showSaveAndCancelButton, setShowSaveAndCancelButton] = useState(false);

    const { completion, input, setInput, complete, isLoading, stop, setCompletion } = useCompletion(
        {
            api: '/api/tags',
            onFinish: () => {
                setShowSaveAndCancelButton(true);
            },
        },
    );

    const aiGeneratedTags = parseAIGeneratedTags(completion);
    const mergedTags = [...tags, ...aiGeneratedTags];

    const showGenButton = mergedTags.length === 0 && !isLoading;
    const showStopButton = isLoading;
    const showInput = !isLoading;

    const createTagRelationship = async (tagId: number) => {
        const { error } = await cardHasTagQuery.insert({
            id_card: card.id,
            id_tag: tagId,
        });

        if (error) {
            throw new Error(`Failed to create tag relationship: ${error.message}`);
        }
    };

    const handleSaveTags = async () => {
        try {
            for (const tag of aiGeneratedTags) {
                // Check if tag exists
                const { data: existingTag } = await tagQuery.select().eq('name', tag.name).single();

                if (existingTag) {
                    await createTagRelationship(existingTag.id);
                } else {
                    // Create new tag
                    const { data: newTag, error: tagError } = await tagQuery
                        .insert({
                            name: tag.name,
                            color: tag.color,
                        })
                        .select()
                        .single();

                    if (tagError) {
                        throw new Error(`Failed to create tag: ${tagError.message}`);
                    }

                    if (!newTag?.id) {
                        throw new Error('Failed to get tag ID after creation');
                    }

                    await createTagRelationship(newTag.id);
                }
            }
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
                        <Button
                            type="button"
                            onPress={() => {
                                complete(
                                    `card_front_side: ${card.front_side}, card_back_side: ${card.back_side}`,
                                );
                            }}
                        >
                            Gen tags
                        </Button>
                    )}
                    {showStopButton && (
                        <Button
                            type="button"
                            onPress={() => {
                                stop();
                            }}
                        >
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
                                    setCompletion('');
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
