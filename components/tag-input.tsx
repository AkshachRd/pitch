'use client';

import { Card, CardBody, Input } from '@heroui/react';
import { FC } from 'react';

import { Tag } from './tag';

import { Tag as TagType } from '@/types/tag';

interface TagInputProps {
    tags: TagType[];
}

export const TagInput: FC<TagInputProps> = ({ tags }: TagInputProps) => {
    return (
        <Card className="max-w-80">
            <CardBody className="flex-row flex-wrap items-center gap-2">
                {tags.map((tag) => (
                    <Tag key={tag.content} color={tag.color}>
                        {tag.content}
                    </Tag>
                ))}
                <Input className="flex-grow" fullWidth={false} />
            </CardBody>
        </Card>
    );
};
