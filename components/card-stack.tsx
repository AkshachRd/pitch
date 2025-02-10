'use client';

import { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useKeyboard } from 'react-aria';
import clsx from 'clsx';

import { AnimatedCard } from './animated-card';

import { Card } from '@/types/card';
import { fontSerif } from '@/config/fonts';

export interface CardStackProps {
    className?: string;
    cards: Card[];
    onRemove?: () => void;
}

export const CardStack: FC<CardStackProps> = ({ className, cards, onRemove }) => {
    const [exitDirection, setExitDirection] = useState<number>(0);
    const { keyboardProps } = useKeyboard({
        onKeyDown: (e) => {
            if (e.key === 'ArrowLeft') {
                setExitDirection(-1);
                onRemove?.();
            } else if (e.key === 'ArrowRight') {
                setExitDirection(1);
                onRemove?.();
            }
        },
    });

    return (
        <div
            className={clsx(
                className,
                'relative h-[193px] w-[400px] font-serif',
                fontSerif.variable,
            )}
            {...keyboardProps}
        >
            {cards.length > 2 && (
                <AnimatedCard
                    key={cards[2].id}
                    className="absolute top-10"
                    delay={0.4}
                    scale={0.9}
                />
            )}
            {cards.length > 1 && (
                <AnimatedCard
                    key={cards[1].id}
                    className="absolute top-5"
                    delay={0.2}
                    footerContent={cards[1].backSide}
                    headerContent={cards[1].frontSide}
                    scale={0.95}
                />
            )}
            <AnimatePresence custom={{ exitDirection: exitDirection }} initial={false}>
                {cards.length > 0 && (
                    <AnimatedCard
                        key={cards[0].id}
                        className="absolute top-0 z-10"
                        delay={0}
                        footerContent={cards[0].backSide}
                        headerContent={cards[0].frontSide}
                        isDraggable={true}
                        scale={1}
                        setExitDirection={setExitDirection}
                        onRemove={onRemove}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
