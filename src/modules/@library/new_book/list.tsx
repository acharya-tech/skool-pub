import { HttpError, useUpdate } from "@refinedev/core";
import { ILibBook } from "../interface";
import { useTranslate } from "@hooks/useTranslate";
import { TableListProp } from "src/interfaces";
import { TableGrid } from "@components/table/table.body";
import { BasicModal } from "@components/modal/basic.modal";
import { AcessionBookForm } from "./_accession_no_form";
import { FaCirclePlus } from "react-icons/fa6";
import { IconButton, Stack } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";
import { LIBRARY_BOOK_URL, LIBRARY_NEW_BOOK_LIST } from "../constant";
import { useNav } from "@hooks/useNavlHook";
import { LANG_LIBRARY } from "@common/constant";
import { DeleteOutline } from "@mui/icons-material";
import { useConfirm } from "@hooks/confirm.hook";

export const NewBookListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_LIBRARY, "book");
  const { edit } = useNav(LIBRARY_NEW_BOOK_LIST);
  const [addAccession, setAddAccession] = useState<ILibBook | undefined>(undefined); // Store the selected book

  const { mutate } = useUpdate()
  const [confirmDelete, confirmEle] = useConfirm({
    onConfirm: ({ id }) => {
      handleRemoveNewBook(id)
    },
    confirmTitle: t("info.confirm")
  })
  const handleRemoveNewBook = (id: string) => {
    mutate({
      resource: LIBRARY_BOOK_URL,
      id: id,
      values: {
        new_book: 0
      }
    })
  }

  const columns = useMemo<GridColDef<ILibBook>[]>(
    () => [
      {
        field: "id",
        headerName: t("fields.id"),
        sortable: true,
      },
      {
        field: "title",
        headerName: t("fields.title"),
        sortable: true,
      },
      {
        field: "publisher",
        headerName: t("fields.publisher"),
        sortable: true,
        renderCell: ({ row }) => {
          return row?.publisher?.name;
        },
      },
      {
        field: "classification",
        headerName: t("fields.classification"),
        sortable: true,
      },
      {
        field: "new_book",
        headerName: t("fields.new_book"),
        sortable: true,
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
                  sx={{
                    color: "text.secondary",
                  }}
                  onClick={() => {
                    setAddAccession(row);
                  }}
                >
                  <FaCirclePlus />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: 'red',
                  }}
                  onClick={() => {
                    confirmDelete({ id: row.id })
                  }}
                >
                  <DeleteOutline />
                </IconButton>
              </Stack>
            </>
          );
        },
      },
    ],
    [t, edit]
  );

  const { dataGridProps, setFilters, tableQuery: { refetch } } = useDataGrid<ILibBook, HttpError>({
    meta: { customQuery: { publisher: true, new_book: 1 } },
    resource: LIBRARY_BOOK_URL,
  });

  useEffect(() => {
    setFilters([
      {
        field: "title",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return (
    <>
      <TableGrid {...dataGridProps} columns={columns} />
      {Boolean(addAccession) && (
        <BasicModal
          open={true} // Check if there is a book to pass
          onClose={() => { setAddAccession(undefined); refetch() }} // Close the modal and reset state
        >
          <AcessionBookForm
            onClose={() => { setAddAccession(undefined); refetch() }}
            action="create"
            book={addAccession} // Pass the selected book here
          />
        </BasicModal>
      )}
      {confirmEle}
    </>
  );
};
