import { TypedSupabaseClient } from '@/utils/supabase/types';

export function getTags(client: TypedSupabaseClient) {
    return client.from('tag').select().throwOnError();
}

export function getTagsForCard(client: TypedSupabaseClient, cardId: number) {
    return client
        .from('card_has_tag')
        .select('id_tag, tag(*)')
        .eq('id_card', cardId)
        .throwOnError();
}
