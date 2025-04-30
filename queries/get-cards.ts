import { TypedSupabaseClient } from '@/utils/supabase/types';

export function getCards(client: TypedSupabaseClient) {
    return client.from('card').select().throwOnError();
}

export function getCardsWithTags(client: TypedSupabaseClient) {
    return client
        .from('card')
        .select(
            `
            *,
            card_has_tag (
                tag (
                    id,
                    name,
                    color
                )
            )
        `,
        )
        .throwOnError();
}
