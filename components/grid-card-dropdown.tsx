import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn } from '@heroui/react';
import { useHover } from 'react-aria';

import { CardContent } from './card-content';

import {
    AddNoteIcon,
    CopyDocumentIcon,
    EditDocumentIcon,
    DeleteDocumentIcon,
} from '@/components/icons';
import { Card as CardType } from '@/types/card';

interface GridCardDropdownProps {
    card: CardType;
    isDropdownOpen: boolean;
    onDropdownOpen: () => void;
    onDropdownClose: () => void;
    onModalOpen: () => void;
}

const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0';

export function GridCardDropdown({
    card,
    isDropdownOpen,
    onDropdownClose,
    onDropdownOpen,
    onModalOpen,
}: GridCardDropdownProps) {
    let { hoverProps, isHovered } = useHover({
        onHoverStart: onDropdownOpen,
        onHoverEnd: onDropdownClose,
    });

    return (
        <Dropdown className="w-fit min-w-0" isOpen={isDropdownOpen} placement="right">
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
                    endContent={<DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />}
                    textValue="Delete"
                />
            </DropdownMenu>
        </Dropdown>
    );
}
