'use client';

import { useRouter } from 'next/navigation';
import { Providers as UIProviders } from '@repo/ui/providers';
import I18Provider from '@/components/Providers/I18n';

export const Providers = ({ children }: { children: React.ReactNode }) => {
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
            <I18Provider>{children}</I18Provider>
        </UIProviders>
    );
};
