import { Card, CardFooter, CardHeader, Divider } from '@heroui/react';
import { FC } from 'react';
import { Spoiler } from 'spoiled';

interface CardContentProps {
    headerContent?: string;
    footerContent?: string;
    revealBack?: boolean;
    className?: string;
}

export const CardContent: FC<CardContentProps> = ({
    headerContent,
    footerContent,
    revealBack = false,
    className,
}) => {
    return (
        <Card className={`w-[400px] ${className}`} shadow="lg">
            <CardHeader className="h-24 justify-center text-xl">{headerContent}</CardHeader>
            <Divider />
            <CardFooter className="h-24 justify-center text-xl">
                <Spoiler hidden={!revealBack}>{footerContent}</Spoiler>
            </CardFooter>
        </Card>
    );
};
