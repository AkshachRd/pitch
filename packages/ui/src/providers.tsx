'use client';

import type { ThemeProviderProps } from 'next-themes';

import { ThemeProvider as NextThemesProvider } from '@repo/ui/theme-provider';
import * as React from 'react';
import { HeroUIProvider, HeroUIProviderProps } from '@heroui/system';

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
    heroUIProps?: Omit<HeroUIProviderProps, 'children'>;
}

export function Providers({ children, themeProps, heroUIProps }: ProvidersProps) {
    return (
        <HeroUIProvider {...heroUIProps}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </HeroUIProvider>
    );
}
