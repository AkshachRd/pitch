'use client';

import { useState } from 'react';

import { SearchBar } from '@/widgets/search-panel';
import { HomeContent } from '@/widgets/cards-list';
import { Tag } from '@/entities/tag';

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
