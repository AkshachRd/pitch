'use client';

import { Tab, Tabs } from '@heroui/react';

import { CardsGrid } from './cards-grid';

import { Tag as TagType } from '@/types/tag';
import { Tag } from '@/components/tag';

type HomeContentProps = {
    tags: TagType[];
};

export const HomeContent = ({ tags }: HomeContentProps) => {
    return (
        <Tabs aria-label="Options" variant="underlined">
            <Tab key="cards" title="cards">
                <CardsGrid />
            </Tab>
            <Tab key="tags" title="tags">
                <div className="flex flex-wrap justify-center gap-2">
                    {tags.map((tag) => (
                        <Tag key={tag.name} color={tag.color}>
                            {tag.name}
                        </Tag>
                    ))}
                </div>
            </Tab>
        </Tabs>
    );
};
