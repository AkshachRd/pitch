'use client';

import { Button } from '@heroui/react';
import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface SideProps {
    children?: ReactNode;
    color?: string;
    className?: string;
    isActive?: boolean;
}

export const Side: FC<SideProps> = ({ color, className, isActive, children }: SideProps) => {
    return (
        <div
            className={clsx(className, 'relative m-6 inline-block h-full flex-auto', {
                'animate-pulse': isActive,
            })}
        >
            <div
                className={clsx(
                    'scale-120 absolute inset-0 left-0 right-0 top-0 h-full w-full bg-[length:200%_200%] blur-lg',
                    isActive && {
                        'bg-danger': color === 'red',
                        'bg-success': color === 'green',
                    },
                )}
            />
            <Button
                className={clsx('h-full w-full', {
                    'data-[hover=true]:!bg-danger/20': color === 'red',
                    'data-[hover=true]:!bg-success/20': color === 'green',
                })}
                variant="light"
            >
                {children}
            </Button>
            {/* <Card isPressable className="h-full w-full" /> */}
        </div>
    );
};
