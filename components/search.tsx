'use client';

import { Autocomplete, AutocompleteItem, MenuTriggerAction } from '@nextui-org/autocomplete';
import { Input } from '@nextui-org/input';
import React, { useCallback } from 'react';
import { useFilter } from '@react-aria/i18n';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';

import { ForwardLogo } from './icons';

import { Tag } from '@/app/page';
import { useCardStore } from '@/store/store';

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

const createItem: Item = { type: 'create', label: 'Create card', key: 'create' };

type FieldState = {
    selectedKey: React.Key | null;
    inputValue: string;
    items: Item[];
};

type SearchProps = {
    tags: Tag[];
};

export const Search = ({ tags }: SearchProps) => {
    const items = tags.map<Item>((tag) => ({ key: `tag-${tag.tag}`, type: 'tag', label: tag.tag }));

    const [fieldState, setFieldState] = React.useState<FieldState>({
        selectedKey: '',
        inputValue: '',
        items,
    });
    const [backSide, setBackSide] = React.useState('');
    const [isCreating, setIsCreating] = React.useState(false);
    const router = useRouter();

    const addCard = useCardStore((state) => state.addCard);
    const { filter } = useFilterItems();

    const onSelectionChange = (key: React.Key | null) => {
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

        setFieldState((prevState) => {
            let selectedItem = prevState.items.find((option) => option.key === key);

            const filteredItems = selectedItem ? filter(items, selectedItem.label) : [];
            const newItems = filteredItems.length > 0 ? filteredItems : [createItem];

            return {
                inputValue: selectedItem?.label || '',
                selectedKey: key,
                items: newItems,
            };
        });
    };

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

    const cancelCreating = () => {
        setIsCreating(false);
        setFieldState((prevState) => ({ ...prevState, selectedKey: '' }));
    };

    const handleCreateCard = () => {
        addCard({ id: '1', frontSide: fieldState.inputValue, backSide });
        router.push('/cards');
    };

    return (
        <>
            <div>
                <p>input value: {fieldState.inputValue}</p>
                <p>selected key: {fieldState.selectedKey}</p>
                <p>items: {fieldState.items.map((item) => item.label).length}</p>
            </div>
            <Autocomplete
                allowsCustomValue={true}
                className="max-w-xs"
                inputValue={fieldState.inputValue}
                items={fieldState.items}
                placeholder={isCreating ? 'Front side' : 'Search, create, tag...'}
                selectedKey={fieldState.selectedKey}
                selectorIcon={null}
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
                        return <AutocompleteItem key={item.type}>Can&apos;t find</AutocompleteItem>;
                    }
                }}
            </Autocomplete>
            {isCreating && (
                <Input
                    endContent={
                        <Button isIconOnly radius="full" size="sm" onClick={handleCreateCard}>
                            <ForwardLogo />
                        </Button>
                    }
                    placeholder="Back side"
                    variant="bordered"
                    onValueChange={(value) => setBackSide(value)}
                />
            )}
            {isCreating && <Button onClick={cancelCreating}>Cancel</Button>}
        </>
    );
};
