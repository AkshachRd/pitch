import { Card } from '@/entities/card';
import { Tag } from '@/entities/tag';

export type CardWithTags = Card & {
    tags: Tag[];
};

/**
 * Утилитарная функция для объединения cards и tags
 * Может использоваться в features/widgets слоях
 */
export function combineCardsWithTags(cards: Card[], tags: Tag[]): CardWithTags[] {
    return cards.map((card) => ({
        ...card,
        tags: tags.filter((tag) => card.tagIds.includes(tag.id)),
    }));
}
