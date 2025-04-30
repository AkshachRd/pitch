'use client';

import { CardItem } from '@/components/card-item';
import { useTagsStore } from '@/store/store';
import { useCardsWithTagsQuery } from '@/hooks/use-cards-with-tags-query';

export function CardsList() {
    const cards = useCardsWithTagsQuery();
    const { selectedTags } = useTagsStore();

    const filteredCards =
        selectedTags.length > 0
            ? cards.filter((card) =>
                  card.tags.some((cardTag) =>
                      selectedTags.some((selectedTag) => selectedTag.id === cardTag.id),
                  ),
              )
            : cards;

    return (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredCards.map((card) => (
                <CardItem key={card.id} card={card} />
            ))}
        </div>
    );
}
