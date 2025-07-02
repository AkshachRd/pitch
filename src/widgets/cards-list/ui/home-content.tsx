'use client';

import { Tab, Tabs } from '@heroui/react';

import { CardsList } from './cards-list';

import { TagComponent, Tag } from '@/entities/tag';
import { useTagsStore } from '@/entities/tag';

type HomeContentProps = {
    selectedTags: Tag[];
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
                        <TagComponent key={tag.name} color={tag.color}>
                            {tag.name}
                        </TagComponent>
                    ))}
                </div>
            </Tab>
        </Tabs>
    );
};
