'use client';

import { useState } from 'react';
import { PanInfo } from 'framer-motion';
import { useKeyboard } from 'react-aria';

import { CardStack } from '@/src/components/card-stack';
import { Side } from '@/src/components/side';
import { ShowAnswerButton } from '@/src/components/show-answer-button';
import { useCardStore } from '@/src/store/cards';

const swipeConfidenceThreshold = 200;

export function Learn() {
    const { cards } = useCardStore();
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
        // setCards((state) => state.slice(1));
        setRevealBack(false);
    };

    if (!cards) {
        return <div>No cards(</div>;
    }

    return (
        <div className="flex h-full w-full items-center justify-center" {...keyboardProps}>
            <Side color="danger" isActive={leftActive}>
                Bad
            </Side>
            <div className="flex h-full flex-col justify-evenly">
                <CardStack
                    cards={cards}
                    exitDirection={exitDirection}
                    revealBack={revealBack}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                />
                <ShowAnswerButton
                    disabled={revealBack}
                    onCountDown={() => {
                        setRevealBack(false);
                    }}
                    onPress={() => {
                        setRevealBack(true);
                    }}
                />
            </div>
            <Side color="success" isActive={rightActive}>
                Good
            </Side>
        </div>
    );
}
