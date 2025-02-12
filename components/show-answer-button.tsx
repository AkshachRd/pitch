'use client';

import { Button, CircularProgress } from '@heroui/react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { FC, useEffect, useRef, useState } from 'react';
import { PressEvent } from 'react-aria';

interface ShowAnswerButtonProps {
    onPress?: (e: PressEvent) => void;
    onCountDown?: () => void;
    disabled?: boolean;
}

export const ShowAnswerButton: FC<ShowAnswerButtonProps> = ({ onPress, disabled, onCountDown }) => {
    const [mounted, setMounted] = useState(false);
    const [value, setValue] = useState(100);
    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        clearInterval(intervalRef.current);

        if (disabled) {
            const interval = setInterval(() => {
                setValue((v) => {
                    if (v <= -10) {
                        return 100;
                    } else {
                        return v - 10;
                    }
                });
            }, 500);
            intervalRef.current = interval;
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [disabled]);

    useEffect(() => {
        if (value <= -10) {
            clearInterval(intervalRef.current);
            onCountDown?.();
        }
    }, [value])

    return (
        <Button
            isLoading={disabled}
            spinner={<CircularProgress strokeWidth={4} color='default' aria-label="Loading..." size="sm" value={value} />}
            disabled={disabled}
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
