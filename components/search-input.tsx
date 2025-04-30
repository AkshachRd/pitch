'use client';

import { Autocomplete, AutocompleteItem, MenuTriggerAction } from '@heroui/autocomplete';
import { Input } from '@heroui/input';
import React, { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFilter } from 'react-aria';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/button';
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-react-query';

import { CloseLogo, ForwardLogo } from './icons';

import { createCard as createCardInSupabase } from '@/queries/create-card';
import { useCardStore } from '@/store/store';
import { useSupabaseBrowser } from '@/utils/supabase/client';
import { useTagsQuery } from '@/hooks/use-tags-query';
import { useTagsStore } from '@/store/store';
import { Tag } from '@/types/tag';

const useFilterItems = () => {
    const { startsWith } = useFilter({ sensitivity: 'base' });

    const filter = useCallback(
        (items: Item[], selectedLabel: string) => {
            return items.filter((item) =>
                item.label.split('/').some((lablePart) => startsWith(lablePart, selectedLabel)),
            );
        },
        [startsWith],
    );

    return {
        filter,
    };
};

type Item = {
    key: string;
    type: string;
    label: string;
};

const createItem: Item = {
    type: 'create',
    label: 'Create card',
    key: 'create',
};

type FieldState = {
    selectedKey: string | number | null;
    inputValue: string;
    items: Item[];
};

export const SearchInput = () => {
    const supabase = useSupabaseBrowser();
    const { mutate } = useInsertMutation(createCardInSupabase(supabase), ['id'], null, {
        onSuccess: () => {
            router.push('/cards');
        },
    });
    const tags = useTagsQuery();
    const { selectedTags, addTag, removeTag } = useTagsStore();
    const items = tags.map<Item>((tag) => ({
        key: `tag-${tag.name}`,
        type: 'tag',
        label: tag.name,
    }));

    const [fieldState, setFieldState] = React.useState<FieldState>({
        selectedKey: '',
        inputValue: '',
        items,
    });
    const [backSide, setBackSide] = React.useState('');
    const [isCreating, setIsCreating] = React.useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isCreating) {
            inputRef.current?.focus();
        }
    }, [isCreating]);

    useEffect(() => {
        console.log('Debug info:', {
            inputValue: fieldState.inputValue,
            selectedKey: fieldState.selectedKey,
            itemsCount: fieldState.items.map((item) => item.label).length,
        });
    }, [fieldState]);

    const addCard = useCardStore((state) => state.addCard);
    const { filter } = useFilterItems();

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

    const onSelectionChange = useCallback(
        (key: string | number | null) => {
            if (key === null) {
                return;
            }

            if (key === 'create') {
                setFieldState((prevState) => ({
                    inputValue: prevState.inputValue,
                    selectedKey: key,
                    items: [],
                }));
                setIsCreating(true);

                return;
            }

            const selectedItem = fieldState.items.find((option) => option.key === key);

            if (!selectedItem) return;

            if (selectedItem.type === 'tag') {
                const tag = tags.find((t) => t.name === selectedItem.label);

                if (tag) {
                    handleTagSelection(tag);
                }
            }

            const filteredItems = filter(items, selectedItem.label);
            const newItems = filteredItems.length > 0 ? filteredItems : [createItem];

            setFieldState((prevState) => ({
                inputValue: selectedItem.label || '',
                selectedKey: key,
                items: newItems,
            }));
        },
        [fieldState.items, filter, handleTagSelection, items, tags],
    );

    const onInputChange = (value: string) => {
        if (isCreating) {
            setFieldState((prevState) => ({
                inputValue: value,
                selectedKey: prevState.selectedKey,
                items: prevState.items,
            }));

            return;
        }

        const filteredItems = filter(items, value);
        const newItems = filteredItems.length > 0 ? filteredItems : [createItem];

        setFieldState((prevState) => ({
            inputValue: value,
            selectedKey: value === '' ? null : prevState.selectedKey,
            items: newItems,
        }));
    };

    const onOpenChange = (isOpen: boolean, menuTrigger: MenuTriggerAction) => {
        if (menuTrigger === 'manual' && isOpen && !isCreating) {
            setFieldState((prevState) => ({
                inputValue: prevState.inputValue,
                selectedKey: prevState.selectedKey,
                items: items,
            }));
        }
    };

    const cancelCreatingCard = () => {
        setIsCreating(false);
        setFieldState((prevState) => ({ ...prevState, selectedKey: '' }));
    };

    const createCard = () => {
        mutate([{ front_side: fieldState.inputValue, back_side: backSide }], {
            onError: (error) => {
                console.error('Error creating card:', error);
            },
        });
    };

    return (
        <div className="flex w-96 flex-col">
            <div className="relative">
                <AnimatePresence>
                    {isCreating && (
                        <motion.div
                            animate={{ x: 0 }}
                            className="absolute end-full-0.5 top-0"
                            exit={{ x: '100%' }}
                            initial={{ x: '100%' }}
                            transition={{ type: 'tween' }}
                        >
                            <Button isIconOnly radius="full" size="md" onPress={cancelCreatingCard}>
                                <CloseLogo />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
                <Autocomplete
                    fullWidth
                    allowsCustomValue={true}
                    aria-label="Search and create cards"
                    classNames={{ selectorButton: 'hidden' }}
                    inputProps={{ classNames: { inputWrapper: 'bg-background z-10' } }}
                    inputValue={fieldState.inputValue}
                    isClearable={false}
                    items={fieldState.items}
                    placeholder={isCreating ? 'Front side' : 'Search, create, tag...'}
                    radius="full"
                    selectedKey={fieldState.selectedKey}
                    variant="bordered"
                    onInputChange={onInputChange}
                    onOpenChange={onOpenChange}
                    onSelectionChange={onSelectionChange}
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
                    <motion.div
                        animate={{ y: 0 }}
                        className="relative"
                        exit={{ y: '-100%' }}
                        initial={{ y: '-100%' }}
                        transition={{ type: 'tween' }}
                    >
                        <Input
                            ref={inputRef}
                            placeholder="Back side"
                            radius="full"
                            variant="bordered"
                            onValueChange={(value) => setBackSide(value)}
                        />

                        <motion.div
                            animate={{ x: 0 }}
                            className="absolute start-full-0.5 top-0"
                            exit={{ x: '-100%' }}
                            initial={{ x: '-100%' }}
                            transition={{ type: 'tween', delay: 0.2 }}
                        >
                            <Button isIconOnly radius="full" size="md" onPress={createCard}>
                                <ForwardLogo />
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
