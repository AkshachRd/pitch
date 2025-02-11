'use client';

import { useState } from 'react';

import { CardStack } from '@/components/card-stack';
import { Card as CardType } from '@/types/card';
import { Side } from '@/components/side';

export default function LearnPage() {
    // const cards = useCardStore((state) => state.cards);
    const [cards, setCards] = useState<CardType[]>([
        { id: '1', frontSide: 'Forest', backSide: 'Лес' },
        { id: '2', frontSide: 'Conclave', backSide: 'Тайное собрание' },
        { id: '3', frontSide: 'Hope', backSide: 'Надежда' },
    ]);

    return (
        <div className="flex h-full w-full items-center justify-center">
            <Side color="red" />
            <CardStack
                cards={cards}
                onRemove={() => {
                    setCards((state) => state.slice(1));
                }}
            />
            <Side color="green" />
        </div>
    );
}
