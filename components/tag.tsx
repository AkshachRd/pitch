'use client';
import { Chip } from '@heroui/chip';

type TagProps = {
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
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
