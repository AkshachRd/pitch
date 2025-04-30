import { Tag } from './tag';

import { Tables } from '@/utils/supabase/database-types';

export type Card = {
    id: number;
    front_side: string;
    back_side: string;
};

export type CardWithTags = Card & {
    tags: Tag[];
};

type CardWithTagsDto = Tables<'card'> & {
    card_has_tag: Array<{
        tag: Pick<Tables<'tag'>, 'id' | 'name' | 'color'>;
    }>;
};

export function toCardWithTags(dto: CardWithTagsDto): CardWithTags {
    return {
        id: dto.id,
        front_side: dto.front_side,
        back_side: dto.back_side,
        tags:
            dto.card_has_tag?.map((cht) => ({
                id: cht.tag.id,
                name: cht.tag.name || '',
                color: (cht.tag.color as Tag['color']) || 'default',
            })) || [],
    };
}
