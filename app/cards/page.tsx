import { Suspense } from 'react';
import { Spinner } from '@heroui/react';

import { title } from '@/components/primitives';
import { CoolButton } from '@/components/cool-button';
import { Chat } from '@/components/chat';

export default function CardsPage() {
    // const cards = useCardStore((state) => state.cards);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className={title()}>Cards</h1>
            <Suspense fallback={<Spinner />}>
                <Chat />
            </Suspense>
            <CoolButton />
        </div>
    );
}
