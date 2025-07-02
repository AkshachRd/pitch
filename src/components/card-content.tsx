import { Card, CardFooter, CardHeader, Divider } from '@heroui/react';
import clsx from 'clsx';
import { FC } from 'react';
import { Spoiler } from 'spoiled';

import { fontSerif } from '@/src/config/fonts';

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
        <Card className={clsx('w-[400px] font-serif', fontSerif.variable, className)} shadow="lg">
            <CardHeader className="h-24 justify-center text-xl">{headerContent}</CardHeader>
            <Divider />
            <CardFooter className="h-24 justify-center text-xl">
                <Spoiler fps={16} hidden={!revealBack}>
                    {footerContent}
                </Spoiler>
            </CardFooter>
        </Card>
    );
};
