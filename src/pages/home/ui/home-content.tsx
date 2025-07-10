'use client';

import { Tab, Tabs } from '@heroui/react';

import { CardsList } from './cards-list';

import { TagComponent } from '@/entities/tag';
import { useTagsStore } from '@/entities/tag';

type HomeContentProps = {
    selectedTagIds: string[];
};

export const HomeContent = ({ selectedTagIds }: HomeContentProps) => {
    const { tags } = useTagsStore();

    return (
        <Tabs aria-label="Options" variant="underlined">
            <Tab key="cards" title="cards">
                <CardsList selectedTagIds={selectedTagIds} />
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
