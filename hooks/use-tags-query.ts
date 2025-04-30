import { useQuery } from '@tanstack/react-query';

import { getTags } from '@/queries/get-tags';
import { useSupabaseBrowser } from '@/utils/supabase/client';
import { toTag } from '@/types/tag';

export function useTagsQuery() {
    const supabase = useSupabaseBrowser();

    const { data: rawTags = [] } = useQuery({
        queryKey: ['tags'],
        queryFn: () => getTags(supabase),
    });

    return rawTags?.map(toTag) ?? [];
}
