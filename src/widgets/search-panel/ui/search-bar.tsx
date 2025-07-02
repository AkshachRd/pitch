'use client';

import { SearchInput } from './search-input';

import { TagComponent, Tag } from '@/entities/tag';

type SearchBarProps = {
    selectedTags: Tag[];
    setSelectedTags: (tags: Tag[]) => void;
};

export const SearchBar = ({ selectedTags, setSelectedTags }: SearchBarProps) => {
    return (
        <div className="flex w-full items-center justify-center gap-2 rounded-full border-large bg-background p-4">
            {selectedTags.map((tag, index) => (
                <TagComponent
                    key={index}
                    color={tag.color}
                    onClose={() => setSelectedTags(selectedTags.filter((t) => t.id !== tag.id))}
                >
                    {tag.name}
                </TagComponent>
            ))}
            <SearchInput selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </div>
    );
};
