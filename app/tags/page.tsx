import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { title } from '@/components/primitives';
import { TagsList } from '@/components/tags-list';
import { getSupabaseServerClient } from '@/utils/supabase/server';
import { getTags } from '@/queries/get-tags';

export default async function TagsPage() {
    const queryClient = new QueryClient();
    const supabase = await getSupabaseServerClient();

    await prefetchQuery(queryClient, getTags(supabase));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex h-full w-full flex-col items-center p-4">
                <h1 className={title()}>Tags</h1>
                <TagsList />
            </div>
        </HydrationBoundary>
    );
}
