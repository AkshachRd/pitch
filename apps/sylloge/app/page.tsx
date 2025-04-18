import { Search } from '@/components/search';
import { Tag } from '@/components/tag';
import { Tag as TagType } from '@/types/tag';

const tags: TagType[] = [
    { name: 'Technology', color: 'primary' },
    { name: 'Technology/Software Development', color: 'success' },
    {
        name: 'Technology/Software Development/Programming Languages',
        color: 'warning',
    },
    {
        name: 'Technology/Software Development/Software Engineering',
        color: 'danger',
    },
    {
        name: 'Technology/Software Development/Web Development',
        color: 'secondary',
    },
    {
        name: 'Technology/Hardware',
        color: 'default',
    },
    {
        name: 'Technology/Hardware/Computers',
        color: 'primary',
    },
    {
        name: 'Technology/Hardware/Mobile Devices',
        color: 'success',
    },
    {
        name: 'Technology/Hardware/Peripherals',
        color: 'warning',
    },
    {
        name: 'Technology/AI',
        color: 'danger',
    },
    {
        name: 'Technology/Robotics',
        color: 'secondary',
    },
    {
        name: 'Science',
        color: 'default',
    },
    {
        name: 'Science/Physics',
        color: 'primary',
    },
    {
        name: 'Science/Physics/Quantum Mechanics',
        color: 'success',
    },
    {
        name: 'Science/Physics/Astrophysics',
        color: 'danger',
    },
    {
        name: 'Science/Biology',
        color: 'secondary',
    },
    {
        name: 'Science/Biology/Genetics',
        color: 'default',
    },
    {
        name: 'Science/Biology/Ecology',
        color: 'primary',
    },
    {
        name: 'Science/Biology/Neuroscience',
        color: 'success',
    },
    {
        name: 'Science/Chemistry',
        color: 'warning',
    },
    {
        name: 'Science/Astronomy',
        color: 'danger',
    },
    {
        name: 'Art',
        color: 'secondary',
    },
    {
        name: 'Art/Music',
        color: 'default',
    },
    {
        name: 'Art/Music/Classical',
        color: 'primary',
    },
    {
        name: 'Art/Music/Jazz',
        color: 'success',
    },
    {
        name: 'Art/Literature/Fiction',
        color: 'secondary',
    },
    {
        name: 'Art/Literature/Non-Fiction',
        color: 'default',
    },
    {
        name: 'Art/Literature/Poetry',
        color: 'primary',
    },
    { name: 'Art/Painting', color: 'success' },
    { name: 'Art/Sculpture', color: 'warning' },
    { name: 'Food', color: 'danger' },
    { name: 'Food/Fruits', color: 'secondary' },
    { name: 'Food/Fruits/Apple', color: 'default' },
    { name: 'Food/Fruits/Banana', color: 'primary' },
    { name: 'Food/Fruits/Orange', color: 'success' },
    { name: 'Food/Vegetables', color: 'warning' },
    { name: 'Food/Vegetables/Carrot', color: 'danger' },
    { name: 'Food/Vegetables/Broccoli', color: 'secondary' },
    { name: 'Food/Vegetables/Spinach', color: 'default' },
    { name: 'Food/Cuisine', color: 'primary' },
    { name: 'Food/Recipes', color: 'success' },
    { name: 'Sports', color: 'warning' },
    { name: 'Sports/Team Sports', color: 'danger' },
    { name: 'Sports/Team Sports/Football', color: 'secondary' },
    { name: 'Sports/Team Sports/Basketball', color: 'default' },
    { name: 'Sports/Team Sports/Baseball', color: 'primary' },
    { name: 'Sports/Individual Sports', color: 'success' },
    { name: 'Sports/Individual Sports/Tennis', color: 'warning' },
    { name: 'Sports/Individual Sports/Swimming', color: 'danger' },
    { name: 'Sports/Individual Sports/Running', color: 'secondary' },
    { name: 'Sports/Yoga', color: 'default' },
    { name: 'Sports/Gymnastics', color: 'primary' },
    { name: 'Travel', color: 'success' },
    { name: 'Travel/Destinations', color: 'warning' },
    { name: 'Travel/Destinations/Europe', color: 'danger' },
    { name: 'Travel/Destinations/Asia', color: 'secondary' },
    { name: 'Travel/Destinations/Americas', color: 'default' },
    { name: 'Travel/Activities', color: 'primary' },
    { name: 'Travel/Activities/Hiking', color: 'success' },
    { name: 'Travel/Activities/Scuba Diving', color: 'warning' },
    { name: 'Travel/Activities/Skiing', color: 'danger' },
    { name: 'Travel/Adventure', color: 'secondary' },
    { name: 'Travel/Tourism', color: 'default' },
    { name: 'Health', color: 'primary' },
    { name: 'Health/Fitness', color: 'success' },
    { name: 'Health/Fitness/Exercise', color: 'warning' },
    { name: 'Health/Fitness/Nutrition', color: 'danger' },
    { name: 'Health/Fitness/Mental Health', color: 'secondary' },
    { name: 'Health/Medical', color: 'default' },
    { name: 'Health/Medical/General Medicine', color: 'primary' },
    { name: 'Health/Medical/Dentistry', color: 'success' },
    { name: 'Health/Medical/Surgery', color: 'warning' },
    { name: 'Health/Wellness', color: 'danger' },
    { name: 'Health/Diet', color: 'secondary' },
    { name: 'Education', color: 'default' },
    { name: 'Education/Subjects', color: 'primary' },
    { name: 'Education/Subjects/Mathematics', color: 'success' },
    { name: 'Education/Subjects/History', color: 'warning' },
    { name: 'Education/Subjects/Geography', color: 'danger' },
    { name: 'Education/Online Courses', color: 'secondary' },
    { name: 'Education/E-learning', color: 'default' },
    { name: 'Business', color: 'primary' },
    { name: 'Business/Finance', color: 'success' },
    { name: 'Business/Finance/Investment', color: 'warning' },
    { name: 'Business/Finance/Accounting', color: 'danger' },
    { name: 'Business/Finance/Marketing', color: 'secondary' },
    { name: 'Business/Entrepreneurship', color: 'default' },
    { name: 'Business/Startups', color: 'primary' },
    { name: 'Entertainment', color: 'success' },
    { name: 'Entertainment/Movies', color: 'warning' },
    { name: 'Entertainment/Movies/Action', color: 'danger' },
    { name: 'Entertainment/Movies/Comedy', color: 'secondary' },
    { name: 'Entertainment/Movies/Drama', color: 'default' },
    { name: 'Entertainment/Games', color: 'primary' },
    { name: 'Entertainment/Games/Video Games', color: 'success' },
    { name: 'Entertainment/Games/Board Games', color: 'warning' },
    { name: 'Entertainment/Games/Card Games', color: 'danger' },
    { name: 'Entertainment/Music', color: 'secondary' },
    { name: 'Entertainment/TV Shows', color: 'default' },
];

export default function HomePage() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div>
                <Search tags={tags} />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                {tags.map((tag) => (
                    <Tag key={tag.name} color={tag.color}>
                        {tag.name}
                    </Tag>
                ))}
            </div>
        </section>
    );
}
