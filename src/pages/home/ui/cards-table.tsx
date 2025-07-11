import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@heroui/react';

import { useCardStore } from '@/entities/card';
import { WidenIcon } from '@/shared/ui/icons';

export function CardsTable() {
    const { cards } = useCardStore();

    return (
        <Table aria-label="List of cards">
            <TableHeader>
                <TableColumn>FRONT</TableColumn>
                <TableColumn>BACK</TableColumn>
                <TableColumn>WIDEN</TableColumn>
            </TableHeader>
            <TableBody items={cards}>
                {(card) => (
                    <TableRow key={card.id}>
                        <TableCell>{card.frontSide}</TableCell>
                        <TableCell>{card.backSide}</TableCell>
                        <TableCell>
                            <Button isIconOnly radius="full" size="md">
                                <WidenIcon />
                            </Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
