'use client';

import { Button, Card, CardBody, Input } from '@heroui/react';
import { useCompletion } from '@ai-sdk/react';
import { FC } from 'react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { Tag } from './tag';
import { AIAnimationWrapper } from './ai-animation-wrapper';

import { getTags } from '@/queries/get-tags';
import { useSupabaseBrowser } from '@/utils/supabase/client';
import { toTag } from '@/types/tag';

interface TagInputProps {}

export const TagInput: FC<TagInputProps> = ({}: TagInputProps) => {
    const { completion, input, setInput, complete, isLoading, stop } = useCompletion({
        api: '/api/tags',
        onFinish: (_, response) => {
            console.log('response', response);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const supabase = useSupabaseBrowser();
    const { data: rawTags = [] } = useQuery(getTags(supabase));
    const tags = rawTags?.map(toTag) ?? [];

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
