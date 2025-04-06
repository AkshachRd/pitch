'use client';

import { useDisclosure, Modal } from '@heroui/react';

import { GridCardModal } from './grid-card-modal';
import { GridCardDropdown } from './grid-card-dropdown';

import { Card as CardType } from '@/types/card';

interface GridCardProps {
    card: CardType;
}

export function GridCard({ card }: GridCardProps) {
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

    return (
        <>
            <GridCardDropdown card={card} onModalOpen={onModalOpen} />

            <Modal isOpen={isModalOpen} size="5xl" onClose={onModalClose}>
                <GridCardModal card={card} />
            </Modal>
        </>
    );
}
