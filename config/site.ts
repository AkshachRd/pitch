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
            label: 'Profile',
            href: '/profile',
        },
        {
            label: 'Dashboard',
            href: '/dashboard',
        },
        {
            label: 'Projects',
            href: '/projects',
        },
        {
            label: 'Team',
            href: '/team',
        },
        {
            label: 'Calendar',
            href: '/calendar',
        },
        {
            label: 'Settings',
            href: '/settings',
        },
        {
            label: 'Help & Feedback',
            href: '/help-feedback',
        },
        {
            label: 'Logout',
            href: '/logout',
        },
    ],
    links: {},
};
