'use client';

import { SearchInput } from '@/components/search-input';
import { Tag } from '@/components/tag';
import { useTagsStore } from '@/store/store';

export const SearchBar = () => {
    const { selectedTags } = useTagsStore();

    return (
        <div className="flex w-full items-center justify-center">
            {selectedTags.map((tag, index) => (
                <Tag key={index} color={tag.color}>
                    {tag.name}
                </Tag>
            ))}
            <SearchInput />
        </div>
    );
};
