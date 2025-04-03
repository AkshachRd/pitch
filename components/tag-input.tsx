'use client';

import { Button, Card, CardBody, Input } from '@heroui/react';
import { useCompletion } from '@ai-sdk/react';
import { FC } from 'react';

import { Tag } from './tag';

import { Tag as TagType } from '@/types/tag';

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
        <div className={'relative inline-block'}>
            <div
                className={`absolute inset-0 left-0 right-0 top-2 h-full w-full scale-90 bg-glow-gradient bg-[length:200%_200%] blur-lg transition-all duration-300 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0'}`}
            >
                {isLoading && <div className="h-full w-full animate-glow" />}
            </div>
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
        </div>
    );
};
