import { TypedSupabaseClient } from '@/utils/supabase/types';

export function getTags(client: TypedSupabaseClient) {
    return client.from('tag').select().throwOnError();
}
