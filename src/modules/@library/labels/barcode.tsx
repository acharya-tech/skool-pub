import { useEffect, useMemo } from "react";
import { useUpdate, type HttpError } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import { GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Box, Button, Grid2 as Grid, } from "@mui/material";
import { ILibBookCopy } from "../interface";
import { TableListProp } from "src/interfaces";
import { YesNoEnum } from "@common/all.enum";
import { useNav } from "@hooks/useNavlHook";
import { TableGrid } from "@components/table/table.body";
import { LANG_LIBRARY } from "@common/constant";
import { LIBRARY_BOOK_COPY_LIST } from "../constant";

export const BarcodeTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_LIBRARY, "bookCopy");
  const { show } = useNav(LIBRARY_BOOK_COPY_LIST);
  const { mutate } = useUpdate();

  // TODO : handle 
  const handleMarkCode = (row: ILibBookCopy) => {
    mutate({
      resource: LIBRARY_BOOK_COPY_LIST,
      id: row.id,
      values: {
        mark_barcode: row.mark_barcode === YesNoEnum.Yes ? YesNoEnum.No : YesNoEnum.Yes,
      },
      invalidates: [],
      successNotification: false
    });
  }

  const handleMarkClearAll = () => {
    mutate({
      resource: LIBRARY_BOOK_COPY_LIST,
      id: "clearAllCode",
      values: {
        mark_barcode: YesNoEnum.No
      },
      invalidates: ["list"],
      successNotification: false
    });
  }

  const columns = useMemo<GridColDef<ILibBookCopy>[]>(
    () => [
      {
        field: "accession_no",
        headerName: t("fields.accession_no"),
        sortable: true,
        width: 120,
      },
      {
        field: "book.title",
        headerName: t("fields.title"),
        sortable: true,
        renderCell: ({ row }) => {
          return row?.book?.title; ``
        },
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        width: 100,
        sortable: false,
        renderCell: ({ row }) => {
          return (
            <IconButton
              size="small"
              sx={{
                color: row.mark_barcode === YesNoEnum.Yes ? "red" : "text.secondary",
              }}
              onClick={() => handleMarkCode(row)}
            >
              {row.mark_barcode === YesNoEnum.Yes ? <FaMinusCircle /> : <FaPlusCircle />}
            </IconButton>
          );
        },
      },
    ],
    [t, show]
  );

  const { dataGridProps, setFilters } = useDataGrid<ILibBookCopy, HttpError>({
    resource: LIBRARY_BOOK_COPY_LIST,
    meta: { customQuery: { mark_barcode: YesNoEnum.No, book: true } }
  });

  const { dataGridProps: selectedDataGridProps, setFilters: setSelectedFilters } = useDataGrid<ILibBookCopy, HttpError>({
    resource: LIBRARY_BOOK_COPY_LIST,
    meta: { customQuery: { mark_barcode: YesNoEnum.Yes, book: true } }
  });

  useEffect(() => {
    setFilters([
      {
        field: "accession_no",
        value: search,
        operator: "eq",
      },
      {
        field: "book_name",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  useEffect(() => {
    setSelectedFilters([
      {
        field: "accession_no",
        value: search,
        operator: "eq",
      },
      {
        field: "book_name",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={8}>
          <TableGrid
            {...dataGridProps}
            columns={columns}
          />
        </Grid>
        <Grid size={4}>
          <TableGrid
            {...selectedDataGridProps}
            columns={columns}
          />
          <Box sx={{ display: "flex", gap: 2, p: 2, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={handleMarkClearAll}
              size="small"
              color="error"
              disabled={selectedDataGridProps.rows.length === 0}
            >
              {t("actions.clearAll")}
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={selectedDataGridProps.rows.length === 0}
            >
              {t("actions.getSpine")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={selectedDataGridProps.rows.length === 0}
            >
              {t("actions.getBarcode")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
