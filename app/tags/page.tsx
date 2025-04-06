import { title } from '@/components/primitives';
import { Search } from '@/components/search';
import { TagsList } from '@/components/tags-list';
import { Tag } from '@/types/tag';

const tags: Tag[] = [
    { name: 'Technology', color: 'primary' },
    { name: 'Technology/Software Development', color: 'success' },
    { name: 'Technology/Software Development/Programming Languages', color: 'warning' },
    { name: 'Technology/Software Development/Software Engineering', color: 'danger' },
    { name: 'Technology/Software Development/Web Development', color: 'secondary' },
    { name: 'Technology/Hardware', color: 'default' },
    { name: 'Technology/Hardware/Computers', color: 'primary' },
    { name: 'Technology/Hardware/Mobile Devices', color: 'success' },
    { name: 'Technology/Hardware/Peripherals', color: 'warning' },
    { name: 'Technology/AI', color: 'danger' },
    { name: 'Technology/Robotics', color: 'secondary' },
    { name: 'Science', color: 'default' },
];

export default function TagsPage() {
    return (
        <div className="flex h-full w-full flex-col items-center p-4">
            <h1 className={title()}>Tags</h1>
            <div className="mb-6">
                <Search tags={tags} />
            </div>
            <TagsList tags={tags} />
        </div>
    );
}
