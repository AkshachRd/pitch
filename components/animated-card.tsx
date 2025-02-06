import { Card, CardFooter, CardHeader, Divider } from "@heroui/react";
import { FC } from "react";
import { motion } from "framer-motion";

const cardVariants = {
    initial: (custom: number) => ({ scale: custom - 0.5 }),
    animate: (custom: number) => ({ scale: custom }),
};

interface AnimatedCardProps {
    className?: string;
    custom: number;
    delay: number;
    headerContent?: string;
    footerContent?: string;
}

export const AnimatedCard: FC<AnimatedCardProps> = ({ custom, className, delay, headerContent, footerContent }) => (
    <motion.div 
        className={className}
        initial="initial"
        animate="animate"
        custom={custom}
        variants={cardVariants}
        transition={{ duration: 0.5, delay }}
    >
        <Card className="w-[400px]" shadow='lg'>
            <CardHeader className='h-24 justify-center'>{headerContent}</CardHeader>
            <Divider />
            <CardFooter className='h-24 justify-center'>{footerContent}</CardFooter>
        </Card>
    </motion.div>
);


