import { TypedSupabaseClient } from '@/utils/supabase/types';

export function createTag(client: TypedSupabaseClient) {
    return {
        tag: client.from('tag'),
        cardHasTag: client.from('card_has_tag'),
    };
}
