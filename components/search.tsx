'use client';

import { Autocomplete, AutocompleteItem, MenuTriggerAction } from '@nextui-org/autocomplete';
import React from 'react';
import { useFilter } from '@react-aria/i18n';

import { Tag } from '@/app/page';

type Item = {
    key: string;
    type: string;
    label: string;
};

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

    items.push({ type: 'create', label: 'Create card', key: 'create' });

    const [fieldState, setFieldState] = React.useState<FieldState>({
        selectedKey: '',
        inputValue: '',
        items,
    });

    const { contains } = useFilter({ sensitivity: 'base' });

    const onSelectionChange = (key: React.Key | null) => {
        if (key === null) {
            return;
        }

        setFieldState((prevState) => {
            let selectedItem = prevState.items.find((option) => option.key === key);

            const filteredItems = selectedItem
                ? items.filter((item) => contains(item.label, selectedItem.label))
                : [];
            const createItem = items.find((item) => item.type === 'create');
            const newItems =
                filteredItems.length > 0 ? filteredItems : createItem ? [createItem] : [];

            return {
                inputValue: selectedItem?.label || '',
                selectedKey: key,
                items: newItems,
            };
        });
    };

    const onInputChange = (value: string) => {
        const filteredItems = items.filter((item) => contains(item.label, value));
        const createItem = items.find((item) => item.type === 'create');
        const newItems = filteredItems.length > 0 ? filteredItems : createItem ? [createItem] : [];

        setFieldState((prevState) => ({
            inputValue: value,
            selectedKey: value === '' ? null : prevState.selectedKey,
            items: newItems,
        }));
    };

    const onOpenChange = (isOpen: boolean, menuTrigger: MenuTriggerAction) => {
        if (menuTrigger === 'manual' && isOpen) {
            setFieldState((prevState) => ({
                inputValue: prevState.inputValue,
                selectedKey: prevState.selectedKey,
                items: items,
            }));
        }
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
        </>
    );
};
