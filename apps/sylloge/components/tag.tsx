'use client';
import { Chip } from '@heroui/react';

import { TagColor } from '@/types/tag';

type TagProps = {
    color?: TagColor;
    children?: React.ReactNode;
    onClose?: () => void;
};

export const Tag = ({ children, onClose, color }: TagProps) => {
    return (
        <Chip className="cursor-pointer" color={color} variant="dot" onClose={onClose}>
            {children}
        </Chip>
    );
};
