'use client';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { GridCard } from '@/components/grid-card';
import { useSupabaseBrowser } from '@/utils/supabase/client';
import { getCards } from '@/queries/get-cards';

export function CardsGrid() {
    const supabase = useSupabaseBrowser();
    const { data: cards = [] } = useQuery(getCards(supabase));

    return (
        <div className="grid grid-cols-5 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards?.map((card) => <GridCard key={card.id} card={card} />)}
        </div>
    );
}
