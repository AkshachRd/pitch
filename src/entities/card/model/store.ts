import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Card } from './types';

import { Tag } from '@/entities/tag/@x/card';

export type CardsState = {
    cards: Card[];
    addCard: (card: Card) => void;
    addTagsToCard: (cardId: string, tags: Tag[]) => void;
};

export const useCardStore = create<CardsState>()(
    persist(
        (set, get) => ({
            cards: [],
            addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
            addTagsToCard: (cardId: string, tags: Tag[]) => {
                set((state) => ({
                    cards: state.cards.map((card) =>
                        card.id === cardId
                            ? { ...card, tagIds: [...card.tagIds, ...tags.map((tag) => tag.id)] }
                            : card,
                    ),
                }));
            },
        }),
        { name: 'cards' },
    ),
);
