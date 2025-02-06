import { FC, useState } from 'react';
import { AnimatedCard } from './animated-card';
import { Card } from '@/types/card';
import { AnimatePresence } from 'framer-motion';

export interface CardStackProps {
    className?: string;
    cards: Card[];
    onRemove: () => void;
}

export const CardStack: FC<CardStackProps> = ({ className, cards, onRemove }) => {
    const [direction, setDirection] = useState<string | undefined>(undefined);

    const handleDragEnd = (event, info) => {
        if (info.offset.x < -100) {
            setDirection('left');
            onRemove();
        } else if (info.offset.x > 100) {
            setDirection('right');
            onRemove();
        } else {
            setDirection(undefined);
        }
    };

    return (
        <div className="relative">
            {cards.length > 2 && (
                <AnimatedCard
                    key={cards[2].id}
                    scale={0.9}
                    className="absolute top-10"
                    delay={0.4}
                />
            )}
            {cards.length > 1 && (
                <AnimatedCard
                    key={cards[1].id}
                    scale={0.95}
                    className="absolute top-5"
                    delay={0.2}
                />
            )}
            <AnimatePresence initial={false} custom={{ exitDirection: direction }}>
                {cards.length > 0 && (
                    <AnimatedCard
                        key={cards[0].id}
                        scale={1}
                        delay={0}
                        headerContent={cards[0].frontSide}
                        footerContent={cards[0].backSide}
                        isDraggable={true}
                        onDragEnd={handleDragEnd}
                        exitDirection={direction}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
