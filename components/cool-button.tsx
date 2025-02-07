import { FC, ReactNode } from 'react';

interface CoolButtonProps {
    children?: ReactNode;
}

export const CoolButton: FC<CoolButtonProps> = ({ children }: CoolButtonProps) => {
    return (
        <div className="relative inline-block">
            <div className="absolute inset-0 left-0 right-0 top-2 h-full w-full scale-90 animate-glow bg-glow-gradient bg-[length:200%_200%] blur-lg"></div>
            {children}
        </div>
    );
};
