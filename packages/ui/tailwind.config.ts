import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config';
import { heroui } from '@heroui/theme';

const config: Pick<Config, 'presets' | 'content' | 'plugins'> = {
    content: ['./src/**/*.{ts,tsx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
    presets: [sharedConfig],
    plugins: [heroui()],
};

export default config;
