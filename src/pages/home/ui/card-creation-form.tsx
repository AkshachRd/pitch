import { motion } from 'framer-motion';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { useRef, useState } from 'react';

import { ForwardLogo, CloseLogo } from '@/shared/ui/icons';

interface CardCreationFormProps {
    frontSide: string;
    onCancel: () => void;
    onCreate: (backSide: string) => void;
}

export const CardCreationForm = ({ frontSide, onCancel, onCreate }: CardCreationFormProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [backSide, setBackSide] = useState('');

    return (
        <motion.div
            animate={{ y: 0 }}
            className="relative"
            exit={{ y: '-100%' }}
            initial={{ y: '-100%' }}
            transition={{ type: 'tween' }}
        >
            <div className="relative">
                <motion.div
                    animate={{ x: 0, y: '-100%' }}
                    className="absolute end-full-0.5 top-0"
                    exit={{ x: '100%', y: 0 }}
                    initial={{ x: '100%', y: 0 }}
                    transition={{ type: 'tween' }}
                >
                    <Button isIconOnly radius="full" size="md" onPress={onCancel}>
                        <CloseLogo />
                    </Button>
                </motion.div>
                <Input
                    ref={inputRef}
                    placeholder="Back side"
                    radius="full"
                    value={backSide}
                    variant="bordered"
                    onValueChange={setBackSide}
                />
                <motion.div
                    animate={{ x: 0 }}
                    className="absolute start-full-0.5 top-0"
                    exit={{ x: '-100%' }}
                    initial={{ x: '-100%' }}
                    transition={{ type: 'tween', delay: 0.2 }}
                >
                    <Button isIconOnly radius="full" size="md" onPress={() => onCreate(backSide)}>
                        <ForwardLogo />
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
};
