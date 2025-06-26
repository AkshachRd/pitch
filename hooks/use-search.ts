import { useCallback, useState, useMemo } from 'react';
import { useFilter } from 'react-aria';

import { Tag } from '@/models/tag';

export type Item = {
    key: string;
    type: string;
    label: string;
};

type FieldState = {
    selectedKey: string | number | null;
    inputValue: string;
};

const createItem: Item = {
    type: 'create',
    label: 'Create card',
    key: 'create',
};

export const useSearch = (tags: Tag[], selectedTags: Tag[]) => {
    const { startsWith } = useFilter({ sensitivity: 'base' });
    const [fieldState, setFieldState] = useState<FieldState>({
        selectedKey: '',
        inputValue: '',
    });

    const availableItems = useMemo(() => {
        return tags
            .filter((tag) => !selectedTags.some((t) => t.id === tag.id))
            .map<Item>((tag) => ({
                key: tag.id.toString(),
                type: 'tag',
                label: tag.name,
            }));
    }, [tags, selectedTags]);

    const filter = useCallback(
        (items: Item[], selectedLabel: string) => {
            return items.filter((item) =>
                item.label.split('/').some((labelPart) => startsWith(labelPart, selectedLabel)),
            );
        },
        [startsWith],
    );

    const onInputChange = useCallback(
        (value: string) => {
            const filteredItems = filter(availableItems, value);
            const newItems = filteredItems.length > 0 ? filteredItems : [createItem];

            setFieldState((prevState) => ({
                inputValue: value,
                selectedKey: value === '' ? null : prevState.selectedKey,
            }));

            return newItems;
        },
        [filter, availableItems],
    );

    const onSelectionChange = useCallback(
        (key: string | number | null) => {
            if (key === null) return { shouldCreate: false, items: availableItems };

            if (key === 'create') {
                setFieldState((prevState) => ({
                    inputValue: prevState.inputValue,
                    selectedKey: key,
                }));

                return { shouldCreate: true, items: [] };
            }

            const selectedItem = availableItems.find((option) => option.key === key);

            if (!selectedItem) return { shouldCreate: false, items: availableItems };

            const filteredItems = filter(availableItems, selectedItem.label);
            const newItems = filteredItems.length > 0 ? filteredItems : [createItem];

            setFieldState((prevState) => ({
                inputValue: selectedItem.label || '',
                selectedKey: key,
            }));

            return { shouldCreate: false, items: newItems };
        },
        [filter, availableItems],
    );

    return {
        fieldState,
        availableItems,
        onInputChange,
        onSelectionChange,
    };
};
