import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { title } from '@/components/primitives';
import { CardsList } from '@/components/cards-list';
import { getCards } from '@/queries/get-cards';
import { getSupabaseServerClient } from '@/utils/supabase/server';
import { withAuth } from '@/utils/supabase/with-auth';

async function CardsPage() {
    const queryClient = new QueryClient();
    const supabase = await getSupabaseServerClient();

    await prefetchQuery(queryClient, getCards(supabase));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex h-full w-full flex-col items-center p-4">
                <h1 className={title()}>Cards</h1>
                <CardsList />
            </div>
        </HydrationBoundary>
    );
}

export default withAuth(CardsPage);
