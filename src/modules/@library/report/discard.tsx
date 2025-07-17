import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_LIBRARY } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { ILibBookCopy } from "../interface";
import { TableListProp } from "src/interfaces";
import {
  BookCopyStatusEnum,
  LIBRARY_BOOK_COPY_LIST,
  NEW_BOOK_URL,
} from "../constant";
import { BookCopyStatus } from "../component/common";

export const ReportDiscardTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_LIBRARY, "bookCopy");
  const { edit } = useNav(LIBRARY_BOOK_COPY_LIST);

  const columns = useMemo<GridColDef<ILibBookCopy>[]>(
    () => [
      {
        field: "accession_no",
        headerName: t("fields.accession_no"),
        sortable: true,
        width: 150
      },
      {
        field: "book.title",
        headerName: t("fields.title"),
        sortable: true,

        renderCell: ({ row }) => {
          return row?.book?.title;
        },
      },
      {
        field: "book.classification",
        headerName: t("fields.classification"),
        sortable: true,
        renderCell: ({ row }) => {
          return row?.book?.classification;
        },
      },
      {
        field: "book.book_type",
        headerName: t("fields.book_type"),
        sortable: true,
        width: 100,
        renderCell: ({ row }) => {
          return row?.book?.book_type;
        },
      },
      {
        field: "status",
        headerName: t("fields.status"),
        sortable: true,
        width: 100,
        renderCell: function render({ row }) {
          return <BookCopyStatus status={row.status} />
        }
      },
    ],
    [t, edit]
  );

  const { dataGridProps, setFilters } = useDataGrid<ILibBookCopy, HttpError>({
    resource: NEW_BOOK_URL,
    meta: {
      customQuery: {
        book: true,
        takenBy: true,
        status: [BookCopyStatusEnum.Discarded],
      },
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
        field: "book_title",
        value: search,
        operator: "eq",
      },
      {
        field: "classification",
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
