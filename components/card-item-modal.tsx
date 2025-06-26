'use client';

import { ModalContent, Button, ModalBody, Divider } from '@heroui/react';

import { CardContent } from './card-content';
import { TagInput } from './tag-input';

import { CardWithTags } from '@/types';

interface CardItemModalProps {
    card: CardWithTags;
}

export function CardItemModal({ card }: CardItemModalProps) {
    return (
        <ModalContent>
            {(onClose) => (
                <ModalBody>
                    <div className="flex h-[600px]">
                        <div className="flex flex-1 items-center justify-center">
                            <CardContent
                                footerContent={card.backSide}
                                headerContent={card.frontSide}
                                revealBack={true}
                            />
                        </div>
                        <Divider orientation="vertical" />
                        <div className="flex w-80 flex-col gap-4 p-4">
                            <TagInput card={card} tags={card.tags} />
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
