import { create } from 'zustand';

import { Card } from '@/types/card';
import { Tag } from '@/types/tag';

export type CardsState = {
    cards: Card[];
    addCard: (card: Card) => void;
};

export const useCardStore = create<CardsState>((set) => ({
    cards: [],
    addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
}));

export type TagsState = {
    selectedTags: Tag[];
    addTag: (tag: Tag) => void;
    removeTag: (tag: Tag) => void;
    clearTags: () => void;
};

export const useTagsStore = create<TagsState>((set) => ({
    selectedTags: [],
    addTag: (tag) =>
        set((state) => ({
            selectedTags: [...state.selectedTags, tag],
        })),
    removeTag: (tag) =>
        set((state) => ({
            selectedTags: state.selectedTags.filter((t) => t.name !== tag.name),
        })),
    clearTags: () => set(() => ({ selectedTags: [] })),
}));
