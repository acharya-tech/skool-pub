import { Card, CardHeader } from "@mui/material";
import { Typography } from "@mui/material";
import { DateLabel } from "@components/label/date.label";
import { getLibraryDueDays } from "@utils/other";
import { FineStatus } from "../../component/common";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_LIBRARY } from "@common/constant";
import { ILibFine } from "../../interface";
import { HttpError } from "@refinedev/core";
import { LIBRARY_BOOK_COPY_LIST, LIBRARY_FINE_URL } from "../../constant";
import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";

type FinesProps = {
    patronId?: string
}
export const Fines = ({ patronId }: FinesProps) => {
    const t = useTranslate(LANG_LIBRARY, "fine");
    const columns = useMemo<GridColDef<ILibFine>[]>(
        () => [
            {
                field: "accession_no",
                headerName: t("fields.accession_no"),
                sortable: true,
                width: 150,
            },
            {
                field: "book.title",
                headerName: t("fields.book_name"),
                sortable: true,
                renderCell: ({ row }) => {
                    return row?.copy?.book?.title;
                },
            },
            {
                field: "transaction.checkout_date",
                headerName: t("fields.checkout_date"),
                sortable: true,
                width: 120,
                renderCell: function render({ row }) {
                    return <DateLabel date={row?.transaction?.checkout_date} />
                }
            },
            {
                field: "fine_days",
                headerName: t("fields.fine_days"),
                sortable: true,
                width: 100,
            },
            {
                field: "transaction.checkin_date",
                headerName: t("fields.checkin_date"),
                sortable: true,
                width: 120,
                renderCell: function render({ row }) {
                    return <DateLabel date={row?.transaction?.checkin_date} />
                }
            },
            {
                field: "fine_amount",
                headerName: t("fields.fine_amount"),
                sortable: true,
            },
            {
                field: "status",
                headerName: t("fields.status"),
                sortable: true,
                width: 100,
                renderCell: function render({ row }) {
                    return <FineStatus status={row.status} />
                }
            }
        ],
        [t]
    );

    const { dataGridProps, setFilters } = useDataGrid<ILibFine, HttpError>({
        resource: LIBRARY_FINE_URL,
        meta: {
            customQuery: {
                book: true,
                patron_id: patronId,
                transaction: true
            }
        },
        queryOptions: {
            enabled: !!patronId
        }
    });

    return <Card sx={{ p: 2, mb: 2, minHeight: 200 }}>
        <CardHeader
            title={<Typography variant="h6" sx={{ mb: 1 }}>{t('titles.list')}</Typography>}
            sx={{ p: 0 }}
        />
        <TableGrid {...dataGridProps} columns={columns} />
    </Card>
};