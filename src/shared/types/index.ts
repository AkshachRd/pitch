import { SVGProps } from 'react';

import { Card } from '@/entities/card';
import { Tag } from '@/entities/tag';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type CardWithTags = Card & {
    tags: Tag[];
};

export type CardFilter = {
    tagIds?: number[];
    searchQuery?: string;
};
