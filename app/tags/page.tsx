import { title } from '@/components/primitives';
import { Search } from '@/components/search';
import { Tag } from '@/components/tag';

export type Tag = {
    tag: string;
    color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
};

const tags: Tag[] = [
    { tag: 'Technology', color: 'primary' },
    { tag: 'Technology/Software Development', color: 'success' },
    { tag: 'Technology/Software Development/Programming Languages', color: 'warning' },
    { tag: 'Technology/Software Development/Software Engineering', color: 'danger' },
    { tag: 'Technology/Software Development/Web Development', color: 'secondary' },
    { tag: 'Technology/Hardware', color: 'default' },
    { tag: 'Technology/Hardware/Computers', color: 'primary' },
    { tag: 'Technology/Hardware/Mobile Devices', color: 'success' },
    { tag: 'Technology/Hardware/Peripherals', color: 'warning' },
    { tag: 'Technology/AI', color: 'danger' },
    { tag: 'Technology/Robotics', color: 'secondary' },
    { tag: 'Science', color: 'default' },
];

export default function TagsPage() {
    return (
        <div className="flex h-full w-full flex-col items-center p-4">
            <h1 className={title()}>Tags</h1>
            <div className="mb-6">
                <Search tags={tags} />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tags.map((tag) => (
                    <div
                        key={tag.tag}
                        className="rounded-lg border p-4 transition-colors hover:bg-gray-50"
                    >
                        <Tag color={tag.color}>{tag.tag}</Tag>
                    </div>
                ))}
            </div>
        </div>
    );
}
