import { Tag } from '@/entities/tag/@x/card';

export type Card = {
    id: string;
    frontSide: string;
    backSide: string;
    tagIds: string[];
};

export type CardWithTags = Card & {
    tags: Tag[];
};
