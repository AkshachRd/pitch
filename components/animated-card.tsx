'use client';

import { Card, CardFooter, CardHeader, Divider } from '@heroui/react';
import { motion, PanInfo } from 'framer-motion';
import { FC, useState } from 'react';
import { Spoiler } from 'spoiled';

const cardVariants = {
    initial: ({ scale }: { scale: number }) => ({ scale: scale - 0.05 }),
    animate: ({ scale, rotation }: { scale: number; rotation: number }) => ({
        scale,
        x: 0,
        opacity: 1,
        rotate: rotation,
    }),
    exit: ({ exitDirection }: { exitDirection: number }) => ({
        x: exitDirection > 0 ? 1000 : -1000,
        opacity: 0,
        rotate: exitDirection > 0 ? 15 : -15,
    }),
};

interface AnimatedCardProps {
    scale: number;
    className?: string;
    delay: number;
    headerContent?: string;
    footerContent?: string;
    isDraggable?: boolean;
    onDrag?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
    onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

export const AnimatedCard: FC<AnimatedCardProps> = ({
    scale,
    className,
    delay,
    headerContent,
    footerContent,
    isDraggable,
    onDrag,
    onDragEnd,
}) => {
    const [rotation, setRotation] = useState(0);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        onDragEnd?.(event, info);
        setRotation(0);
    };

    const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        onDrag?.(event, info);
        const rotate = info.offset.x / 25;
        setRotation(rotate);
    };

    return (
        <motion.div
            animate="animate"
            className={className}
            custom={{ scale, rotation }}
            drag={isDraggable ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            exit="exit"
            initial="initial"
            transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                rotate: { type: 'spring', stiffness: 300, damping: 30 },
                duration: 0.5,
                delay,
            }}
            variants={cardVariants}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
        >
            <Card className="w-[400px]" shadow="lg">
                <CardHeader className="h-24 justify-center">{headerContent}</CardHeader>
                <Divider />
                <CardFooter className="h-24 justify-center">
                    <Spoiler>{footerContent}</Spoiler>
                </CardFooter>
            </Card>
        </motion.div>
    );
};
