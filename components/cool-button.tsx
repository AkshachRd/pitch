import { FC } from 'react';

export const CoolButton: FC = () => {
    return (
        <div className="relative rounded-lg p-4 ">
            <div className="absolute inset-0 left-0 right-0 top-4 h-full w-full scale-90 animate-glow bg-glow-gradient bg-[length:200%_200%] blur-lg"></div>
            <div className="relative rounded-lg bg-white p-4 shadow-[0_0_0_1px_rgba(0,0,0,.01)]">Hello</div>
        </div>
    );
};
