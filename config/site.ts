export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: 'Pitch',
    description: 'Make beautiful websites regardless of your design experience.',
    navItems: [
        {
            label: 'home',
            href: '/',
        },
        {
            label: 'cards',
            href: '/cards',
        },
        {
            label: 'learn',
            href: '/learn',
        },
    ],
    navMenuItems: [
        {
            label: 'profile',
            href: '/profile',
        },
        {
            label: 'home',
            href: '/home',
        },
        {
            label: 'cards',
            href: '/cards',
        },
        {
            label: 'learn',
            href: '/learn',
        },
        {
            label: 'settings',
            href: '/settings',
        },
        {
            label: 'help & feedback',
            href: '/help-feedback',
        },
        {
            label: 'logout',
            href: '/logout',
        },
    ],
    links: {},
};
