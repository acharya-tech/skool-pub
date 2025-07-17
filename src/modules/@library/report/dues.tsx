import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_LIBRARY } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { ILibBookCopy, ILibFine } from "../interface";
import { TableListProp } from "src/interfaces";
import {
  LIBRARY_FINE_URL,
} from "../constant";

export const ReportDueTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_LIBRARY, "fine");
  const { edit } = useNav(LIBRARY_FINE_URL);

  const columns = useMemo<GridColDef<ILibFine>[]>(
    () => [
      {
        field: "accession_no",
        headerName: t("fields.accession_no"),
        sortable: true,
      },
      {
        field: "copy.book.title",
        headerName: t("fields.book_name"),
        sortable: true,
        renderCell: ({ row }) => {
          return row?.copy?.book?.title;
        },
      },
      {
        field: "patron.name",
        headerName: t("fields.patron"),
        sortable: true,
        renderCell: ({ row }) => {
          return row?.patron?.name;
        },
      },
      {
        field: "fine_days",
        headerName: t("fields.overdue_days"),
        sortable: true,
      },
      {
        field: "fine_amount",
        headerName: t("fields.amount"),
        sortable: true,
      },
    ],
    [t, edit]
  );

  const { dataGridProps, setFilters } = useDataGrid<ILibBookCopy, HttpError>({
    resource: LIBRARY_FINE_URL,
    meta: {
      customQuery: {
        book: true,
        patron: true,
      },
    },
  });


  useEffect(() => {
    setFilters([
      {
        field: "copy.book.title",
        value: search,
        operator: "eq",
      },
      {
        field: "patron_name",
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
