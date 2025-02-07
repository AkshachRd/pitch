'use client';

import { Card, CardFooter, CardHeader, Divider } from '@heroui/react';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';

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
    setExitDirection?: (value: number) => void;
    onRemove?: () => void;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export const AnimatedCard: FC<AnimatedCardProps> = ({
    scale,
    className,
    delay,
    headerContent,
    footerContent,
    isDraggable,
    setExitDirection,
    onRemove,
}) => {
    const [rotation, setRotation] = useState(0);
    const handleDragEnd = (event: any, { offset, velocity }: any) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            setExitDirection?.(-1);
            onRemove?.();
        } else if (swipe > swipeConfidenceThreshold) {
            setExitDirection?.(1);
            onRemove?.();
        }
        setRotation(0);
    };
    const handleDrag = (event: any, info: any) => {
        const rotate = info.offset.x / 25;
        setRotation(rotate);
    };
    return (
        <motion.div
            className={className}
            initial="initial"
            animate="animate"
            custom={{ scale, rotation }}
            variants={cardVariants}
            transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                rotate: { type: 'spring', stiffness: 300, damping: 30 },
                duration: 0.5,
                delay,
            }}
            exit="exit"
            onDragEnd={handleDragEnd}
            drag={isDraggable ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDrag={handleDrag}
        >
            <Card className="w-[400px]" shadow="lg">
                <CardHeader className="h-24 justify-center">{headerContent}</CardHeader>
                <Divider />
                <CardFooter className="h-24 justify-center">{footerContent}</CardFooter>
            </Card>
        </motion.div>
    );
};
