import { Card, CardFooter, CardHeader, Divider } from "@heroui/react";
import { FC } from "react";
import { motion } from "framer-motion";

const cardVariants = {
    initial: ({ scale }: { scale: number }) => ({ scale: scale - 0.5 }),
    animate: ({ scale }: { scale: number }) => ({ scale }),
    exit: ({ exitDirection }: { exitDirection?: string }) => ({
        x: exitDirection === 'left' ? -1000 : exitDirection === 'right' ? 1000 : 0,
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
    onDragEnd?: (event: any, info: any) => void;
    exitDirection?: string;
}

export const AnimatedCard: FC<AnimatedCardProps> = ({ scale, className, delay, headerContent, footerContent, exitDirection, onDragEnd, isDraggable }) => (
    <motion.div 
        className={className}
        initial="initial"
        animate="animate"
        custom={{ scale, exitDirection }}
        variants={cardVariants}
        transition={{ duration: 0.5, delay }}
        exit='exit'
        onDragEnd={onDragEnd}
        drag={isDraggable ? 'x' : false}
    >
        <Card className="w-[400px]" shadow='lg'>
            <CardHeader className='h-24 justify-center'>{headerContent}</CardHeader>
            <Divider />
            <CardFooter className='h-24 justify-center'>{footerContent}</CardFooter>
        </Card>
    </motion.div>
);


