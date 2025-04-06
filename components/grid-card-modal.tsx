'use client';

import { ModalContent, Button, ModalBody, Divider } from '@heroui/react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { CardContent } from './card-content';
import { TagInput } from './tag-input';

import { Card as CardType } from '@/types/card';
import { toTag } from '@/types/tag';
import { getTagsForCard } from '@/queries/get-tags';
import { useSupabaseBrowser } from '@/utils/supabase/client';

interface GridCardModalProps {
    card: CardType;
}

export function GridCardModal({ card }: GridCardModalProps) {
    const supabase = useSupabaseBrowser();
    const { data: rawTags = [] } = useQuery(getTagsForCard(supabase, card.id));
    const tags = rawTags?.map((row) => toTag(row.tag)) ?? [];

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
