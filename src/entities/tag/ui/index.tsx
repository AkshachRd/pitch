'use client';
import { Chip } from '@heroui/chip';

import { TagColor } from '@/entities/tag';

type TagComponentProps = {
    color?: TagColor;
    children?: React.ReactNode;
    onClose?: () => void;
};

export const TagComponent = ({ children, onClose, color }: TagComponentProps) => {
    return (
        <Chip className="cursor-pointer" color={color} variant="dot" onClose={onClose}>
            {children}
        </Chip>
    );
};
