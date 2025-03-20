'use client';

import { Card } from '@/types/card';
import { GridCard } from '@/components/grid-card';

interface CardsGridProps {
    cards: Card[];
}

export function CardsGrid({ cards }: CardsGridProps) {
    return (
        <div className="grid grid-cols-5 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => (
                <GridCard
                    key={card.id}
                    card={card}
                />
            ))}
        </div>
    );
}
