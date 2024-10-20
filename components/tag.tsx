'use client';
import { Chip } from '@nextui-org/chip';

type TagProps = {
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    children?: React.ReactNode;
    onClose?: () => void;
};
export const Tag = ({ children, onClose, color }: TagProps) => {
    return (
        <Chip color={color} variant="dot" onClose={onClose}>
            {children}
        </Chip>
    );
};
