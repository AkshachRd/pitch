'use client';

import { useState } from 'react';
import { Button } from '@heroui/react';

import { CardStack } from '@/components/card-stack';
import { Card } from '@/types/card';
import { Side } from '@/components/side';

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
            <Side className="relative rounded-lg bg-white">
                <Button variant="bordered">Yes</Button>
            </Side>
        </div>
    );
}
