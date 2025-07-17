import {
  type HttpError,
} from "@refinedev/core";

import { IBatch, IClass } from "@academic/interface";
import { ACADEMIC_CLASS_LIST } from "@academic/constant/urls";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { LANG_ACADEMIC } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";


export const ClassListTable = () => {
  const t = useTranslate(LANG_ACADEMIC, "class");
  const { edit } = useNav(ACADEMIC_CLASS_LIST);

  const columns = useMemo<GridColDef<IClass>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "program.name",
        headerName: t("fields.program"),
        sortable: false,
        renderCell: function render({ row }) {
          return row.program.name
        }
      },
      {
        field: "shift",
        headerName: t("fields.shift"),
        sortable: false,
      },
      {
        field: "medium",
        headerName: t("fields.medium"),
        sortable: false,
      },
      {
        field: "totalSubjects",
        headerName: t("fields.totalSubjects"),
        sortable: false,
      },
      {
        field: "sort",
        headerName: t("fields.sort"),
        sortable: true,
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return (
            <IconButton
              sx={{
                color: "text.secondary",
              }}
              onClick={() => edit(row.id)}
            >
              <EditOutlinedIcon />
            </IconButton>
          );
        },
      },
    ],
    [t, edit],
  );

  const { dataGridProps } = useDataGrid<IBatch, HttpError>({
    meta: { customQuery: { program: true } },
    sorters: {
      initial: [
        {
          field: "sort",
          order: "asc"
        }
      ]
    }
  });

  return <TableGrid
    {...dataGridProps}
    columns={columns}
  />

};






