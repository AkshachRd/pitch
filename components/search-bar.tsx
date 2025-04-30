'use client';

import { SearchInput } from '@/components/search-input';
import { Tag } from '@/components/tag';
import { useTagsStore } from '@/store/store';

export const SearchBar = () => {
    const { selectedTags, removeTag } = useTagsStore();

    return (
        <div className="flex w-full items-center justify-center gap-2 rounded-full border-large bg-background p-4">
            {selectedTags.map((tag, index) => (
                <Tag key={index} color={tag.color} onClose={() => removeTag(tag)}>
                    {tag.name}
                </Tag>
            ))}
            <SearchInput />
        </div>
    );
};
