'use client';

import { Card, CardFooter, CardHeader, Divider } from '@heroui/react';

import { title } from '@/components/primitives';
import { useCardStore } from '@/store/store';
import { CardStack } from '@/components/card-stack';

export default function CardsPage() {
    const cards = useCardStore((state) => state.cards);

    return (
        <div>
            <h1 className={title()}>Cards</h1>
            {cards.map((card) => (
                <Card key={card.id + card.frontSide + card.backSide}>
                    <CardHeader>{card.frontSide}</CardHeader>
                    <Divider />
                    <CardFooter>{card.backSide}</CardFooter>
                </Card>
            ))}
            <CardStack />
        </div>
    );
}
