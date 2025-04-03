'use client';

import { Button, Card, CardBody, Input } from '@heroui/react';
import { useCompletion } from '@ai-sdk/react';
import { FC } from 'react';

import { Tag } from './tag';

import { Tag as TagType } from '@/types/tag';
import { CoolButton } from './cool-button';

interface TagInputProps {}

export const TagInput: FC<TagInputProps> = ({}: TagInputProps) => {
    const { completion, input, setInput, handleSubmit, isLoading } = useCompletion({
        api: '/api/tags',
        onFinish: (_, response) => {
            console.log('response', response);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    return (
        <CoolButton isLoading={isLoading}>
            <Card className="w-80">
                <CardBody className="flex-row flex-wrap items-center gap-2">
                    <form onSubmit={handleSubmit}>
                        {completion.length > 0 &&
                            completion.split(',').map((tag, index) => (
                                <Tag key={index} color={'default'}>
                                    {tag}
                                </Tag>
                            ))}
                        <Button
                            type="button"
                            onPress={() => {
                                setInput(`card_front_side: 'Forest', card_back_side: 'Лес'`);
                            }}
                        >
                            Gen tags
                        </Button>
                        <Button type="submit">Submit</Button>
                        <Input
                            value={input}
                            onInput={(e) => setInput(e.currentTarget.value)}
                            className="flex-grow"
                            fullWidth={false}
                        />
                    </form>
                </CardBody>
            </Card>
        </CoolButton>
    );
};
