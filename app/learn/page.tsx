'use client';

import { useState } from 'react';

import { CardStack } from '@/components/card-stack';
import { Card as CardType } from '@/types/card';
import { Side } from '@/components/side';
import { PanInfo } from 'framer-motion';
import { ShowAnswerButton } from '@/components/show-answer-button';
import { useKeyboard } from 'react-aria';

const swipeConfidenceThreshold = 200;

export default function LearnPage() {
    // const cards = useCardStore((state) => state.cards);
    const [cards, setCards] = useState<CardType[]>([
        { id: '1', frontSide: 'Forest', backSide: 'Лес' },
        { id: '2', frontSide: 'Conclave', backSide: 'Тайное собрание' },
        { id: '3', frontSide: 'Hope', backSide: 'Надежда' },
    ]);
    const [exitDirection, setExitDirection] = useState<number>(0);
    const [leftActive, setLeftActive] = useState(false);
    const [rightActive, setRightActive] = useState(false);
    const [revealBack, setRevealBack] = useState(false);

    const { keyboardProps } = useKeyboard({
        onKeyDown: (e) => {
            if (e.key === 'ArrowLeft') {
                setExitDirection(-1);
                handleRemove();
            } else if (e.key === 'ArrowRight') {
                setExitDirection(1);
                handleRemove();
            }
        },
    });

    const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setLeftActive(info.offset.x < -swipeConfidenceThreshold);
        setRightActive(info.offset.x > swipeConfidenceThreshold);
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x < -swipeConfidenceThreshold) {
            setExitDirection?.(-1);
            handleRemove();
        } else if (info.offset.x > swipeConfidenceThreshold) {
            setExitDirection?.(1);
            handleRemove();
        }

        setLeftActive(false);
        setRightActive(false);
    };

    const handleRemove = () => {
        setCards((state) => state.slice(1));
        setRevealBack(false);
    };

    return (
        <div className="flex h-full w-full items-center justify-center" {...keyboardProps}>
            <Side color="danger" isActive={leftActive}>
                Bad
            </Side>
            <div className="flex h-full flex-col justify-evenly">
                <CardStack
                    exitDirection={exitDirection}
                    cards={cards}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
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
                Good
            </Side>
        </div>
    );
}
