'use client';

import { Button, Card, CardBody, Input } from '@heroui/react';
import { useCompletion } from '@ai-sdk/react';
import { FC } from 'react';

import { AIAnimationWrapper } from './ai-animation-wrapper';

import { Tag } from '@/components/tag';
import { Tag as TagType } from '@/types/tag';

interface TagInputProps {
    tags: TagType[];
}

const parseAIGeneratedTags = (tags: string): TagType[] => {
    return tags.split(',').map((tag) => ({
        name: tag,
        color: 'default',
    }));
};

export const TagInput: FC<TagInputProps> = ({ tags }: TagInputProps) => {
    const { completion, input, setInput, complete, isLoading, stop } = useCompletion({
        api: '/api/tags',
        onFinish: (_, response) => {
            console.log('response', response);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const aiGeneratedTags = parseAIGeneratedTags(completion);
    const mergedTags = [...tags, ...aiGeneratedTags];

    return (
        <AIAnimationWrapper isLoading={isLoading}>
            <Card className="w-full">
                <CardBody className="flex-row flex-wrap items-center gap-2">
                    {mergedTags.map((tag, index) => (
                        <Tag key={index} color={tag.color}>
                            {tag.name}
                        </Tag>
                    ))}
                    {tags.length === 0 && (
                        <Button
                            type="button"
                            onPress={() => {
                                if (isLoading) {
                                    stop();

                                    return;
                                }
                                complete(`card_front_side: 'Forest', card_back_side: 'Лес'`);
                            }}
                        >
                            {isLoading ? 'Stop' : 'Gen tags'}
                        </Button>
                    )}
                    {!isLoading && (
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
