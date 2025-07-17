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
import { ILibBookCopy } from "../interface";
import { LANG_LIBRARY } from "@common/constant";
import { NEW_BOOK_URL, BookCopyStatusEnum, LIBRARY_TRANSACTION_CHECKIN_URL } from "../constant";
import { HttpError } from "@refinedev/core";
import { BookCopyStatus } from "../component/common";
import { getLibraryDueDays } from "@utils/other";
import { DateLabel } from "@components/label/date.label";
import { useRefineForm } from "@hooks/useForm";

export const CheckInTab = () => {
  const t = useTranslate(LANG_LIBRARY, "bookCopy");

  // State for book and patron search inputs and selections
  const [selectedBooks, setSelectedBooks] = useState<ILibBookCopy[]>([]);

  const { autocompleteProps: bookAutocompleteProps, query: { refetch: bookListRefetch } } = useAutocomplete<
    ILibBookCopy,
    HttpError
  >({
    resource: NEW_BOOK_URL,
    meta: {
      customQuery: { book: true, takenBy: true, status: [BookCopyStatusEnum.Checkout, BookCopyStatusEnum.Missing] }
    },
    onSearch: (value) => [
      { field: "accession_no", operator: "eq", value },
      { field: "book_title", operator: "eq", value }
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
      resource: LIBRARY_TRANSACTION_CHECKIN_URL,
      redirect: false,
      action: "create",
      onMutationSuccess: () => {
        setSelectedBooks([])
        bookListRefetch()
      }
    },
  });

  const handleSubmitData = () => {
    const payload = {
      books: selectedBooks,
    };
    onFinish(payload);
  };

  return (
    <>
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid size={6}>
          <Autocomplete
            {...bookAutocompleteProps}
            value={null} // Ensure the value resets after selection
            onChange={(event, newValue: any) => {
              if (newValue) {
                handleAddBook(newValue); // Add selected item
              }
            }}
            getOptionDisabled={(option) => selectedBooks.includes(option)}
            getOptionLabel={(option: any) => ("")}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {`${option.accession_no} | ${option.book.title}`}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                size={"small"}
                variant={"outlined"}
                label={t("labels.accession_no")}
              />
            )}
          />

        </Grid>
        <Grid size={10}>
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
                      {t("fields.patronName")}
                    </TableCell >
                    <TableCell sx={{ p: 1 }}>
                      {t("fields.patronType")}
                    </TableCell >
                    <TableCell align="center" sx={{ p: 1 }}>{t("fields.status")}</TableCell>
                    <TableCell align="center" sx={{ p: 1 }}>{t("fields.checkout_date")}</TableCell>
                    <TableCell align="center" sx={{ p: 1 }}>{t("fields.due_days")}</TableCell>
                    <TableCell align="center" sx={{ p: 1 }}>{t("fields.action")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedBooks.map((book) => (
                    <TableRow key={book.accession_no}>
                      <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{book.accession_no}</TableCell>
                      <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{book.book.title}</TableCell>
                      <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>
                        {`${book?.takenBy.patron_no} | ${book?.takenBy?.name}`}
                      </TableCell>
                      <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>
                        {book?.takenBy.patronType.patron_type}
                      </TableCell>
                      <TableCell align="center" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}><BookCopyStatus status={book?.status} /></TableCell>
                      <TableCell align="center" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}><DateLabel date={book?.taken_date} /></TableCell>
                      <TableCell align="center" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{getLibraryDueDays(book?.due_date)}</TableCell>
                      <TableCell align="center" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>
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
        </Grid>
        <Grid size={12}>
          <Divider sx={{ py: 1 }} />
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              variant="contained"
              color="primary"
              disabled={selectedBooks.length == 0}
              onClick={handleSubmitData}
            >
              {t("actions.checkin")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
