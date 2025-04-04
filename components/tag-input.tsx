'use client';

import { Button, Card, CardBody, Input } from '@heroui/react';
import { useCompletion } from '@ai-sdk/react';
import { FC } from 'react';

import { Tag } from './tag';

import { Tag as TagType } from '@/types/tag';
import { AIAnimationWrapper } from './ai-animation-wrapper';

interface TagInputProps {}

export const TagInput: FC<TagInputProps> = ({}: TagInputProps) => {
    const { completion, input, setInput, complete, isLoading } = useCompletion({
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
            <Card className="w-80">
                <CardBody className="flex-row flex-wrap items-center gap-2">
                    {completion.length > 0 &&
                        completion.split(',').map((tag, index) => (
                            <Tag key={index} color={'default'}>
                                {tag}
                            </Tag>
                        ))}
                    <Button
                        type="button"
                        onPress={() => {
                            complete(`card_front_side: 'Forest', card_back_side: 'Лес'`);
                        }}
                    >
                        Gen tags
                    </Button>
                    <Input
                        value={input}
                        onInput={(e) => setInput(e.currentTarget.value)}
                        className="flex-grow"
                        fullWidth={false}
                    />
                </CardBody>
            </Card>
        </AIAnimationWrapper>
    );
};
