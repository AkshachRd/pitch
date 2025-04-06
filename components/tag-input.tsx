'use client';

import { Button, Card, CardBody, Input } from '@heroui/react';
import { useCompletion } from '@ai-sdk/react';
import { FC, useState } from 'react';
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-react-query';

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
    return tags.split(',').map((tag) => ({
        name: tag,
        color: 'default',
    }));
};

export const TagInput: FC<TagInputProps> = ({ tags, card }: TagInputProps) => {
    const supabase = useSupabaseBrowser();
    const { tag: tagQuery, cardHasTag: cardHasTagQuery } = createTag(supabase);

    const { mutate: createTagMutation } = useInsertMutation(tagQuery, ['id'], null, {
        onSuccess: async (tagData) => {
            if (!tagData?.[0]?.id) return;
            // After tag is created, create the relationship
            await cardHasTagQuery.insert({
                id_card: card.id,
                id_tag: tagData[0].id,
            });
        },
    });

    const [showSaveAndCancelButton, setShowSaveAndCancelButton] = useState(false);

    const { completion, input, setInput, complete, isLoading, stop } = useCompletion({
        api: '/api/tags',
        onFinish: async (_, response) => {
            setShowSaveAndCancelButton(true);
            console.log(response);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const aiGeneratedTags = parseAIGeneratedTags(completion);
    const mergedTags = [...tags, ...aiGeneratedTags];

    const showGenButton = tags.length === 0;
    const showStopButton = isLoading;
    const showInput = !isLoading;

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
                            <Button
                                type="button"
                                onPress={() => {
                                    createTagMutation(aiGeneratedTags);
                                    setShowSaveAndCancelButton(false);
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                type="button"
                                onPress={() => {
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
