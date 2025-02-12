'use client';

import { Button } from '@heroui/react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';
import { PressEvent } from 'react-aria';

interface ShowAnswerButtonProps {
    onPress?: (e: PressEvent) => void;
}

export const ShowAnswerButton: FC<ShowAnswerButtonProps> = ({ onPress }) => {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Button
            onPress={onPress}
            disableRipple
            className={clsx(
                'border-background text-background data-[hover=true]:bg-background data-[hover=true]:text-foreground',
                mounted && {
                    light: theme === 'dark',
                    dark: theme === 'light',
                },
            )}
            variant="bordered"
        >
            Show answer
        </Button>
    );
};
