import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import ThemeProvider from '@/components/Provider/Theme';
import I18Provider from '@/components/Provider/I18n';
import Debugger from '@/components/Debugger';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@repo/ui/navbar';
import * as React from 'react';

import './globals.css';
import '@repo/ui/styles.css';
import clsx from 'clsx';
import { fontSans } from '@repo/fonts';

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
}>): JSX.Element {
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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <I18Provider>
                        <div className="relative flex h-screen flex-col">
                            <Navbar />
                            <main className="container mx-auto max-w-7xl flex-grow px-6 pt-16">
                                {children}
                            </main>
                        </div>
                    </I18Provider>
                </ThemeProvider>
                <Toaster richColors toastOptions={{ duration: 3000 }} />
            </body>
        </html>
    );
}
