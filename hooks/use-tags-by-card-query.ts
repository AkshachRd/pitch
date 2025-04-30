import { useQuery } from '@tanstack/react-query';

import { useSupabaseBrowser } from '@/utils/supabase/client';
import { toTag } from '@/types/tag';
import { getTagsByCard } from '@/queries/get-tags';

export function useTagsByCardQuery(cardId: number) {
    const supabase = useSupabaseBrowser();

    const { data: rawTags = [] } = useQuery({
        queryKey: ['tags', cardId],
        queryFn: () => getTagsByCard(supabase, cardId),
    });

    return rawTags?.map((row) => toTag(row.tag)) ?? [];
}
