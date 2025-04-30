import { useQuery } from '@tanstack/react-query';

import { useSupabaseBrowser } from '@/utils/supabase/client';
import { getCardsWithTags } from '@/queries/get-cards';
import { toCardWithTags } from '@/types/card';

export function useCardsWithTagsQuery() {
    const supabase = useSupabaseBrowser();

    const { data: rawCards = [] } = useQuery({
        queryKey: ['cards'],
        queryFn: () => getCardsWithTags(supabase),
    });

    return rawCards?.map((row) => toCardWithTags(row)) ?? [];
}
