'use client';

import { SearchInput } from '@/components/search-input';
import { Tag } from '@/components/tag';
import { Tag as TagType } from '@/models/tag';

type SearchBarProps = {
    selectedTags: TagType[];
    setSelectedTags: (tags: TagType[]) => void;
};

export const SearchBar = ({ selectedTags, setSelectedTags }: SearchBarProps) => {
    return (
        <div className="flex w-full items-center justify-center gap-2 rounded-full border-large bg-background p-4">
            {selectedTags.map((tag, index) => (
                <Tag
                    key={index}
                    color={tag.color}
                    onClose={() => setSelectedTags(selectedTags.filter((t) => t.id !== tag.id))}
                >
                    {tag.name}
                </Tag>
            ))}
            <SearchInput selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </div>
    );
};
