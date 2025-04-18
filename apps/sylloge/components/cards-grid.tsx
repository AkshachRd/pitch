'use client';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { GridCard } from '@/components/grid-card';
import { useSupabaseBrowser } from '@/utils/supabase/client';
import { getCards } from '@/queries/get-cards';

export function CardsGrid() {
    const supabase = useSupabaseBrowser();
    const { data: cards = [] } = useQuery(getCards(supabase));

    return (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {cards?.map((card) => <GridCard key={card.id} card={card} />)}
        </div>
    );
}
