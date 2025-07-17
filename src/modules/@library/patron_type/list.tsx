import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_LIBRARY } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { ILibBook, ILibPatronType } from "../interface";
import { TableListProp } from "src/interfaces";
import { LIBRARY_PATRON_TYPE_LIST, LIBRARY_PATRON_TYPE_URL } from "../constant";

export const PatronTypeListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_LIBRARY, "patronType");
  const { edit, show } = useNav(LIBRARY_PATRON_TYPE_LIST);

  const columns = useMemo<GridColDef<ILibPatronType>[]>(
    () => [
      {
        field: "patron_type",
        headerName: t("fields.patron_type"),
        sortable: true,
      },
      {
        field: "allow_days",
        headerName: t("fields.allow_days"),
        sortable: true,
      },
      {
        field: "per_day_fine",
        headerName: t("fields.per_day_fine"),
        sortable: true,
      },
      {
        field: "number_of_books",
        headerName: t("fields.number_of_books"),
        sortable: true,
      },
      {
        field: "valid_period",
        headerName: t("fields.valid_period"),
        sortable: true,
      },
      {
        field: "template.name",
        headerName: t("fields.template"),
        sortable: true,
        renderCell: ({ row }) => {
          return row?.template?.name;
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
              <IconButton
                size="small"
                sx={{
                  color: "text.secondary",
                }}
                onClick={() => edit(row.id)}
              >
                <EditOutlinedIcon />
              </IconButton>
            </>
          );
        },
      },
    ],
    [t, edit, show]
  );

  const { dataGridProps, setFilters } = useDataGrid<ILibBook, HttpError>({
    resource: LIBRARY_PATRON_TYPE_URL,
    meta: { customQuery: { template: true } },
  });
  console.log(dataGridProps, "dataGridProps");
  useEffect(() => {
    setFilters([
      {
        field: "patron_type",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return <TableGrid {...dataGridProps} columns={columns} />;
};
