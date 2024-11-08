import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)'],
                mono: ['var(--font-mono)'],
            },
            spacing: {
                'full-0.5': 'calc(100% + 0.5rem)',
            },
        },
    },
    darkMode: 'class',
    plugins: [nextui()],
};
