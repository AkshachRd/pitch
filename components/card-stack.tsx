import { FC } from "react";
import { AnimatedCard } from "./animated-card";

export interface CardStackProps {
    className?: string; 
}

export const CardStack: FC<CardStackProps> = () => {
    return (
        <div className="relative">
            <AnimatedCard custom={0.9} className="absolute top-10" delay={0.4} />
            <AnimatedCard custom={0.95} className="absolute top-5" delay={0.2} />
            <AnimatedCard custom={1} delay={0} headerContent="Forest" footerContent="Лес" />
        </div>
    );
}
