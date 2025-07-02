import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Card } from './types';

import { useTagsStore, Tag } from '@/entities/tag';
import { CardWithTags } from '@/shared/types';

export type CardsState = {
    cards: Card[];
    addCard: (card: Card) => void;
    getCardsWithTags: () => Array<CardWithTags>;
    addTagsToCard: (cardId: string, tags: Tag[]) => void;
};

export const useCardStore = create<CardsState>()(
    persist(
        (set, get) => ({
            cards: [],
            addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
            getCardsWithTags: () => {
                const { cards } = get();
                const { tags } = useTagsStore.getState();

                return cards.map((card) => ({
                    ...card,
                    tags: tags.filter((tag: Tag) => card.tagIds.includes(tag.id)),
                }));
            },
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
