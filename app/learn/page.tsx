'use client';

import { useState } from 'react';

import { CardStack } from '@/components/card-stack';
import { Card as CardType } from '@/types/card';
import { Side } from '@/components/side';
import { PanInfo } from 'framer-motion';
import { ShowAnswerButton } from '@/components/show-answer-button';

const swipeConfidenceThreshold = 200;

export default function LearnPage() {
    // const cards = useCardStore((state) => state.cards);
    const [cards, setCards] = useState<CardType[]>([
        { id: '1', frontSide: 'Forest', backSide: 'Лес' },
        { id: '2', frontSide: 'Conclave', backSide: 'Тайное собрание' },
        { id: '3', frontSide: 'Hope', backSide: 'Надежда' },
    ]);
    const [leftActive, setLeftActive] = useState(false);
    const [rightActive, setRightActive] = useState(false);
    const [revealBack, setRevealBack] = useState(false);

    const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setLeftActive(info.offset.x < -swipeConfidenceThreshold);
        setRightActive(info.offset.x > swipeConfidenceThreshold);
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setLeftActive(false);
        setRightActive(false);
    };

    return (
        <div className="flex h-full w-full items-center justify-center">
            <Side color="danger" isActive={leftActive}>
                No
            </Side>
            <div className="flex h-full flex-col justify-evenly">
                <CardStack
                    swipeConfidenceThreshold={swipeConfidenceThreshold}
                    cards={cards}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    onRemove={() => {
                        setCards((state) => state.slice(1));
                        setLeftActive(false);
                        setRightActive(false);
                        setRevealBack(false);
                    }}
                    revealBack={revealBack}
                />
                <ShowAnswerButton
                    disabled={revealBack}
                    onPress={() => {
                        setRevealBack(true);
                    }}
                    onCountDown={() => {
                        setRevealBack(false);
                    }}
                />
            </div>
            <Side color="success" isActive={rightActive}>
                Yes
            </Side>
        </div>
    );
}
