'use client';

import { CardItem } from './card-item';

import { Tag, useTagsStore } from '@/entities/tag';
import { useCardStore } from '@/entities/card';
import { combineCardsWithTags } from '@/entities/card';

type CardsListProps = {
    selectedTagIds: string[];
};

export function CardsList({ selectedTagIds }: CardsListProps) {
    const { cards } = useCardStore();
    const { tags } = useTagsStore();

    const cardsWithTags = combineCardsWithTags(cards, tags);
    const filteredCards =
        selectedTagIds.length === 0
            ? cardsWithTags
            : cardsWithTags.filter((card) =>
                  card.tags.some((cardTag: Tag) =>
                      selectedTagIds.some((selectedTagId) => selectedTagId === cardTag.id),
                  ),
              );

    return (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredCards.map((card) => (
                <CardItem key={card.id} card={card} />
            ))}
        </div>
    );
}
