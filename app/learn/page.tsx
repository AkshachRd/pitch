'use client';

import { useCardStore } from '@/store/store';
import { CardStack } from '@/components/card-stack';
import { useState } from 'react';
import { Card } from '@/types/card';
import { Button } from '@heroui/react';
import { Side } from '@/components/side';
import { CoolButton } from '@/components/cool-button';

export default function LearnPage() {
    // const cards = useCardStore((state) => state.cards);
    const [cards, setCards] = useState<Card[]>([
        { id: '1', frontSide: 'Forest', backSide: 'Лес' },
        { id: '2', frontSide: 'Conclave', backSide: 'Тайное собрание' },
        { id: '3', frontSide: 'Hope', backSide: 'Надежда' },
    ]);

    return (
        <div className="flex h-full w-full items-center justify-center">
            <Side color="red">
                <Button variant="bordered">No</Button>
            </Side>
            <CardStack
                cards={cards}
                onRemove={() => {
                    setCards((state) => state.slice(1));
                }}
            />

            <CoolButton className="flex-auto h-full p-6">
                <Side className='relative bg-white rounded-lg'>
                    <Button variant="bordered">Yes</Button>
                </Side>
            </CoolButton>
        </div>
    );
}
