'use client';

import { Button, Card, CardBody, Input } from '@heroui/react';
import { useCompletion } from '@ai-sdk/react';
import { FC, useState } from 'react';

import { AIAnimationWrapper } from './ai-animation-wrapper';

import { Tag } from '@/components/tag';
import { Tag as TagType } from '@/types/tag';
import { Card as CardType } from '@/types/card';
import { useCreateTagsMutation } from '@/hooks/use-create-tags-mutation';

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
    const [showSaveAndCancelButton, setShowSaveAndCancelButton] = useState(false);
    const { mutate: createTags, isPending: isCreatingTags } = useCreateTagsMutation();

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
