import { useQuery } from '@tanstack/react-query';

import { Tag } from '@/components/tag';
import { getTags } from '@/queries/get-tags';
import { useSupabaseBrowser } from '@/utils/supabase/client';
import { toTag } from '@/types/tag';

export function TagsList() {
    const supabase = useSupabaseBrowser();
    const { data: tags = [] } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const response = await getTags(supabase);

            return response.data?.map(toTag) ?? [];
        },
    });

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tags.map((tag) => (
                <div
                    key={tag.name}
                    className="rounded-lg border p-4 transition-colors hover:bg-gray-50"
                >
                    <Tag color={tag.color}>{tag.name}</Tag>
                </div>
            ))}
        </div>
    );
}
