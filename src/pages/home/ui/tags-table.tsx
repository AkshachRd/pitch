import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

import { TagComponent, useTagsStore } from '@/entities/tag';

export function TagsTable() {
    const { tags } = useTagsStore();

    return (
        <Table aria-label="List of tags" fullWidth={false} selectionMode="multiple">
            <TableHeader>
                <TableColumn>TAG</TableColumn>
            </TableHeader>
            <TableBody items={tags}>
                {(tag) => (
                    <TableRow key={tag.id}>
                        <TableCell>
                            <TagComponent color={tag.color}>{tag.name}</TagComponent>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
