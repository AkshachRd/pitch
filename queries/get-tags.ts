import { TypedSupabaseClient } from '@/utils/supabase/types';

export async function getTags(client: TypedSupabaseClient) {
    const { data } = await client.from('tag').select().throwOnError();

    return data;
}

export async function getTagsByCard(client: TypedSupabaseClient, cardId: number) {
    const { data } = await client
        .from('card_has_tag')
        .select('id_tag, tag(*)')
        .eq('id_card', cardId)
        .throwOnError();

    return data;
}
