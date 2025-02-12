'use client';

import { Button } from '@heroui/react';
import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface SideProps {
    children?: ReactNode;
    color: 'danger' | 'success';
    className?: string;
    isActive?: boolean;
}

export const Side: FC<SideProps> = ({ color, className, isActive = false, children }: SideProps) => {
    return (
        <div
            className={clsx(className, 'relative m-6 inline-block h-full flex-auto', {
                'animate-pulse': isActive,
            })}
        >
            <div
                className={clsx(
                    'scale-120 absolute inset-0 left-0 right-0 top-0 h-full w-full bg-[length:200%_200%] blur-lg',
                    isActive && `bg-${color}`,
                )}
            />
            <Button
                className={clsx('h-full w-full bg-background', `data-[hover=true]:!bg-${color}/20`)}
                variant="light"
            >
                {children}
            </Button>
            {/* <Card isPressable className="h-full w-full" /> */}
        </div>
    );
};
