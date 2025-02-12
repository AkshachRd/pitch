'use client';

import { Button } from '@heroui/react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { FC } from 'react';
import { PressEvent } from 'react-aria';

interface ShowAnswerButtonProps {
    onPress?: (e: PressEvent) => void
}

export const ShowAnswerButton: FC<ShowAnswerButtonProps> = ({onPress}) => {
    const { theme } = useTheme();

    return (
        <Button
            onPress={onPress}
            disableRipple
            className={clsx(
                'border-background text-background data-[hover=true]:bg-background data-[hover=true]:text-foreground',
                {
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
