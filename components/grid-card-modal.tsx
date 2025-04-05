'use client';

import { ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';

import { Card as CardType } from '@/types/card';

interface GridCardModalProps {
    card: CardType;
}

export function GridCardModal({ card }: GridCardModalProps) {
    return (
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">Card Details</ModalHeader>
                    <ModalBody>
                        <div className="space-y-4">
                            <div>
                                <h3 className="mb-2 font-semibold">Front Side</h3>
                                <p className="text-lg">{card.front_side}</p>
                            </div>
                            <div>
                                <h3 className="mb-2 font-semibold">Back Side</h3>
                                <p className="text-lg">{card.back_side}</p>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    );
}
