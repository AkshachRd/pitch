'use client';

import { useCardStore } from '@/store/store';
import { CardStack } from '@/components/card-stack';
import { useState } from 'react';
import { Card } from '@/types/card';

export default function LearnPage() {
    // const cards = useCardStore((state) => state.cards);
    const [cards, setCards] = useState<Card[]>([
        { id: '1', frontSide: 'Forest', backSide: 'Лес' },
        { id: '2', frontSide: 'Conclave', backSide: 'Тайное собрание' },
        { id: '3', frontSide: 'Hope', backSide: 'Надежда' },
    ]);

    return (
        <>
            <CardStack
                cards={cards}
                onRemove={() => {
                    setCards((state) => state.slice(1));
                }}
            />
        </>
    );
}
