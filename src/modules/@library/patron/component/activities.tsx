import { Card, CardHeader, IconButton, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { DateLabel } from "@components/label/date.label";
import { getLibraryDueDays } from "@utils/other";
import { BookCopyStatus } from "../../component/common";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_LIBRARY } from "@common/constant";
import { ILibBookCopy, ILibTransaction } from "../../interface";
import { HttpError } from "@refinedev/core";
import { BookCopyStatusEnum, LIBRARY_BOOK_COPY_LIST, LIBRARY_TRANSACTION_URL } from "../../constant";
import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";
import { TableGrid } from "@components/table/table.body";
import { Visibility } from "@mui/icons-material";
import { useNav } from "@hooks/useNavlHook";

type ActivitiesProps = {
    patronId?: string
}
export const Activities = ({ patronId }: ActivitiesProps) => {
    const t = useTranslate(LANG_LIBRARY, "bookCopy");
    const { show } = useNav(LIBRARY_BOOK_COPY_LIST);
    const columns = useMemo<GridColDef<ILibTransaction>[]>(
        () => [
            {
                field: "accession_no",
                headerName: t("fields.accession_no"),
                sortable: true,
                width: 150,
            },
            {
                field: "copy.book.title",
                headerName: t("fields.title"),
                sortable: true,
                renderCell: ({ row }) => {
                    return row?.copy?.book?.title;
                },
            },
            {
                field: "checkout_date",
                headerName: t("fields.checkout_date"),
                sortable: true,
                width: 120,
                renderCell: function render({ row }) {
                    return <DateLabel date={row?.checkout_date} />
                }
            },
            {
                field: "due_date",
                headerName: t("fields.due_days"),
                sortable: true,
                width: 100,
                renderCell: function render({ row }) {
                    return getLibraryDueDays(row?.due_date)
                }
            },
            {
                field: "checkin_date",
                headerName: t("fields.checkin_date"),
                sortable: true,
                width: 120,
                renderCell: function render({ row }) {
                    return <DateLabel date={row?.checkin_date} />
                }
            },
            {
                field: "status",
                headerName: t("fields.status"),
                sortable: true,
                width: 100,
                renderCell: function render({ row }) {
                    return <BookCopyStatus status={row.status as unknown as BookCopyStatusEnum} />
                }
            },
            {
                field: "actions",
                headerName: t("@table.actions"),
                align: "center",
                headerAlign: "center",
                width: 100,
                renderCell: function render({ row }) {
                    return (
                        <Stack direction="row">
                            <IconButton
                                sx={{
                                    color: "text.secondary",
                                }}
                                onClick={() => show(row.copy_id)}
                            >
                                <Visibility fontSize="small" />
                            </IconButton>
                        </Stack>
                    );
                },
            },
        ],
        [t]
    );

    const { dataGridProps, setFilters } = useDataGrid<ILibBookCopy, HttpError>({
        resource: LIBRARY_TRANSACTION_URL,
        meta: {
            customQuery: {
                book: true,
                patron_id: patronId
            }
        },
        queryOptions: {
            enabled: !!patronId
        }
    });

    return <Card sx={{ p: 2, mb: 2, minHeight: 200 }}>
        <CardHeader
            title={<Typography variant="h6" sx={{ mb: 1 }}>{t('titles.bookActivity')}</Typography>}
            sx={{ p: 0 }}
        />
        <TableGrid {...dataGridProps} columns={columns} />
    </Card>
};