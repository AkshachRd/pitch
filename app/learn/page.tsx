import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { getSupabaseServerClient } from '@/utils/supabase/server';
import { Learn } from '@/components/learn';
import { getCards } from '@/queries/get-cards';
import { withAuth } from '@/utils/supabase/with-auth';

async function LearnPage() {
    const queryClient = new QueryClient();
    const supabase = await getSupabaseServerClient();

    await prefetchQuery(queryClient, getCards(supabase));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Learn />
        </HydrationBoundary>
    );
}

export default withAuth(LearnPage);
