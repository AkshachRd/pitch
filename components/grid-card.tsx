'use client';

import {
    Card,
    CardBody,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    cn,
    useDisclosure,
} from '@heroui/react';
import { useState } from 'react';
import { useHover } from 'react-aria';

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
                        <Card className="w-[400px]" isHoverable={false} shadow="lg">
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
                    />
                    <DropdownItem
                        key="copy"
                        className="gap-x-0"
                        endContent={<CopyDocumentIcon className={iconClasses} />}
                    />
                    <DropdownItem
                        key="edit"
                        className="gap-x-0"
                        endContent={<EditDocumentIcon className={iconClasses} />}
                    />
                    <DropdownItem
                        key="delete"
                        className="gap-x-0 text-danger"
                        color="danger"
                        endContent={
                            <DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />
                        }
                    />
                </DropdownMenu>
            </Dropdown>

            <Modal isOpen={isModalOpen} onClose={onModalClose}>
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
            </Modal>
        </>
    );
}
