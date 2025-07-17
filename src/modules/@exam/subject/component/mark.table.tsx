import { LANG_EXAM } from '@common/constant';
import { ExmMarkPostStatusEnum } from '@exam/constant/enum';
import { IExmSubject, MarkListItem } from '@exam/interface';
import { useTranslate } from '@hooks/useTranslate';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState, useMemo } from 'react';
import { MarkEditableRow, MarkStaticRow } from './mark.table.row';
import { useMarkStore } from '../utils/mark.store';

type MarksTableProps = {
    esubject: IExmSubject
    marks: MarkListItem[]
}
export const MarksTable = ({ esubject, marks }: MarksTableProps) => {
    const t = useTranslate(LANG_EXAM, "marks");
    const [orderBy, setOrderBy] = useState('student_name');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const search = useMarkStore(state => state.search)
    const isFullscreen = useMarkStore(state => state.fullScreen)
    const inputColumn = useMarkStore(state => state.inputColumn)
    const handleSort = (property: string) => () => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const filteredData = useMemo(() => {
        return marks
            .filter((student) => {
                return Object.values(student).some((val) =>
                    String(val).toLowerCase().includes(search.toLowerCase())
                );
            })
            .sort((a, b) => {
                // @ts-ignore
                const valA = a[orderBy] ?? '';
                // @ts-ignore
                const valB = b[orderBy] ?? '';
                return (valA < valB ? -1 : 1) * (order === 'asc' ? 1 : -1);
            });
    }, [marks, search, order, orderBy]);

    const markKeys = useMemo(() => {
        return Object.keys(inputColumn) ?? [];
    }, [inputColumn]);

    const markColumns = useMemo(() => {
        const colList = markKeys.map((key) => {
            const [markName] = key.split("_");
            return {
                field: key,
                headerName: t("fields." + markName + (isFullscreen ? "_min" : "")),
                sortable: true,
            };
        });

        colList.push({
            field: "is_absent",
            headerName: t("fields.absent" + (isFullscreen ? "_min" : "")),
            sortable: true,
        })

        return colList
    }, [markKeys]);

    const columns: GridColDef<MarkListItem>[] = useMemo(() => {
        if (isFullscreen) {
            return [
                { field: "student_name", headerName: t("fields.student_name"), sortable: true },
                ...markColumns
            ]
        }
        return [
            { field: "student_regid", headerName: t("fields.regid"), sortable: true },
            { field: "student_name", headerName: t("fields.student_name"), sortable: true },
            { field: "section", headerName: t("fields.section"), sortable: true },
            ...markColumns,
            {
                field: "remark",
                headerName: t("fields.remark"),
                sortable: true,
                // width: 70
            },
        ]
    }, [t, isFullscreen, markColumns]);
    return (
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell width={col.width} key={col.field} sortDirection={orderBy === col.field ? order : false}>
                                {col.sortable ? (
                                    <TableSortLabel
                                        active={orderBy === col.field}
                                        direction={orderBy === col.field ? order : 'asc'}
                                        onClick={handleSort(col.field)}
                                    >
                                        {col.headerName}
                                    </TableSortLabel>
                                ) : (
                                    <Typography>{col.headerName}</Typography>
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map((mark) => {
                        if (esubject.post_status === ExmMarkPostStatusEnum.Completed) {
                            return <MarkStaticRow
                                columns={columns}
                                inputColumn={inputColumn}
                                key={mark.id}
                                mark={mark}
                            />
                        }
                        return <MarkEditableRow
                            columns={columns}
                            inputColumn={inputColumn}
                            key={mark.id}
                            mark={mark}
                        />
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
