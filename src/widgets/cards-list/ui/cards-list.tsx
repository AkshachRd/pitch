'use client';

import { CardItem } from '@/features/card-interaction';
import { Tag } from '@/entities/tag';
import { useCardStore } from '@/entities/card';

type CardsListProps = {
    selectedTags: Tag[];
};

export function CardsList({ selectedTags }: CardsListProps) {
    const { getCardsWithTags } = useCardStore();

    const cardsWithTags = getCardsWithTags();
    const cards =
        selectedTags.length === 0
            ? cardsWithTags
            : cardsWithTags.filter((card) =>
                  card.tags.some((cardTag: Tag) =>
                      selectedTags.some((selectedTag) => selectedTag.id === cardTag.id),
                  ),
              );

    return (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => (
                <CardItem key={card.id} card={card} />
            ))}
        </div>
    );
}
