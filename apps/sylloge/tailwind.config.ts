import type { Config } from 'tailwindcss';

import { heroui } from '@heroui/theme';
import sharedConfig from '@repo/tailwind-config';

const config: Pick<Config, 'content' | 'presets' | 'plugins'> = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    presets: [sharedConfig],
    plugins: [heroui()],
};

export default config;
