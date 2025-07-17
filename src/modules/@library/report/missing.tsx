import { useUpdate, type HttpError } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_LIBRARY } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { ILibBookCopy } from "../interface";
import { TableListProp } from "src/interfaces";
import { Stack } from "@mui/material";
import {
  BookCopyStatusEnum,
  LIBRARY_BOOK_COPY_CONFIRM_URL,
  NEW_BOOK_URL,
} from "../constant";
import { useConfirm } from "@hooks/confirm.hook";
import { FaCheckCircle } from "react-icons/fa";
import { BookCopyStatus } from "../component/common";

export const ReportMissingTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_LIBRARY, "bookCopy");
  const { mutate } = useUpdate();

  const [showFoundedConfirm, confirmFounded] = useConfirm({
    onConfirm: ({ id }) => {
      mutate({
        resource: LIBRARY_BOOK_COPY_CONFIRM_URL,
        id,
        values: {
          status: BookCopyStatusEnum.Available,
          id,
        },
      });
    },
    confirmTitle: t("titles.foundedConfirm")
  });


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
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return (
            <>
              <Stack direction="row">
                <IconButton
                  onClick={() => {
                    showFoundedConfirm({ id: row.id, value: row.status });
                  }}
                >
                  <FaCheckCircle />
                </IconButton>
              </Stack>
            </>
          );
        },
      },
    ],
    [t]
  );

  const { dataGridProps, setFilters } = useDataGrid<ILibBookCopy, HttpError>({
    resource: NEW_BOOK_URL,
    meta: {
      customQuery: {
        book: true,
        takenBy: true,
        status: BookCopyStatusEnum.Missing
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
    ]);
  }, [search]);

  return (
    <>
      <TableGrid {...dataGridProps} columns={columns} />
      {confirmFounded}
    </>
  );
};
