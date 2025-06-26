import { create } from 'zustand';

import { Tag } from '@/models/tag';

export type TagsState = {
    tags: Tag[];
    addTag: (tag: Tag) => void;
    removeTag: (tag: Tag) => void;
    clearTags: () => void;
};

export const useTagsStore = create<TagsState>((set) => ({
    tags: [],
    addTag: (tag) =>
        set((state) => ({
            tags: [...state.tags, tag],
        })),
    removeTag: (tag) =>
        set((state) => ({
            tags: state.tags.filter((t) => t.name !== tag.name),
        })),
    clearTags: () => set(() => ({ tags: [] })),
}));
