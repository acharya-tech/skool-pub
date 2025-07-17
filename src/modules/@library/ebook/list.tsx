import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";

import { LANG_LIBRARY } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { ILibBook } from "../interface";
import { TableListProp } from "src/interfaces";
import { Stack } from "@mui/material";
import { BookTypeEnum, LIBRARY_BOOK_LIST, LIBRARY_EBOOK_LIST } from "../constant";
import { Visibility } from "@mui/icons-material";

export const EBookListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_LIBRARY, "book");
  const { edit, show } = useNav(LIBRARY_EBOOK_LIST);
  const columns = useMemo<GridColDef<ILibBook>[]>(
    () => [
      {
        field: "id",
        headerName: t("fields.id"),
        sortable: true,
        width: 100,
      },
      {
        field: "title",
        headerName: t("fields.title"),
        sortable: true,
      },
      {
        field: "publisher.name",
        headerName: t("fields.publisher"),
        sortable: true,
        width: 200,
        renderCell: ({ row }) => {
          return row?.publisher?.name;
        },
      },
      {
        field: "classification",
        headerName: t("fields.classification"),
        sortable: true,
        width: 200,
      },
      {
        field: "book_type",
        headerName: t("fields.type"),
        sortable: true,
        width: 100,
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return (
            <Stack direction="row" >
              <IconButton
                sx={{
                  color: "text.secondary",
                }}
                onClick={() => show(row.id)}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, edit]
  );

  const { dataGridProps, setFilters } = useDataGrid<ILibBook, HttpError>({
    meta: { customQuery: { publisher: true, book_type: [BookTypeEnum.Book_Ebook, BookTypeEnum.Ebook] } },
    resource: LIBRARY_BOOK_LIST
  });

  useEffect(() => {
    setFilters([
      {
        field: "title",
        value: search,
        operator: "eq",
      },
      {
        field: "id",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return (
    <>
      <TableGrid {...dataGridProps} columns={columns} />
    </>
  );
};
