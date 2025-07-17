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

export const SpineTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_LIBRARY, "bookCopy");
  const { show } = useNav(LIBRARY_BOOK_COPY_LIST);
  const { mutate } = useUpdate();
  const handleMarkSpine = (row: ILibBookCopy) => {
    mutate({
      resource: LIBRARY_BOOK_COPY_LIST,
      id: row.id,
      values: {
        mark_spine: row.mark_spine === YesNoEnum.Yes ? YesNoEnum.No : YesNoEnum.Yes,
      },
      successNotification: false,
      invalidates: [],
    });
  }

  const handleMarkClearAll = () => {
    mutate({
      resource: LIBRARY_BOOK_COPY_LIST,
      id: "clearAllSpine",
      values: {
        mark_spine: YesNoEnum.No
      },
      successNotification: false,
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
                color: row.mark_spine === YesNoEnum.Yes ? "red" : "text.secondary",
              }}
              onClick={() => handleMarkSpine(row)}
            >
              {row.mark_spine === YesNoEnum.Yes ? <FaMinusCircle /> : <FaPlusCircle />}
            </IconButton>
          );
        },
      },
    ],
    [t, show]
  );

  const { dataGridProps, setFilters } = useDataGrid<ILibBookCopy, HttpError>({
    resource: LIBRARY_BOOK_COPY_LIST,
    meta: { customQuery: { mark_spine: YesNoEnum.No, book: true } },
    queryOptions: {
      cacheTime: 0
    }
  });

  const { dataGridProps: selectedDataGridProps, setFilters: setSelectedFilters } = useDataGrid<ILibBookCopy, HttpError>({
    resource: LIBRARY_BOOK_COPY_LIST,
    meta: { customQuery: { mark_spine: YesNoEnum.Yes, book: true } },
    queryOptions: {
      cacheTime: 0
    }
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
