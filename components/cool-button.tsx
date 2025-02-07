import { FC } from 'react';

export const CoolButton: FC = () => {
    return (
        <div className="relative rounded-lg bg-white p-4 shadow-[0_0_0_1px_rgba(0,0,0,.01)]">
            <div className="animate-glow absolute inset-0 -z-10 scale-90 transform bg-glow-gradient bg-[200%_200%] blur-lg filter"></div>
            Hello
        </div>
    );
};
