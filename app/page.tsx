import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { HomeContent } from '@/components/home-content';
import { getCards } from '@/queries/get-cards';
import { getSupabaseServerClient } from '@/utils/supabase/server';
import { getQueryClient } from '@/utils/get-query-client';
import { getTags } from '@/queries/get-tags';
import { SearchBar } from '@/components/search-bar';

export default async function HomePage() {
    const queryClient = getQueryClient();
    const supabase = await getSupabaseServerClient();

    await prefetchQuery(queryClient, getCards(supabase));
    queryClient.prefetchQuery({
        queryKey: ['tags'],
        queryFn: () => getTags(supabase),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div>
                    <SearchBar />
                </div>
                <div>
                    <HomeContent />
                </div>
            </section>
        </HydrationBoundary>
    );
}
