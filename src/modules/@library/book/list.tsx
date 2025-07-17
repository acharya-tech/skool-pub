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
import { BookTypeEnum, LIBRARY_BOOK_LIST } from "../constant";
import { FaCirclePlus } from "react-icons/fa6";
import { BasicModal } from "@components/modal/basic.modal";
import { QuantityBookForm } from "./_quantity_form";
import { Visibility } from "@mui/icons-material";

export const BookListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_LIBRARY, "book");
  const { edit, show } = useNav(LIBRARY_BOOK_LIST);
  const [newBook, setNewBook] = useState<undefined | string>();
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
        field: "book_qty",
        headerName: t("fields.book_qty"),
        sortable: true,
        width: 100
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
              <IconButton
                sx={{
                  color: "text.secondary",
                }}
                onClick={() => setNewBook(row.id)}
              >
                <FaCirclePlus size={16} />
              </IconButton>
              <IconButton
                sx={{
                  color: "text.secondary",
                }}
                onClick={() => edit(row.id)}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, edit]
  );

  const { dataGridProps, setFilters } = useDataGrid<ILibBook, HttpError>({
    meta: {
      customQuery: {
        publisher: true,
        book_type: [BookTypeEnum.Book, BookTypeEnum.Book_Ebook]
      }
    },
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
      <BasicModal open={Boolean(newBook)} onClose={() => setNewBook(undefined)}>
        <QuantityBookForm
          onClose={() => setNewBook(undefined)}
          id={newBook}
          action="edit"
        />
      </BasicModal>
    </>
  );
};
