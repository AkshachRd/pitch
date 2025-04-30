'use client';

import type { Item } from '@/hooks/use-search';

import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-react-query';
import { useCallback, useState } from 'react';

import { CardCreationForm } from './card-creation-form';

import { useSupabaseBrowser } from '@/utils/supabase/client';
import { useTagsQuery } from '@/hooks/use-tags-query';
import { useTagsStore } from '@/store/store';
import { useSearch } from '@/hooks/use-search';
import { createCard as createCardInSupabase } from '@/queries/create-card';
import { Tag } from '@/types/tag';

export const SearchInput = () => {
    const supabase = useSupabaseBrowser();
    const router = useRouter();
    const { mutate } = useInsertMutation(createCardInSupabase(supabase), ['id'], null, {
        onSuccess: () => {
            router.push('/cards');
        },
    });

    const tags = useTagsQuery();
    const { selectedTags, addTag, removeTag } = useTagsStore();
    const [isCreating, setIsCreating] = useState(false);
    const [items, setItems] = useState<Item[]>([]);

    const { fieldState, availableItems, onInputChange, onSelectionChange } = useSearch(
        tags,
        selectedTags,
    );

    const handleTagSelection = useCallback(
        (tag: Tag) => {
            if (selectedTags.some((t) => t.id === tag.id)) {
                removeTag(tag);
            } else {
                addTag(tag);
            }
        },
        [selectedTags, addTag, removeTag],
    );

    const handleSelectionChange = useCallback(
        (key: string | number | null) => {
            const { shouldCreate, items: newItems } = onSelectionChange(key);

            setItems(newItems);

            if (shouldCreate) {
                setIsCreating(true);
            } else if (key !== null) {
                const selectedItem = availableItems.find((option) => option.key === key);

                if (selectedItem?.type === 'tag') {
                    const tag = tags.find((t) => t.name === selectedItem.label);

                    if (tag) {
                        handleTagSelection(tag);
                    }
                }
            }
        },
        [availableItems, handleTagSelection, onSelectionChange, tags],
    );

    const handleInputChange = useCallback(
        (value: string) => {
            const newItems = onInputChange(value);

            setItems(newItems);
        },
        [onInputChange],
    );

    const handleCreateCard = useCallback(
        (backSide: string) => {
            mutate([{ front_side: fieldState.inputValue, back_side: backSide }], {
                onError: (error) => {
                    console.error('Error creating card:', error);
                },
            });
        },
        [fieldState.inputValue, mutate],
    );

    return (
        <div className="flex w-96 flex-col">
            <div className="relative">
                <Autocomplete
                    fullWidth
                    allowsCustomValue={true}
                    aria-label="Search and create cards"
                    classNames={{ selectorButton: 'hidden' }}
                    inputProps={{ classNames: { inputWrapper: 'bg-background z-10' } }}
                    inputValue={fieldState.inputValue}
                    isClearable={false}
                    items={items}
                    placeholder={isCreating ? 'Front side' : 'Search, create, tag...'}
                    radius="full"
                    selectedKey={fieldState.selectedKey}
                    variant="underlined"
                    onInputChange={handleInputChange}
                    onSelectionChange={handleSelectionChange}
                >
                    {(item) => {
                        if (item.type === 'tag') {
                            return <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>;
                        } else if (item.type === 'create') {
                            return <AutocompleteItem key={item.type}>Create</AutocompleteItem>;
                        } else {
                            return (
                                <AutocompleteItem key={item.type}>Can&apos;t find</AutocompleteItem>
                            );
                        }
                    }}
                </Autocomplete>
            </div>
            <AnimatePresence>
                {isCreating && (
                    <CardCreationForm
                        frontSide={fieldState.inputValue}
                        onCancel={() => setIsCreating(false)}
                        onCreate={handleCreateCard}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
