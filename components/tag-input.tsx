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

    return (
        <AIAnimationWrapper isLoading={isLoading}>
            <Card className="w-full">
                <CardBody className="flex-row flex-wrap items-center gap-2">
                    {completion.length > 0 &&
                        completion.split(',').map((tag, index) => (
                            <Tag key={index} color={'default'}>
                                {tag}
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
