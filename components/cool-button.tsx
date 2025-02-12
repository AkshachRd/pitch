'use client';

import { Button } from '@heroui/react';
import clsx from 'clsx';
import { FC } from 'react';

interface CoolButtonProps {
    className?: string;
}

export const CoolButton: FC<CoolButtonProps> = ({ className }: CoolButtonProps) => {
    return (
        <div className={clsx(className, 'relative inline-block')}>
            <div className="absolute inset-0 left-0 right-0 top-2 h-full w-full scale-90 animate-glow bg-glow-gradient bg-[length:200%_200%] blur-lg" />
            <Button variant="light">Helloaaaaaaaaaaaaaaaaa</Button>
        </div>
    );
};
