import { Tag } from '@/components/tag';
import { Tag as TagType } from '@/types/tag';

interface TagsListProps {
    tags: TagType[];
}

export function TagsList({ tags }: TagsListProps) {
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
