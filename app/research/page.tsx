import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { getSupabaseServerClient } from '@/utils/supabase/server';
import { Topic } from '@/components/topic';
import { getCards } from '@/queries/get-cards';
import { withAuth } from '@/utils/supabase/with-auth';

async function ResearchPage() {
    const queryClient = new QueryClient();
    const supabase = await getSupabaseServerClient();

    await prefetchQuery(queryClient, getCards(supabase));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex h-screen w-full max-w-2xl flex-col items-center justify-center">
                <Topic />
            </div>
        </HydrationBoundary>
    );
}

export default withAuth(ResearchPage);
