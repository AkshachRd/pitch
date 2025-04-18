import { TypedSupabaseClient } from '@/utils/supabase/types';

export function getCards(client: TypedSupabaseClient) {
    return client.from('card').select().throwOnError();
}
