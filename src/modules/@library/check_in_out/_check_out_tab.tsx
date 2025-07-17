import { useState } from "react";
import { useTranslate } from "@hooks/useTranslate";
import { useAutocomplete } from "@refinedev/mui";
import {
    Autocomplete,
    TextField,
    Box,
    Grid2 as Grid,
    Typography,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableRow,
    Paper,
    TableBody,
    Divider,
} from "@mui/material";
import { FaTrash } from "react-icons/fa6";
import { ILibBookCopy, ILibPatron } from "../interface";
import { LANG_LIBRARY } from "@common/constant";
import { NEW_BOOK_URL, LIBRARY_PATRON_URL, BookCopyStatusEnum, LIBRARY_BOOK_COPY_LIST, LIBRARY_TRANSACTION_CHECKOUT_URL } from "../constant";
import { HttpError, useList } from "@refinedev/core";
import { BookCopyStatus } from "../component/common";
import { Card } from "@mui/material";
import { Stack } from "@mui/material";
import { Avatar } from "@mui/material";
import { LabelData } from "@components/other/label.data";
import { DateLabel } from "@components/label/date.label";
import { getLibraryDueDays } from "@utils/other";
import LoadingWrapper from "@components/other/loading";
import { useRefineForm } from "@hooks/useForm";

export const CheckOutTab = () => {
    const t = useTranslate(LANG_LIBRARY, "bookCopy");
    const pt = useTranslate(LANG_LIBRARY, "patron");

    // State for book and patron search inputs and selections
    const [selectedPatron, setSelectedPatron] = useState<ILibPatron | null>(null);
    const [selectedBooks, setSelectedBooks] = useState<ILibBookCopy[]>([]);

    const { autocompleteProps: bookAutocompleteProps, query: { refetch: bookListRefetch } } = useAutocomplete<
        ILibBookCopy,
        HttpError
    >({
        resource: NEW_BOOK_URL,
        meta: {
            customQuery: { book: true, status: [BookCopyStatusEnum.Available, BookCopyStatusEnum.Checkout] }
        },
        onSearch: (value) => [
            { field: "accession_no", operator: "eq", value },
            { field: "book_title", operator: "eq", value }
        ],
    });

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

    const handleAddBook = (book: ILibBookCopy) => {
        if (!selectedBooks.find((b) => b.accession_no === book.accession_no)) {
            setSelectedBooks((prevBooks) => [...prevBooks, book]);
        }
    };

    const handleRemoveBook = (accession_no: string) => {
        setSelectedBooks((prevBooks) =>
            prevBooks.filter((book) => book.accession_no !== accession_no)
        );
    };

    const {
        refineCore: { onFinish },
    } = useRefineForm({
        refineCoreProps: {
            resource: LIBRARY_TRANSACTION_CHECKOUT_URL,
            redirect: false,
            action: "create",
            onMutationSuccess: () => {
                checkoutRefetch()
                setSelectedBooks([])
                bookListRefetch()
            }
        },
    });

    const handleSubmitData = () => {
        const payload = {
            books: selectedBooks,
            patron: selectedPatron,
        };
        onFinish(payload);
    };

    const { data: checkoutBooks, refetch: checkoutRefetch } = useList<ILibBookCopy, HttpError>({
        resource: LIBRARY_BOOK_COPY_LIST,
        meta: {
            customQuery: {
                book: true,
                taken_by: selectedPatron?.id
            }
        },
        queryOptions: {
            enabled: !!selectedPatron
        }
    })

    return (
        <>
            <Grid container spacing={2}>
                {/* Book Search Section */}
                <Grid size={6}>
                    <Autocomplete
                        {...bookAutocompleteProps}
                        value={null} // Ensure the value resets after selection
                        onChange={(event, newValue: any) => {
                            if (newValue) {
                                handleAddBook(newValue); // Add selected item
                            }
                        }}
                        getOptionLabel={(option: any) => ("")}
                        renderOption={(props, option) => (
                            <li {...props} key={option.id}>
                                {`${option.accession_no} | ${option.book.title}`}
                            </li>
                        )}
                        getOptionDisabled={(option) => option.status !== BookCopyStatusEnum.Available}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size={"small"}
                                variant={"outlined"}
                                label={t("labels.accession_no")}
                            />
                        )}
                    />

                    {/* Selected Book Details */}

                    <Box mt={4}>
                        <Typography variant="h6">{t("titles.bookList")}</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ p: 1 }}>{t("fields.accession_no")}</TableCell>
                                        <TableCell sx={{ p: 1 }}>
                                            {t("fields.bookName")}
                                        </TableCell>
                                        <TableCell sx={{ p: 1 }}>
                                            {t("fields.classification")}
                                        </TableCell >
                                        <TableCell align="center" sx={{ p: 1 }}>{t("fields.status")}</TableCell>
                                        <TableCell align="center" sx={{ p: 1 }}>{t("fields.action")}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedBooks.map((book) => (
                                        <TableRow key={book.accession_no}>
                                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{book.accession_no}</TableCell>
                                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{book.book.title}</TableCell>
                                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>
                                                {book?.book?.classification}
                                            </TableCell>
                                            <TableCell align="center" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}><BookCopyStatus status={book?.status} /></TableCell>
                                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>
                                                <Button
                                                    color="error"
                                                    onClick={() => handleRemoveBook(book.accession_no)}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Divider sx={{ py: 3 }} />
                    <Box mt={2} sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!Boolean(selectedPatron) || selectedBooks.length == 0}
                            onClick={handleSubmitData}
                        >
                            {t("actions.checkout")}
                        </Button>
                    </Box>
                </Grid>
                {/* Patron Search Section */}
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
                                label={t("labels.patron")}
                            />
                        )}
                    />
                    {/* Patron Details */}
                    {selectedPatron && (
                        <>
                            <Grid size={12} mt={4}>
                                <Card sx={{ p: 2, mb: 2 }}>
                                    <Stack direction={"row"} gap={2}>
                                        <Paper elevation={1}>
                                            <Avatar variant="square" src={selectedPatron?.image?.url} sx={{ width: 150, height: 150 }} />
                                        </Paper>
                                        <Stack gap={0.5}>
                                            <LabelData label={pt("fields.name")} value={selectedPatron?.name} />
                                            <LabelData label={pt("fields.patron_no")} value={selectedPatron?.patron_no} />
                                            <LabelData label={pt("fields.patron_type")} value={selectedPatron?.patronType?.patron_type} />
                                            <LabelData label={pt("fields.fine_booked")} value={selectedPatron?.fine_booked} />
                                            <LabelData label={pt("fields.checkout_count")} value={`${checkoutBooks?.data?.length ?? "..."} / ${selectedPatron?.patronType?.number_of_books}`} />
                                            <LabelData label={pt("fields.valid_till")} value={<DateLabel date={selectedPatron?.valid_till} />} />
                                        </Stack>
                                    </Stack>
                                </Card>
                            </Grid>
                            <Box mt={4}>
                                <Typography variant="h6">{pt("titles.checkout")}</Typography>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ p: 1 }}>{t("fields.accession_no")}</TableCell>
                                                <TableCell sx={{ p: 1 }}>
                                                    {t("fields.bookName")}
                                                </TableCell>
                                                <TableCell align="center" sx={{ p: 1 }}>{t("fields.status")}</TableCell>
                                                <TableCell align="center" sx={{ p: 1 }}>{t("fields.checkout_date")}</TableCell>
                                                <TableCell align="center" sx={{ p: 1 }}>{t("fields.due_days")}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <LoadingWrapper value={checkoutBooks}>
                                                {checkoutBooks?.data?.map((book: ILibBookCopy) => (
                                                    <TableRow key={book.accession_no}>
                                                        <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{book.accession_no}</TableCell>
                                                        <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{book.book.title}</TableCell>
                                                        <TableCell align="center" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}><BookCopyStatus status={book?.status} /></TableCell>
                                                        <TableCell align="center" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}><DateLabel date={book?.taken_date} /></TableCell>
                                                        <TableCell align="center" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{getLibraryDueDays(book?.due_date)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </LoadingWrapper>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </>
                    )}
                </Grid>
            </Grid>
        </>
    );
};
