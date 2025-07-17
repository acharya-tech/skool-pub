import { useUpdate, type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_LIBRARY } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { ILibBookCopy } from "../interface";
import { TableListProp } from "src/interfaces";
import { Stack } from "@mui/material";
import {
  BookCopyStatusEnum,
  LIBRARY_BOOK_COPY_CONFIRM_URL,
  LIBRARY_BOOK_COPY_LIST,
} from "../constant";
import {
  FaBarcode,
  FaTrash,
} from "react-icons/fa6";
import { MdLabelImportantOutline } from "react-icons/md";

import { useConfirm } from "@hooks/confirm.hook";
import { YesNoEnum } from "@common/all.enum";
import { FaQuestionCircle } from "react-icons/fa";
import { BookCopyStatus } from "../component/common";
import { Visibility } from "@mui/icons-material";

export const BookCopyListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_LIBRARY, "bookCopy");
  const { show } = useNav(LIBRARY_BOOK_COPY_LIST);
  const { mutate } = useUpdate();

  const showBarcodeConfirm = (bookCopy: ILibBookCopy) => {
    mutate({
      resource: LIBRARY_BOOK_COPY_CONFIRM_URL,
      id: bookCopy.id,
      values: {
        mark_barcode: bookCopy.mark_barcode == YesNoEnum.Yes ? YesNoEnum.No : YesNoEnum.Yes,
        id: bookCopy.id,
      },
    });
  }

  const showSpineConfirm = (bookCopy: ILibBookCopy) => {
    mutate({
      resource: LIBRARY_BOOK_COPY_CONFIRM_URL,
      id: bookCopy.id,
      values: {
        mark_spine: bookCopy.mark_spine == YesNoEnum.Yes ? YesNoEnum.No : YesNoEnum.Yes,
        id: bookCopy.id,
      },
    });
  }

  const [showDiscardConfirm, discardconfirm] = useConfirm({
    onConfirm: ({ id, value }) => {
      mutate({
        resource: LIBRARY_BOOK_COPY_CONFIRM_URL,
        id,
        values: {
          status:
            value == BookCopyStatusEnum.Discarded
              ? BookCopyStatusEnum.Available
              : BookCopyStatusEnum.Discarded,
          id,
        },
      });
    },
    confirmTitle: t("titles.discardConfirm"),
  });



  const [showMissingConfirm, missingConfirm] = useConfirm({
    onConfirm: ({ id, value }) => {
      mutate({
        resource: LIBRARY_BOOK_COPY_CONFIRM_URL,
        id,
        values: {
          status:
            value == BookCopyStatusEnum.Missing
              ? BookCopyStatusEnum.Available
              : BookCopyStatusEnum.Missing,
          id,
        },
      });
    },
    confirmTitle: t("titles.missingConfirm"),
  });

  const columns = useMemo<GridColDef<ILibBookCopy>[]>(
    () => [
      {
        field: "accession_no",
        headerName: t("fields.accession_no"),
        sortable: true,
        width: 150,
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
        field: "book.classification",
        headerName: t("fields.classification"),
        sortable: true,
        width: 200,
        renderCell: ({ row }) => {
          return row?.book?.classification;
        },
      },
      {
        field: "edition",
        headerName: t("fields.edition"),
        sortable: true,
        width: 100,
      },
      {
        field: "price",
        headerName: t("fields.price"),
        sortable: true,
        width: 100,
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
        width: 250,
        renderCell: function render({ row }) {
          return (
            <Stack direction="row">
              <IconButton
                sx={{
                  color: "text.secondary",
                }}
                //TODO: Show button not working
                onClick={() => show(row.id)}
              >
                <Visibility fontSize="small" />
              </IconButton>
              <IconButton
                sx={{
                  color:
                    row.mark_spine === YesNoEnum.Yes
                      ? "success.main"
                      : "text.secondary",
                }}
                onClick={() =>
                  showSpineConfirm(row)
                }
              >
                <MdLabelImportantOutline />
              </IconButton>
              <IconButton
                sx={{
                  color:
                    row.mark_barcode === YesNoEnum.Yes
                      ? "success.main"
                      : "text.secondary", // Corrected comparison with enum
                }}
                onClick={() => {
                  showBarcodeConfirm(row);
                }}
              >
                <FaBarcode size={16} />
              </IconButton>
              <IconButton
                sx={{
                  color:
                    row.status === BookCopyStatusEnum.Missing
                      ? "error.main"
                      : "text.secondary", // Corrected comparison with enum
                }}
                onClick={() => {
                  showMissingConfirm({ id: row.id, value: row.status });
                }}
              >
                <FaQuestionCircle size={16} />
              </IconButton>
              <IconButton
                sx={{
                  color:
                    row.status === BookCopyStatusEnum.Discarded
                      ? "error.main"
                      : "text.secondary", // Corrected comparison with enum
                }}
                onClick={() => {
                  showDiscardConfirm({ id: row.id, value: row.status });
                }}
              >
                <FaTrash size={16} />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, showBarcodeConfirm, showDiscardConfirm, showDiscardConfirm]
  );

  const { dataGridProps, setFilters } = useDataGrid<ILibBookCopy, HttpError>({
    meta: {
      customQuery: {
        book: true,
        status: [BookCopyStatusEnum.Checkout, BookCopyStatusEnum.Available]
      }
    },
  });

  useEffect(() => {
    setFilters([
      {
        field: "book_title",
        value: search,
        operator: "eq",
      },
      {
        field: "accession_no",
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
      {missingConfirm}
      {discardconfirm}
    </>
  );
};
