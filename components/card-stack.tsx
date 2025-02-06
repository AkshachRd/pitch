import { Card, CardFooter, CardHeader, Divider } from "@heroui/react";
import { FC } from "react";
import { motion } from "framer-motion";

export interface CardStackProps {
    className?: string; 
}

const cardVariants = {
    initial: (custom) => ({ scale: custom - 0.5 }),
    animate: (custom) => ({ scale: custom }),
};

export const CardStack: FC<CardStackProps> = () => {
    return (
        <div className="relative">
            <motion.div 
                className='absolute top-10 scale-90'
                initial={{ scale: 0 }}
                animate="animate"
                custom={0.9}
                variants={cardVariants}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Card className="w-[400px]" shadow='lg'>
                    <CardHeader className='h-24 justify-center'></CardHeader>
                    <Divider />
                    <CardFooter className='h-24 justify-center'></CardFooter>
                </Card>
            </motion.div>
            <motion.div 
                className='absolute top-5 scale-95'
                initial={{ scale: 0 }}
                animate="animate"
                custom={0.95}
                variants={cardVariants}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="w-[400px]" shadow='lg'>
                    <CardHeader className='h-24 justify-center'></CardHeader>
                    <Divider />
                    <CardFooter className='h-24 justify-center'></CardFooter>
                </Card>
            </motion.div>
            <motion.div 
                initial="initial"
                animate="animate"
                custom={1}
                variants={cardVariants}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-[400px]" shadow='lg'>
                    <CardHeader className='h-24 justify-center'>Forest</CardHeader>
                    <Divider />
                    <CardFooter className='h-24 justify-center'>Лес</CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
