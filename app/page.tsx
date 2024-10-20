import { Search } from '@/components/search';
import { Tag } from '@/components/tag';

export type Tag = {
    tag: string;
    color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
};

const tags: Tag[] = [
    { tag: 'Technology', color: 'primary' },
    { tag: 'Technology/Software Development', color: 'success' },
    {
        tag: 'Technology/Software Development/Programming Languages',
        color: 'warning',
    },
    {
        tag: 'Technology/Software Development/Software Engineering',
        color: 'danger',
    },
    {
        tag: 'Technology/Software Development/Web Development',
        color: 'secondary',
    },
    { tag: 'Technology/Hardware', color: 'default' },
    { tag: 'Technology/Hardware/Computers', color: 'primary' },
    { tag: 'Technology/Hardware/Mobile Devices', color: 'success' },
    { tag: 'Technology/Hardware/Peripherals', color: 'warning' },
    { tag: 'Technology/AI', color: 'danger' },
    { tag: 'Technology/Robotics', color: 'secondary' },
    { tag: 'Science', color: 'default' },
    { tag: 'Science/Physics', color: 'primary' },
    { tag: 'Science/Physics/Quantum Mechanics', color: 'success' },
    { tag: 'Science/Physics/Thermodynamics', color: 'warning' },
    { tag: 'Science/Physics/Astrophysics', color: 'danger' },
    { tag: 'Science/Biology', color: 'secondary' },
    { tag: 'Science/Biology/Genetics', color: 'default' },
    { tag: 'Science/Biology/Ecology', color: 'primary' },
    { tag: 'Science/Biology/Neuroscience', color: 'success' },
    { tag: 'Science/Chemistry', color: 'warning' },
    { tag: 'Science/Astronomy', color: 'danger' },
    { tag: 'Art', color: 'secondary' },
    { tag: 'Art/Music', color: 'default' },
    { tag: 'Art/Music/Classical', color: 'primary' },
    { tag: 'Art/Music/Jazz', color: 'success' },
    { tag: 'Art/Music/Rock', color: 'warning' },
    { tag: 'Art/Literature', color: 'danger' },
    { tag: 'Art/Literature/Fiction', color: 'secondary' },
    { tag: 'Art/Literature/Non-Fiction', color: 'default' },
    { tag: 'Art/Literature/Poetry', color: 'primary' },
    { tag: 'Art/Painting', color: 'success' },
    { tag: 'Art/Sculpture', color: 'warning' },
    { tag: 'Food', color: 'danger' },
    { tag: 'Food/Fruits', color: 'secondary' },
    { tag: 'Food/Fruits/Apple', color: 'default' },
    { tag: 'Food/Fruits/Banana', color: 'primary' },
    { tag: 'Food/Fruits/Orange', color: 'success' },
    { tag: 'Food/Vegetables', color: 'warning' },
    { tag: 'Food/Vegetables/Carrot', color: 'danger' },
    { tag: 'Food/Vegetables/Broccoli', color: 'secondary' },
    { tag: 'Food/Vegetables/Spinach', color: 'default' },
    { tag: 'Food/Cuisine', color: 'primary' },
    { tag: 'Food/Recipes', color: 'success' },
    { tag: 'Sports', color: 'warning' },
    { tag: 'Sports/Team Sports', color: 'danger' },
    { tag: 'Sports/Team Sports/Football', color: 'secondary' },
    { tag: 'Sports/Team Sports/Basketball', color: 'default' },
    { tag: 'Sports/Team Sports/Baseball', color: 'primary' },
    { tag: 'Sports/Individual Sports', color: 'success' },
    { tag: 'Sports/Individual Sports/Tennis', color: 'warning' },
    { tag: 'Sports/Individual Sports/Swimming', color: 'danger' },
    { tag: 'Sports/Individual Sports/Running', color: 'secondary' },
    { tag: 'Sports/Yoga', color: 'default' },
    { tag: 'Sports/Gymnastics', color: 'primary' },
    { tag: 'Travel', color: 'success' },
    { tag: 'Travel/Destinations', color: 'warning' },
    { tag: 'Travel/Destinations/Europe', color: 'danger' },
    { tag: 'Travel/Destinations/Asia', color: 'secondary' },
    { tag: 'Travel/Destinations/Americas', color: 'default' },
    { tag: 'Travel/Activities', color: 'primary' },
    { tag: 'Travel/Activities/Hiking', color: 'success' },
    { tag: 'Travel/Activities/Scuba Diving', color: 'warning' },
    { tag: 'Travel/Activities/Skiing', color: 'danger' },
    { tag: 'Travel/Adventure', color: 'secondary' },
    { tag: 'Travel/Tourism', color: 'default' },
    { tag: 'Health', color: 'primary' },
    { tag: 'Health/Fitness', color: 'success' },
    { tag: 'Health/Fitness/Exercise', color: 'warning' },
    { tag: 'Health/Fitness/Nutrition', color: 'danger' },
    { tag: 'Health/Fitness/Mental Health', color: 'secondary' },
    { tag: 'Health/Medical', color: 'default' },
    { tag: 'Health/Medical/General Medicine', color: 'primary' },
    { tag: 'Health/Medical/Dentistry', color: 'success' },
    { tag: 'Health/Medical/Surgery', color: 'warning' },
    { tag: 'Health/Wellness', color: 'danger' },
    { tag: 'Health/Diet', color: 'secondary' },
    { tag: 'Education', color: 'default' },
    { tag: 'Education/Subjects', color: 'primary' },
    { tag: 'Education/Subjects/Mathematics', color: 'success' },
    { tag: 'Education/Subjects/History', color: 'warning' },
    { tag: 'Education/Subjects/Geography', color: 'danger' },
    { tag: 'Education/Online Courses', color: 'secondary' },
    { tag: 'Education/E-learning', color: 'default' },
    { tag: 'Business', color: 'primary' },
    { tag: 'Business/Finance', color: 'success' },
    { tag: 'Business/Finance/Investment', color: 'warning' },
    { tag: 'Business/Finance/Accounting', color: 'danger' },
    { tag: 'Business/Finance/Marketing', color: 'secondary' },
    { tag: 'Business/Entrepreneurship', color: 'default' },
    { tag: 'Business/Startups', color: 'primary' },
    { tag: 'Entertainment', color: 'success' },
    { tag: 'Entertainment/Movies', color: 'warning' },
    { tag: 'Entertainment/Movies/Action', color: 'danger' },
    { tag: 'Entertainment/Movies/Comedy', color: 'secondary' },
    { tag: 'Entertainment/Movies/Drama', color: 'default' },
    { tag: 'Entertainment/Games', color: 'primary' },
    { tag: 'Entertainment/Games/Video Games', color: 'success' },
    { tag: 'Entertainment/Games/Board Games', color: 'warning' },
    { tag: 'Entertainment/Games/Card Games', color: 'danger' },
    { tag: 'Entertainment/Music', color: 'secondary' },
    { tag: 'Entertainment/TV Shows', color: 'default' },
];

export default function HomePage() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div>
                <Search tags={tags} />
            </div>
            <div className="flex flex-wrap justify-center">
                {tags.map((tag) => (
                    <Tag key={tag.tag} color={tag.color}>
                        {tag.tag}
                    </Tag>
                ))}
            </div>
        </section>
    );
}
