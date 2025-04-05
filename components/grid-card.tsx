'use client';

import { useDisclosure, Modal } from '@heroui/react';

import { GridCardModal } from './grid-card-modal';
import { GridCardDropdown } from './grid-card-dropdown';

import { Card as CardType } from '@/types/card';

interface GridCardProps {
    card: CardType;
}

export function GridCard({ card }: GridCardProps) {
    const {
        isOpen: isDropdownOpen,
        onOpen: onDropdownOpen,
        onClose: onDropdownClose,
    } = useDisclosure();
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

    return (
        <>
            <GridCardDropdown
                card={card}
                isDropdownOpen={isDropdownOpen}
                onDropdownClose={onDropdownClose}
                onDropdownOpen={onDropdownOpen}
                onModalOpen={onModalOpen}
            />

            <Modal isOpen={isModalOpen} size="5xl" onClose={onModalClose}>
                <GridCardModal card={card} />
            </Modal>
        </>
    );
}
