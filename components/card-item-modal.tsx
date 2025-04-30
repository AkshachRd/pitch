'use client';

import { ModalContent, Button, ModalBody, Divider } from '@heroui/react';

import { CardContent } from './card-content';
import { TagInput } from './tag-input';

import { Card as CardType } from '@/types/card';
import { useTagsByCardQuery } from '@/hooks/use-tags-by-card-query';
interface CardItemModalProps {
    card: CardType;
}

export function CardItemModal({ card }: CardItemModalProps) {
    const tags = useTagsByCardQuery(card.id);

    return (
        <ModalContent>
            {(onClose) => (
                <ModalBody>
                    <div className="flex h-[600px]">
                        <div className="flex flex-1 items-center justify-center">
                            <CardContent
                                footerContent={card.back_side}
                                headerContent={card.front_side}
                                revealBack={true}
                            />
                        </div>
                        <Divider orientation="vertical" />
                        <div className="flex w-80 flex-col gap-4 p-4">
                            <TagInput card={card} tags={tags} />
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            )}
        </ModalContent>
    );
}
