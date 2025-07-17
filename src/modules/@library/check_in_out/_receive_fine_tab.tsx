import { useState, useMemo } from "react";
import { useAutocomplete, useDataGrid } from "@refinedev/mui";
import {
    TextField,
    Grid2 as Grid,
    Typography,
    Paper,
    Autocomplete,
    Card,
    Stack,
    Avatar,
    IconButton,
} from "@mui/material";
import { ILibFine, ILibPatron } from "../interface";
import { FineStatusEnum, LIBRARY_FINE_URL, LIBRARY_PATRON_URL } from "../constant";
import { HttpError, useInvalidate, useUpdate } from "@refinedev/core";
import { DateLabel } from "@components/label/date.label";
import { GridColDef } from "@mui/x-data-grid";
import { FineStatus } from "../component/common";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_LIBRARY } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { PatronDetail } from "../patron/component/patrindetail";
import { TbCancel } from "react-icons/tb";
import { useConfirm } from "@hooks/confirm.hook";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import { FaRegCheckCircle } from "react-icons/fa";



export const ReceiveFineTab = () => {
    const t = useTranslate(LANG_LIBRARY, "fine");
    const pt = useTranslate(LANG_LIBRARY, "patron");
    const { mutate } = useUpdate<ILibFine>({
        resource: LIBRARY_FINE_URL
    });
    const invalidate = useInvalidate()
    const [confirm, confirmEle] = useConfirm({
        onConfirm: ({ id }) => {
            mutate({
                resource: LIBRARY_FINE_URL,
                id: id,
                values: {
                    status: FineStatusEnum.Discard,
                    id: id,
                },
            }, {
                onSuccess: () => {
                    setTimeout(() => {
                        invalidate({
                            resource: LIBRARY_PATRON_URL,
                            invalidates: ['all']
                        })
                    }, 2000)
                }
            });
        },
        confirmTitle: t("info.discard"),
    });

    const [confirmReceive, confirmReceiveEle] = useConfirm({
        onConfirm: ({ id }) => {
            mutate({
                resource: LIBRARY_FINE_URL,
                id: id,
                values: {
                    status: FineStatusEnum.Paid,
                    id: id,
                },
            }, {
                onSuccess: () => {
                    setTimeout(() => {
                        invalidate({
                            resource: LIBRARY_PATRON_URL,
                            invalidates: ['all']
                        })
                    }, 2000)
                }
            });
        },
        confirmTitle: t("info.paid"),
    });
    const [selectedPatron, setSelectedPatron] = useState<ILibPatron | null>(null);
    const { autocompleteProps: patronAutocompleteProps } = useAutocomplete<
        ILibPatron,
        HttpError
    >({
        resource: LIBRARY_PATRON_URL,
        meta: {
            customQuery: { patronType: true }
        },
        onSearch: (value) => [
            {
                field: "patron_no",
                operator: "eq",
                value
            },
            {
                field: "name",
                operator: "eq",
                value
            }
        ],
    });

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
                width: 120,
            },
            {
                field: "status",
                headerName: t("fields.status"),
                sortable: true,
                width: 100,
                renderCell: function render({ row }) {
                    return <FineStatus status={row.status} />
                }
            },
            {
                field: "actions",
                headerName: t("@table.actions"),
                align: "center",
                headerAlign: "center",
                width: 100,
                renderCell: function render({ row }) {
                    if (row.status === FineStatusEnum.Pending) {
                        return <Stack direction={"row"}>
                            <IconButton
                                onClick={() => confirm(row)}
                            >
                                <TbCancel color="red" size={20} />
                            </IconButton>
                            <IconButton
                                onClick={() => confirmReceive(row)}
                            >
                                <FaRegCheckCircle color="green" size={20} />
                            </IconButton>
                        </Stack>
                    }
                    return
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
                patron_id: selectedPatron?.id,
                transaction: true
            }
        },
        queryOptions: {
            enabled: !!selectedPatron
        }
    });
    const fineAmount = dataGridProps.rows.filter((row) => row.status === FineStatusEnum.Pending).reduce((total, row) => total + row.fine_amount, 0)
    return (
        <>
            <Grid container justifyContent={"center"} marginBottom={5}>
                <Grid size={6}>
                    <Autocomplete
                        {...patronAutocompleteProps}
                        value={selectedPatron} // Ensure the value resets after selection
                        onChange={(event, newValue: any) => {
                            if (newValue) {
                                setSelectedPatron(newValue); // Add selected item
                            } else {
                                setSelectedPatron(null);
                            }
                        }}
                        getOptionLabel={(option: any) => (`${option.patron_no} | ${option.name}`)}
                        renderOption={(props, option) => (
                            <li {...props} key={option.id}>
                                {`${option.patron_no} | ${option.name}`}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size={"small"}
                                variant={"outlined"}
                                label={pt("patron")}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            {/* Patron Details and Fines Section */}
            {selectedPatron && (
                <>
                    <Grid container spacing={3} mt={0.5}>
                        <Grid size={3}>
                            <Stack>
                                <Card sx={{ p: 2, mb: 2 }}>
                                    <Stack direction={"row"} gap={2}>
                                        <Paper elevation={1}>
                                            <Avatar variant="square" src={selectedPatron?.image?.url} sx={{ width: 100, height: 100 }} />
                                        </Paper>
                                        <Stack gap={0.5}>
                                            <Typography variant="subtitle2">{selectedPatron?.name}</Typography>
                                            <Typography variant="body1">{t("fields.total_fine")} : <TbCurrencyRupeeNepalese />{' '}{fineAmount}</Typography>
                                        </Stack>
                                    </Stack>
                                </Card>
                                <PatronDetail patron={selectedPatron} />
                            </Stack>
                        </Grid>
                        <Grid size={9}>
                            <TableGrid {...dataGridProps} columns={columns} />
                        </Grid>
                    </Grid>
                    {confirmEle}
                    {confirmReceiveEle}
                </>
            )}
        </>
    );
};
