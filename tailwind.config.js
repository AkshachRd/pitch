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
            keyframes: {
                slideInFromTop: {
                    '0%': { transform: 'translateY(-50%)' },
                    '100%': { transform: 'translateY(0)' },
                },
            },
            animation: {
                slideInFromTop: 'slideInFromTop 0.5s ease',
            },
        },
    },
    darkMode: 'class',
    plugins: [nextui()],
};
