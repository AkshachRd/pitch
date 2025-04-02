import { TypedSupabaseClient } from '@/utils/supabase/types';

export function createCard(client: TypedSupabaseClient) {
    return client.from('card');
}
