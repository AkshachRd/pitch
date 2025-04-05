'use client';

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    cn,
    useDisclosure,
    Modal,
} from '@heroui/react';
import { useState } from 'react';
import { useHover } from 'react-aria';

import { GridCardModal } from './grid-card-modal';
import { CardContent } from './card-content';

import { Card as CardType } from '@/types/card';
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
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    let { hoverProps, isHovered } = useHover({
        onHoverStart: (e) => setOpen(true),
        onHoverEnd: (e) => setOpen(false),
    });

    return (
        <>
            <Dropdown className="w-fit min-w-0" isOpen={isOpen} placement="right">
                <DropdownTrigger>
                    <button {...hoverProps} onClick={onModalOpen}>
                        <CardContent
                            footerContent={card.back_side}
                            headerContent={card.front_side}
                            revealBack={isHovered}
                        />
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
                        textValue="Add Note"
                    />
                    <DropdownItem
                        key="copy"
                        className="gap-x-0"
                        endContent={<CopyDocumentIcon className={iconClasses} />}
                        textValue="Copy"
                    />
                    <DropdownItem
                        key="edit"
                        className="gap-x-0"
                        endContent={<EditDocumentIcon className={iconClasses} />}
                        textValue="Edit"
                    />
                    <DropdownItem
                        key="delete"
                        className="gap-x-0 text-danger"
                        color="danger"
                        endContent={
                            <DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />
                        }
                        textValue="Delete"
                    />
                </DropdownMenu>
            </Dropdown>

            <Modal isOpen={isModalOpen} onClose={onModalClose}>
                <GridCardModal card={card} />
            </Modal>
        </>
    );
}
