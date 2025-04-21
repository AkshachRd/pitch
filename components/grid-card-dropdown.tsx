import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    cn,
    useDisclosure,
} from '@heroui/react';
import { useHover } from 'react-aria';

import { CardContent } from './card-content';

import {
    AddNoteIcon,
    CopyDocumentIcon,
    EditDocumentIcon,
    DeleteDocumentIcon,
} from '@/components/icons';
import { Card as CardType } from '@/types/card';
import { debounce } from '@/lib/debounce';

interface GridCardDropdownProps {
    card: CardType;
    onModalOpen: () => void;
}

const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0';

export function GridCardDropdown({ card, onModalOpen }: GridCardDropdownProps) {
    const {
        isOpen: isDropdownOpen,
        onOpen: onDropdownOpen,
        onClose: onDropdownClose,
    } = useDisclosure();
    const { hoverProps: cardHoverProps, isHovered: isCardHovered } = useHover({
        onHoverStart: onDropdownOpen,
        onHoverEnd: debounce(onDropdownClose, 300),
    });
    const { hoverProps: menuHoverProps, isHovered: isMenuHovered } = useHover({});

    return (
        <Dropdown
            className="w-fit min-w-0"
            isOpen={isDropdownOpen || isMenuHovered || isCardHovered}
            placement="right"
        >
            <DropdownTrigger>
                <button {...cardHoverProps} onClick={onModalOpen}>
                    <CardContent
                        footerContent={card.back_side}
                        headerContent={card.front_side}
                        revealBack={isCardHovered}
                    />
                </button>
            </DropdownTrigger>
            <DropdownMenu
                {...menuHoverProps}
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
