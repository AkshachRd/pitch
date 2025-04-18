import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { title } from '@/components/primitives';
import { CardsGrid } from '@/components/cards-grid';
import { getCards } from '@/queries/get-cards';
import { getSupabaseServerClient } from '@/utils/supabase/server';

export default async function CardsPage() {
    const queryClient = new QueryClient();
    const supabase = await getSupabaseServerClient();

    await prefetchQuery(queryClient, getCards(supabase));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex h-full w-full flex-col items-center p-4">
                <h1 className={title()}>Cards</h1>
                <CardsGrid />
            </div>
        </HydrationBoundary>
    );
}
