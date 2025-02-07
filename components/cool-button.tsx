import { FC } from 'react';

export const CoolButton: FC = () => {
    return (
        <div className="relative rounded-lg bg-white p-4 shadow-[0_0_0_1px_rgba(0,0,0,.01)]">
            <div className="animate-glow absolute top-10 left-0 right-0 w-full h-full scale-90 bg-glow-gradient bg-[length:200%_200%] blur-lg filter"></div>
            Hello
        </div>
    );
};
