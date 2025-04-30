'use client';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { CardItem } from '@/components/card-item';
import { useSupabaseBrowser } from '@/utils/supabase/client';
import { getCardsWithTags } from '@/queries/get-cards';
import { useTagsStore } from '@/store/store';
import { toCardWithTags } from '@/types/card';

export function CardsList() {
    const supabase = useSupabaseBrowser();
    const { data: rawCards = [] } = useQuery(getCardsWithTags(supabase));
    const { selectedTags } = useTagsStore();

    const cards = rawCards ? rawCards.map(toCardWithTags) : [];

    const filteredCards =
        selectedTags.length > 0
            ? cards.filter((card) =>
                  card.tags.some((cardTag) =>
                      selectedTags.some((selectedTag) => selectedTag.id === cardTag.id),
                  ),
              )
            : cards;

    return (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredCards.map((card) => (
                <CardItem key={card.id} card={card} />
            ))}
        </div>
    );
}
