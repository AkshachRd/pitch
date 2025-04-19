'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Providers as UIProviders } from '@repo/ui/providers';

import { ReactQueryClientProvider } from '@/components/react-query-client-provider';

export interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    const router = useRouter();

    return (
        <UIProviders
            themeProps={{
                attribute: 'class',
                defaultTheme: 'system',
                enableSystem: true,
                disableTransitionOnChange: true,
            }}
            heroUIProps={{
                navigate: router.push,
            }}
        >
            <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </UIProviders>
    );
}
