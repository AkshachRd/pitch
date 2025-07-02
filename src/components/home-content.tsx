'use client';

import { Tab, Tabs } from '@heroui/react';

import { CardsList } from './cards-list';

import { Tag } from '@/src/components/tag';
import { Tag as TagType } from '@/src/models/tag';
import { useTagsStore } from '@/src/store/tags';

type HomeContentProps = {
    selectedTags: TagType[];
};

export const HomeContent = ({ selectedTags }: HomeContentProps) => {
    const { tags } = useTagsStore();

    return (
        <Tabs aria-label="Options" variant="underlined">
            <Tab key="cards" title="cards">
                <CardsList selectedTags={selectedTags} />
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
