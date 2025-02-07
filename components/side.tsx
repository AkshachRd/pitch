'use client';

import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface SideProps {
    children?: ReactNode;
    color?: string;
}

export const Side: FC<SideProps> = ({ children, color }: SideProps) => {
    return (
        <div
            className={clsx('flex flex-auto items-center justify-center h-full', {
                'bg-red-300': color === 'red',
                'bg-green-300': color === 'green',
            })}
        >
            {children}
        </div>
    );
};
