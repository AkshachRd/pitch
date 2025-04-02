import { TypedSupabaseClient } from '@/utils/supabase/types';

export function getCards(client: TypedSupabaseClient) {
    return client.from('card').select().throwOnError();
}

export function createCard(client: TypedSupabaseClient) {
    return (params: { front_side: string; back_side: string }) =>
        client
            .from('card')
            .insert({ back_side: params.back_side, front_side: params.front_side })
            .throwOnError();
}
