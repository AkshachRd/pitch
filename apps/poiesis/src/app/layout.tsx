import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import Debugger from '@/components/Debugger';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@repo/ui/navbar';
import * as React from 'react';

import './globals.css';
import '@repo/ui/styles.css';
import clsx from 'clsx';
import { fontSans } from '@repo/fonts';
import { Providers } from '@/components/Providers';

const HEAD_SCRIPTS = process.env.HEAD_SCRIPTS as string;

export const metadata: Metadata = {
    title: 'Deep Research',
    description: 'Use any LLMs (Large Language Models) for Deep Research.',
    icons: {
        icon: {
            type: 'image/svg+xml',
            url: './logo.svg',
        },
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
    minimumScale: 1.0,
    maximumScale: 1.0,
    viewportFit: 'cover',
    userScalable: false,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): React.ReactElement {
    return (
        <html lang="en" dir="auto" suppressHydrationWarning>
            <head>
                {HEAD_SCRIPTS ? <Script id="headscript">{HEAD_SCRIPTS}</Script> : null}
                <Debugger />
            </head>
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
                <Toaster richColors toastOptions={{ duration: 3000 }} />
            </body>
        </html>
    );
}
