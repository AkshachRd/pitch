import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)'],
                mono: ['var(--font-mono)'],
                serif: ['var(--font-serif)'],
            },
            spacing: {
                'full-0.5': 'calc(100% + 0.5rem)',
            },
            backgroundImage: {
                'glow-gradient':
                    'linear-gradient(to left, #ff5770, #e4428d, #c42da8, #9e16c3, #6501de, #9e16c3, #c42da8, #e4428d, #ff5770)',
            },
            keyframes: {
                glow: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '100%': { backgroundPosition: '200% 50%' },
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'scale(0.85)' },
                    '100%': { opacity: '1', transform: 'scale(0.9)' },
                },
            },
            animation: {
                glow: 'glow 1.25s linear infinite,fade-in 0.3s ease-out forwards',
            },
        },
    },
    darkMode: 'class',
    plugins: [heroui()],
};
