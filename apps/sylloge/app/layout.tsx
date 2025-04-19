import '@/styles/globals.css';
import '@repo/ui/styles.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import { Navbar } from '@repo/ui/navbar';

import { Providers } from './providers';

import { siteConfig } from '@/config/site';
import { fontSans } from '@repo/fonts';

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: '/favicon.ico',
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning lang="en">
            <head />
            <body
                className={clsx(
                    'bg-background min-h-screen font-sans antialiased',
                    fontSans.variable,
                )}
            >
                <Providers>
                    <div className="relative flex h-screen flex-col">
                        <Navbar />
                        <main className="container mx-auto max-w-7xl flex-grow px-6 pt-16">
                            {children}
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
