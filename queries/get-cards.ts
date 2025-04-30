import { TypedSupabaseClient } from '@/utils/supabase/types';

export function getCards(client: TypedSupabaseClient) {
    return client.from('card').select().throwOnError();
}

export async function getCardsWithTags(client: TypedSupabaseClient) {
    const { data } = await client
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

    return data;
}
