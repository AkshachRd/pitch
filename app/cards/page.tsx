'use client';

import { title } from '@/components/primitives';
import { useCardStore } from '@/store/store';
export default function CardsPage() {
    const cards = useCardStore((state) => state.cards);

    return (
        <div>
            <h1 className={title()}>Cards</h1>
            {cards.map((card) => (
                <div key={card.id + card.frontSide + card.backSide} className="border-2">
                    <p>Id: {card.id}</p>
                    <p>Front side: {card.frontSide}</p>
                    <p>Back side: {card.backSide}</p>
                </div>
            ))}
        </div>
    );
}
