import { SVGProps } from 'react';

import { Card } from '@/src/models/card';
import { Tag } from '@/src/models/tag';

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
