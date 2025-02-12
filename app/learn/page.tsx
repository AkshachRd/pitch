'use client';

import { useState } from 'react';

import { CardStack } from '@/components/card-stack';
import { Card as CardType } from '@/types/card';
import { Side } from '@/components/side';
import { PanInfo } from 'framer-motion';

export default function LearnPage() {
    // const cards = useCardStore((state) => state.cards);
    const [cards, setCards] = useState<CardType[]>([
        { id: '1', frontSide: 'Forest', backSide: 'Лес' },
        { id: '2', frontSide: 'Conclave', backSide: 'Тайное собрание' },
        { id: '3', frontSide: 'Hope', backSide: 'Надежда' },
    ]);
    const [leftActive, setLeftActive] = useState(false);
    const [rightActive, setRightActive] = useState(false);

    const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 100;
        setLeftActive(info.offset.x < -threshold);
        setRightActive(info.offset.x > threshold);
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        console.log(event, info);
        setLeftActive(false);
        setRightActive(false);
    };

    return (
        <div className="flex h-full w-full items-center justify-center">
            <Side color="red" isActive={leftActive} />
            <CardStack
                cards={cards}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                onRemove={() => {
                    setCards((state) => state.slice(1));
                    setLeftActive(false);
                    setRightActive(false);
                }}
            />
            <Side color="green" isActive={rightActive} />
        </div>
    );
}
