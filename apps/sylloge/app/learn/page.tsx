import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { getSupabaseServerClient } from '@/utils/supabase/server';
import { Learn } from '@/components/learn';
import { getCards } from '@/queries/get-cards';

export default async function LearnPage() {
    const queryClient = new QueryClient();
    const supabase = await getSupabaseServerClient();

    await prefetchQuery(queryClient, getCards(supabase));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Learn />
        </HydrationBoundary>
    );
}
