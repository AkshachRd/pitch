import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarItem,
    NavbarMenuItem,
} from '@heroui/navbar';
import { Link } from '@heroui/link';
import { link as linkStyles } from '@heroui/theme';
import NextLink from 'next/link';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import { SignOutButton } from './sign-out-button/sign-out-button';
export const Navbar = () => {
    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <ul className="ml-2 hidden justify-start gap-4 lg:flex">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <NextLink
                                className={clsx(
                                    linkStyles({ color: 'foreground', underline: 'always' }),
                                    'data-[active=true]:font-medium data-[active=true]:text-primary',
                                )}
                                color="foreground"
                                href={item.href}
                            >
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>

            <NavbarContent className="hidden basis-1/5 sm:flex sm:basis-full" justify="end">
                <NavbarItem className="hidden gap-2 sm:flex">
                    <ThemeSwitch />
                    <SignOutButton />
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2
                                        ? 'primary'
                                        : index === siteConfig.navMenuItems.length - 1
                                          ? 'danger'
                                          : 'foreground'
                                }
                                href="#"
                                size="lg"
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};
