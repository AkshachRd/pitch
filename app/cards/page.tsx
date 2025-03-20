import { Suspense } from 'react';
import { Spinner } from '@heroui/react';

import { title } from '@/components/primitives';
import { CoolButton } from '@/components/cool-button';
import { Chat } from '@/components/chat';
import { CardsGrid } from '@/components/cards-grid';

const mockCards = [
    {
        id: 1,
        front_side: 'What is React?',
        back_side: 'A JavaScript library for building user interfaces',
    },
    {
        id: 2,
        front_side: 'What is JSX?',
        back_side: 'A syntax extension for JavaScript',
    },
    {
        id: 3,
        front_side: 'What are hooks?',
        back_side: 'Functions that let you use state and other React features',
    },
];

export default function CardsPage() {
    return (
        <div className="flex h-full w-full flex-col items-center p-4">
            <h1 className={title()}>Cards</h1>
            <CardsGrid cards={mockCards} />
            {/* <Suspense fallback={<Spinner />}>
                <Chat />
            </Suspense>
            <CoolButton /> */}
        </div>
    );
}
