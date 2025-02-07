'use client';

import { useCardStore } from '@/store/store';
import { CardStack } from '@/components/card-stack';
import { useState } from 'react';
import { Card } from '@/types/card';
import { Button } from '@heroui/react';
import { Side } from '@/components/side';

export default function LearnPage() {
    // const cards = useCardStore((state) => state.cards);
    const [cards, setCards] = useState<Card[]>([
        { id: '1', frontSide: 'Forest', backSide: 'Лес' },
        { id: '2', frontSide: 'Conclave', backSide: 'Тайное собрание' },
        { id: '3', frontSide: 'Hope', backSide: 'Надежда' },
    ]);

    return (
        <div className="flex w-full items-center justify-center h-full">
            <Side color="red">
                <Button variant="bordered">No</Button>
            </Side>
            <CardStack
                cards={cards}
                onRemove={() => {
                    setCards((state) => state.slice(1));
                }}
            />
            <Side color="green">
                <Button variant="bordered">Yes</Button>
            </Side>
        </div>
    );
}
