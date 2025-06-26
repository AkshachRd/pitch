'use client';

import { useState } from 'react';

import { HomeContent } from '@/components/home-content';
import { SearchBar } from '@/components/search-bar';
import { Tag } from '@/models/tag';

export default async function HomePage() {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div>
                <SearchBar selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            </div>
            <div>
                <HomeContent selectedTags={selectedTags} />
            </div>
        </section>
    );
}
