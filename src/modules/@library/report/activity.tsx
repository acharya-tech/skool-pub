import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_LIBRARY } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { ILibBookCopy, ILibTransaction } from "../interface";
import { TableListProp } from "src/interfaces";
import {
  LIBRARY_TRANSACTION_URL,
  NEW_BOOK_URL,
} from "../constant";
import { DateLabel } from "@components/label/date.label";
import { NotSetLabel } from "@components/label/notset.label";

export const ReportActivityTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_LIBRARY, "transaction");
  const { edit } = useNav(LIBRARY_TRANSACTION_URL);

  const columns = useMemo<GridColDef<ILibTransaction>[]>(
    () => [
      {
        field: "accession_no",
        headerName: t("fields.accession_no"),
        sortable: true,
        width: 150
      },
      {
        field: "copy.book.title",
        headerName: t("fields.book"),
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
        field: "checkout_date",
        headerName: t("fields.checkout_date"),
        sortable: true,
        renderCell: function render({ row }) {
          return <DateLabel date={row?.checkout_date} />
        },
      },
      {
        field: "issuedBy.name",
        headerName: t("fields.issued_by"),
        sortable: true,
        renderCell: function render({ row }) {
          return row.issuedBy?.name
        },
      },
      {
        field: "checkin_date",
        headerName: t("fields.checkin_date"),
        sortable: true,
        renderCell: function render({ row }) {
          return row.checkin_date ? <DateLabel date={row.checkin_date} /> : <NotSetLabel />
        },
      },
      {
        field: "receivedBy.name",
        headerName: t("fields.received_by"),
        sortable: true,
        renderCell: function render({ row }) {
          return row.receivedBy?.name
        },
      },
      {
        field: "fine.fine_amount",
        headerName: t("fields.fine"),
        sortable: true,
        renderCell: function render({ row }) {
          return row.fine?.fine_amount ?? <NotSetLabel />
        },
      },
    ],
    [t, edit]
  );

  const { dataGridProps, setFilters } = useDataGrid<ILibBookCopy, HttpError>({
    resource: LIBRARY_TRANSACTION_URL,
    meta: {
      customQuery: {
        book: true,
        fine: true,
        patron: true,
        issuedBy: true,
        receivedBy: true
      },
    },
    sorters: {
      initial: [
        {
          field: "updated_at",
          order: "desc"
        }
      ]
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
