'use client';

import {
    Card,
    CardBody,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    cn,
} from '@heroui/react';
import { Card as CardType } from '@/types/card';
import { useState } from 'react';
import { useHover } from 'react-aria';
import {
    AddNoteIcon,
    CopyDocumentIcon,
    EditDocumentIcon,
    DeleteDocumentIcon,
} from '@/components/icons';

interface GridCardProps {
    card: CardType;
}

const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0';

export function GridCard({ card }: GridCardProps) {
    const [isOpen, setOpen] = useState(false);
    let { hoverProps, isHovered } = useHover({
        onHoverStart: (e) => setOpen(true),
        onHoverEnd: (e) => setOpen(false),
    });

    return (
        <Dropdown isOpen={isOpen} placement="right" className="w-fit min-w-0">
            <DropdownTrigger>
                <button {...hoverProps}>
                    <Card isHoverable={false} className="w-[400px]" shadow="lg">
                        <CardBody className="h-24 justify-center text-xl">
                            {card.front_side}
                        </CardBody>
                    </Card>
                </button>
            </DropdownTrigger>
            <DropdownMenu
                {...hoverProps}
                aria-label="Dropdown menu with description"
                variant="faded"
            >
                <DropdownItem
                    key="new"
                    className="gap-x-0"
                    endContent={<AddNoteIcon className={iconClasses} />}
                ></DropdownItem>
                <DropdownItem
                    key="copy"
                    className="gap-x-0"
                    endContent={<CopyDocumentIcon className={iconClasses} />}
                ></DropdownItem>
                <DropdownItem
                    key="edit"
                    className="gap-x-0"
                    endContent={<EditDocumentIcon className={iconClasses} />}
                ></DropdownItem>
                <DropdownItem
                    key="delete"
                    className="gap-x-0 text-danger"
                    color="danger"
                    endContent={<DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />}
                ></DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
