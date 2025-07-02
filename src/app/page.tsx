'use client';

import { useState } from 'react';

import { HomeContent } from '@/src/components/home-content';
import { SearchBar } from '@/src/components/search-bar';
import { Tag } from '@/src/models/tag';

export function HomePage() {
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
