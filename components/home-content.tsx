'use client';

import { Tab, Tabs } from '@heroui/react';

import { CardsList } from './cards-list';

import { Tag } from '@/components/tag';
import { useTagsQuery } from '@/hooks/use-tags-query';

export const HomeContent = () => {
    const tags = useTagsQuery();

    return (
        <Tabs aria-label="Options" variant="underlined">
            <Tab key="cards" title="cards">
                <CardsList />
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
