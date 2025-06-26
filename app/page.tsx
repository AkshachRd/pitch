import { HomeContent } from '@/components/home-content';
import { SearchBar } from '@/components/search-bar';

export default async function HomePage() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div>
                <SearchBar />
            </div>
            <div>
                <HomeContent />
            </div>
        </section>
    );
}
