'use client';

import type { Item } from '../model/use-search';

import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import { nanoid } from 'nanoid';

import { useSearch } from '../model/use-search';

import { CardCreationForm } from './card-creation-form';

import { useCardStore } from '@/entities/card';

type SearchInputProps = {
    selectedTagIds: string[];
    setSelectedTagIds: (tagIds: string[] | ((prev: string[]) => string[])) => void;
};

export const SearchInput = ({ selectedTagIds, setSelectedTagIds }: SearchInputProps) => {
    const { addCard } = useCardStore();
    const [isCreating, setIsCreating] = useState(false);
    const [items, setItems] = useState<Item[]>([]);

    const { fieldState, availableItems, onInputChange, onSelectionChange } =
        useSearch(selectedTagIds);

    const handleTagSelection = useCallback(
        (tagId: string) => {
            if (selectedTagIds.includes(tagId)) {
                setSelectedTagIds((prev) => prev.filter((id) => id !== tagId));
            } else {
                setSelectedTagIds((prev) => [...prev, tagId]);
            }
        },
        [selectedTagIds, setSelectedTagIds],
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
                    handleTagSelection(selectedItem.key);
                }
            }
        },
        [availableItems, onSelectionChange, setSelectedTagIds],
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
            addCard({
                id: nanoid(),
                frontSide: fieldState.inputValue,
                backSide,
                tagIds: [],
            });
        },
        [fieldState.inputValue, addCard],
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
