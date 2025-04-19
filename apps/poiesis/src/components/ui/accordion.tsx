'use client';

import * as React from 'react';
import { Accordion as HeroAccordion, AccordionItem as HeroAccordionItem } from '@heroui/react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/utils/style';

// We're not using forwardRef here since it's causing type issues with HeroUI
const Accordion = ({ className, ...props }: React.ComponentProps<typeof HeroAccordion>) => (
    <HeroAccordion className={cn('w-full', className)} {...props} />
);
Accordion.displayName = 'Accordion';

// We're not using forwardRef here since it's causing type issues with HeroUI
const AccordionItem = ({
    className,
    children,
    ...props
}: React.ComponentProps<typeof HeroAccordionItem>) => (
    <HeroAccordionItem
        classNames={{
            base: cn('border-b', className),
            trigger:
                'flex flex-1 items-center justify-between py-4 text-left text-sm font-medium transition-all hover:underline',
            indicator: 'text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200',
            content: 'overflow-hidden text-sm',
        }}
        indicator={<ChevronDown />}
        {...props}
    >
        {children}
    </HeroAccordionItem>
);
AccordionItem.displayName = 'AccordionItem';

// Kept for backward compatibility
const AccordionTrigger = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={cn(
            'flex flex-1 items-center justify-between py-4 text-sm font-medium',
            className,
        )}
    >
        {children}
    </div>
);

// Kept for backward compatibility
const AccordionContent = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => <div className={cn('pb-4 pt-0 text-sm', className)}>{children}</div>;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
