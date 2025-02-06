import { Card, CardFooter, CardHeader, Divider } from '@heroui/react';
import { motion } from 'framer-motion';
import { FC } from 'react';

const cardVariants = {
    initial: ({ scale }: { scale: number }) => ({ scale: scale - 0.05 }),
    animate: ({ scale }: { scale: number }) => ({ scale, x: 0, opacity: 1 }),
    exit: ({ exitDirection }: { exitDirection: number }) => ({
        x: exitDirection < 0 ? 1000 : -1000,
        opacity: 0,
    }),
};

interface AnimatedCardProps {
    scale: number;
    className?: string;
    delay: number;
    headerContent?: string;
    footerContent?: string;
    isDraggable?: boolean;
    setExitDirection?: (value?: number) => void;
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
    const handleDragEnd = (event: any, { offset, velocity }: any) => {
        const swipe = swipePower(offset.x, velocity.x);
        console.log(swipe);

        if (swipe < -swipeConfidenceThreshold) {
            setExitDirection?.(1);
            onRemove?.();
        } else if (swipe > swipeConfidenceThreshold) {
            setExitDirection?.(-1);
            onRemove?.();
        }
    };
    return (
        <motion.div
            className={className}
            initial="initial"
            animate="animate"
            custom={{ scale }}
            variants={cardVariants}
            transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                duration: 0.5,
                delay,
            }}
            exit="exit"
            onDragEnd={handleDragEnd}
            drag={isDraggable ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
        >
            <Card className="w-[400px]" shadow="lg">
                <CardHeader className="h-24 justify-center">{headerContent}</CardHeader>
                <Divider />
                <CardFooter className="h-24 justify-center">{footerContent}</CardFooter>
            </Card>
        </motion.div>
    );
};
