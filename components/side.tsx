'use client';

import { Card } from '@heroui/react';
import clsx from 'clsx';
import { FC } from 'react';

interface SideProps {
    disableAnimation?: boolean;
    color?: string;
    className?: string;
}

export const Side: FC<SideProps> = ({ color, className, disableAnimation = false }: SideProps) => {
    const isAnimating = !disableAnimation;

    return (
        <div
            className={clsx(className, 'relative m-6 inline-block h-full flex-auto', {
                'hover:animate-pulse': isAnimating,
            })}
        >
            <div
                className={clsx(
                    'scale-120 absolute inset-0 left-0 right-0 top-0 h-full w-full bg-[length:200%_200%] blur-lg',
                    isAnimating && {
                        'bg-red-600': color === 'red',
                        'bg-green-600': color === 'green',
                    },
                )}
            />

            <Card isPressable className="h-full w-full" />
        </div>
    );
};
