import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Tag } from '@/types/tag';
import { useSupabaseBrowser } from '@/utils/supabase/client';

type CreateTagsParams = {
    tags: Tag[];
    cardId: number;
};

export function useCreateTagsMutation() {
    const supabase = useSupabaseBrowser();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (params: CreateTagsParams) => {
            // First create the tags
            const { data: createdTags } = await supabase
                .from('tag')
                .insert(params.tags)
                .select()
                .throwOnError();

            return createdTags;
        },
        onSuccess: async (data, variables) => {
            // Then create the card_has_tag relationships
            const cardHasTagRelations = data.map((tag) => ({
                id_card: variables.cardId,
                id_tag: tag.id,
            }));

            const { data: createdRelations } = await supabase
                .from('card_has_tag')
                .insert(cardHasTagRelations)
                .select()
                .throwOnError();

            return {
                tags: data,
                relations: createdRelations,
            };
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] });
            queryClient.invalidateQueries({ queryKey: ['card_has_tag'] });
        },
    });
}
