'use client';

import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import React, { Key } from 'react';

import { Tag } from '@/app/docs/page';

export const animals = [
    {
        label: 'Cat',
        value: 'cat',
        description: 'The second most popular pet in the world',
    },
    {
        label: 'Dog',
        value: 'dog',
        description: 'The most popular pet in the world',
    },
    {
        label: 'Elephant',
        value: 'elephant',
        description: 'The largest land animal',
    },
    { label: 'Lion', value: 'lion', description: 'The king of the jungle' },
    { label: 'Tiger', value: 'tiger', description: 'The largest cat species' },
    {
        label: 'Giraffe',
        value: 'giraffe',
        description: 'The tallest land animal',
    },
    {
        label: 'Dolphin',
        value: 'dolphin',
        description: 'A widely distributed and diverse group of aquatic mammals',
    },
    {
        label: 'Penguin',
        value: 'penguin',
        description: 'A group of aquatic flightless birds',
    },
    {
        label: 'Zebra',
        value: 'zebra',
        description: 'A several species of African equids',
    },
    {
        label: 'Shark',
        value: 'shark',
        description: 'A group of elasmobranch fish characterized by a cartilaginous skeleton',
    },
    {
        label: 'Whale',
        value: 'whale',
        description: 'Diverse group of fully aquatic placental marine mammals',
    },
    {
        label: 'Otter',
        value: 'otter',
        description: 'A carnivorous mammal in the subfamily Lutrinae',
    },
    {
        label: 'Crocodile',
        value: 'crocodile',
        description: 'A large semiaquatic reptile',
    },
];

type SearchProps = {
    tags: Tag[];
};

export const Search = ({ tags }: SearchProps) => {
    const [value, setValue] = React.useState('');
    const [selectedKey, setSelectedKey] = React.useState<Key | null>(null);

    const onSelectionChange = (id: Key | null) => {
        setSelectedKey(id);
    };

    const onInputChange = (value: string) => {
        setValue(value);
    };

    return (
        <>
            <p className="mt-1 text-small text-default-500">
                Current selected animal: {selectedKey}
            </p>
            <p className="text-small text-default-500">Current input text: {value}</p>
            <Autocomplete
                allowsCustomValue={true}
                className="max-w-xs"
                listboxProps={{
                    emptyContent: 'Create new card',
                }}
                selectorIcon={null}
                onInputChange={onInputChange}
                onSelectionChange={onSelectionChange}
            >
                {tags.map((tag) => (
                    <AutocompleteItem key={tag.tag}>{tag.tag}</AutocompleteItem>
                ))}
            </Autocomplete>
        </>
    );
};
