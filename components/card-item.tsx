'use client';

import { useDisclosure, Modal } from '@heroui/react';

import { CardItemModal } from './card-item-modal';
import { CardItemDropdown } from './card-item-dropdown';

import { Card as CardType } from '@/types/card';

interface CardItemProps {
    card: CardType;
}

export function CardItem({ card }: CardItemProps) {
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

    return (
        <>
            <CardItemDropdown card={card} onModalOpen={onModalOpen} />

            <Modal isOpen={isModalOpen} size="5xl" onClose={onModalClose}>
                <CardItemModal card={card} />
            </Modal>
        </>
    );
}
