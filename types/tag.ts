import { Tables } from '@/utils/supabase/database-types';

export type TagColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

export type Tag = {
    id: number;
    name: string;
    color: TagColor;
};

export function toTag(dto: Tables<'tag'>): Tag {
    return {
        id: dto.id,
        name: dto.name || '',
        color: (dto.color as TagColor) || 'default',
    };
}
