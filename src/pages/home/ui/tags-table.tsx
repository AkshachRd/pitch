import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { useState } from 'react';

import { TagComponent, useTagsStore } from '@/entities/tag';

export function TagsTable() {
    const { tags } = useTagsStore();
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

    const getClassNames = () => {
        return {
            td: 'before:bg-[--tag-color] data-[selected=true]:text-[--tag-color]-600 dark:data-[selected=true]:text-[--tag-color]',
        };
    };

    const setTegColorVar = (tagId?: string) => {
        const tag = tags.find((t) => t.id === tagId);
        const tagColor = tag?.color ?? 'default';

        switch (tagColor) {
            case 'warning':
                return `[--tag-color:hsl(var(--heroui-warning)/.2)]`;
            case 'success':
                return `[--tag-color:hsl(var(--heroui-success)/.2)]`;
            case 'danger':
                return `[--tag-color:hsl(var(--heroui-danger)/.2)]`;
            case 'secondary':
                return `[--tag-color:hsl(var(--heroui-secondary)/.2)]`;
            case 'primary':
                return `[--tag-color:hsl(var(--heroui-primary)/.2)]`;
            case 'default':
            default:
                return `[--tag-color:hsl(var(--heroui-default)/.6)]`;
        }
    };

    return (
        <Table
            aria-label="List of tags"
            className={setTegColorVar()}
            classNames={getClassNames()}
            fullWidth={false}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            onSelectionChange={(keys) => setSelectedKeys(new Set(keys as Set<string>))}
        >
            <TableHeader>
                <TableColumn>TAG</TableColumn>
            </TableHeader>
            <TableBody items={tags}>
                {(tag) => (
                    <TableRow key={tag.id} className={setTegColorVar(tag.id)}>
                        <TableCell>
                            <TagComponent color={tag.color}>{tag.name}</TagComponent>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
