// import { useState, useEffect, useMemo } from "react";
// import { useTranslate } from "@hooks/useTranslate";
// import { useAutocomplete, useDataGrid } from "@refinedev/mui";
// import {
//   Autocomplete,
//   TextField,
//   Box,
//   Grid2 as Grid,
//   Typography,
//   Button,
//   TableContainer,
//   Table,
//   TableHead,
//   TableCell,
//   TableRow,
//   Paper,
//   TableBody,
// } from "@mui/material";
// import { FaTrash } from "react-icons/fa6";
// import { ILibBookCopy, ILibPatron } from "../interface";
// import { LANG_LIBRARY } from "@common/constant";
// import { NEW_BOOK_URL, LIBRARY_PATRON_URL, LIBRARY_TRANSACTION_URL } from "../constant";
// import { GridColDef } from "@mui/x-data-grid";
// import { HttpError } from "@refinedev/core";
// import { ATFormProps, Nullable } from "src/interfaces";
// import { useForm } from "@refinedev/react-hook-form";
// import { ActiveStatusChip } from "@components/label/status.label";

// export const EBookTab = (props: ATFormProps) => {
//   const t = useTranslate(LANG_LIBRARY, "bookCopy");

//   // State for book and patron search inputs and selections
//   const [searchBook, setSearchBook] = useState<string>("");
//   const [searchPatron, setSearchPatron] = useState<string>("");
//   const [inputValueBook, setInputValueBook] = useState<string>("");
//   const [inputValuePatron, setInputValuePatron] = useState<string>("");
//   const [selectedBooks, setSelectedBooks] = useState<ILibBookCopy[]>([]);

//   const { autocompleteProps: bookAutocompleteProps } = useAutocomplete<
//     ILibBookCopy,
//     HttpError
//   >({
//     resource: NEW_BOOK_URL,
//     onSearch: (value) => [{ field: "accession_no", operator: "eq", value }],
//   });

//   const { autocompleteProps: patronAutocompleteProps } = useAutocomplete<
//     ILibPatron,
//     HttpError
//   >({
//     resource: LIBRARY_PATRON_URL,
//     onSearch: (value) => [{ field: "patron_no", operator: "eq", value }],
//   });

//   const { dataGridProps: bookDataGridProps, setFilters: setBookFilters } =
//     useDataGrid<ILibBookCopy, HttpError>({
//       resource: NEW_BOOK_URL,
//       meta: { customQuery: { book: true, takenBy: true } },
//     });

//   const { dataGridProps: patronDataGridProps, setFilters: setPatronFilters } =
//     useDataGrid<ILibPatron, HttpError>({
//       resource: LIBRARY_PATRON_URL,
//     });


//   // Filter book options based on input value
//   useEffect(() => {
//     setBookFilters(
//       searchBook.trim()
//         ? [{ field: "accession_no", operator: "eq", value: searchBook }]
//         : []
//     );
//   }, [searchBook, setBookFilters]);

//   // Filter patron options based on input value
//   useEffect(() => {
//     setPatronFilters(
//       searchPatron.trim()
//         ? [{ field: "patron_no", operator: "eq", value: searchPatron }]
//         : []
//     );
//   }, [searchPatron, setPatronFilters]);

//   const columns = useMemo<GridColDef<ILibBookCopy>[]>(
//     () => [
//       {
//         field: "accession_no",
//         headerName: t("fields.accession_no"),
//         sortable: true,
//       },
//       {
//         field: "title",
//         headerName: t("fields.title"),
//         sortable: true,
//         renderCell: ({ row }) => row?.book?.title,
//       },
//       {
//         field: "classification",
//         headerName: t("fields.classification"),
//         sortable: true,
//         renderCell: ({ row }) => row?.book?.classification,
//       },
//       {
//         field: "issued_to",
//         headerName: t("fields.issued_to"),
//         sortable: true,
//         renderCell: ({ row }) => row?.takenBy?.name,
//       },
//     ],
//     [t]
//   );

//   const handleAddBook = (book: ILibBookCopy) => {
//     if (!selectedBooks.find((b) => b.accession_no === book.accession_no)) {
//       setSelectedBooks((prevBooks) => [...prevBooks, book]);
//       setInputValueBook("");
//       setSearchBook("");
//     }
//   };

//   const handleRemoveBook = (accession_no: string) => {
//     setSelectedBooks((prevBooks) =>
//       prevBooks.filter((book) => book.accession_no !== accession_no)
//     );
//   };

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     refineCore: { onFinish },
//     saveButtonProps,
//   } = useForm<ILibBookCopy, HttpError, Nullable<ILibBookCopy>>({
//     refineCoreProps: {
//       resource: LIBRARY_TRANSACTION_URL,
//       redirect: false,
//       id: props.id,
//       action: props.action,
//       onMutationSuccess: props.onClose,
//       meta: {
//         customQuery: {
//           books: selectedBooks,
//           patron: searchPatron,
//         }
//       }
//     },
//   });

//   return (
//     <>
//       <Grid container spacing={2}>
//         {/* Book Search Section */}
//         <Grid size={6}>
//           <Autocomplete
//             freeSolo
//             inputValue={inputValueBook}
//             onInputChange={(event, newInputValue) =>
//               setInputValueBook(newInputValue)
//             }
//             value={searchBook}
//             onChange={(event, newValue) => {
//               setSearchBook(newValue || "");
//               const selectedBook = bookDataGridProps.rows.find(
//                 (row) => row.accession_no === newValue
//               );
//               if (selectedBook) handleAddBook(selectedBook);
//             }}
//             options={bookDataGridProps.rows.map((row) => row.accession_no)}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label={t("titles.accession_no")}
//                 variant="outlined"
//                 fullWidth
//               />
//             )}
//           />

//           {/* Selected Book Details */}
//           {selectedBooks.length > 0 && (
//             <Box mt={4}>
//               <Typography variant="h6">{t("titles.bookDetail")}</Typography>
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>{t("fields.accession_no")}</TableCell>
//                       <TableCell align="right">
//                         {t("fields.bookName")}
//                       </TableCell>
//                       <TableCell align="right">
//                         {t("fields.classification")}
//                       </TableCell>
//                       <TableCell align="right">{t("fields.status")}</TableCell>
//                       <TableCell align="right">{t("fields.action")}</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {selectedBooks.map((book) => (
//                       <TableRow key={book.accession_no}>
//                         <TableCell>{book.accession_no}</TableCell>
//                         <TableCell align="right">{book?.book?.title}</TableCell>
//                         <TableCell align="right">
//                           {book?.book?.classification}
//                         </TableCell>
//                         <TableCell align="right">
//                           {book?.book?.status}
//                         </TableCell>
//                         <TableCell align="right">
//                           <Button
//                             color="error"
//                             onClick={() => handleRemoveBook(book.accession_no)}
//                           >
//                             <FaTrash />
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           )}
//         </Grid>

//         {/* Patron Search Section */}
//         <Grid size={6}>
//           <Autocomplete
//             freeSolo
//             inputValue={inputValuePatron}
//             onInputChange={(event, newInputValue) =>
//               setInputValuePatron(newInputValue)
//             }
//             value={searchPatron}
//             onChange={(event, newValue) => setSearchPatron(newValue || "")}
//             options={patronDataGridProps.rows.map((row) => row.patron_no)}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label={t("titles.patron_no")}
//                 variant="outlined"
//                 fullWidth
//               />
//             )}
//           />

//           {/* Patron Details */}
//           {searchPatron && patronDataGridProps.rows.length === 1 && (
//             <Grid size={12}>
//               <TableContainer component={Paper}>
//                 <Table
//                   sx={{ width: "100%", minWidth: 600, borderCollapse: "collapse" }}
//                 >
//                   <TableBody>
//                     <TableRow sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
//                       <TableCell>Email</TableCell>
//                       <TableCell>{searchPatron?.user?.email}</TableCell>
//                     </TableRow>
//                     <TableRow sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
//                       <TableCell>Phone Number</TableCell>
//                       <TableCell>{searchPatron?.user?.phone}</TableCell>
//                     </TableRow>
//                     <TableRow sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
//                       <TableCell>Notification Status</TableCell>
//                       <TableCell>{searchPatron?.user?.notificationStatus}</TableCell>
//                     </TableRow>
//                     <TableRow sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
//                       <TableCell>Status</TableCell>
//                       <TableCell>
//                         <ActiveStatusChip status={searchPatron?.status} />
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Grid>

//           )}
//         </Grid>
//       </Grid>

//       {/* Submit Button */}
//       <Grid container spacing={2}>
//         <Grid size={6}>

//           <Box mt={2} sx={{ display: 'flex', alignItems: 'end' }}>
//             <Button
//               variant="contained"
//               color="primary"
//               {...saveButtonProps}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </>
//   );
// };
