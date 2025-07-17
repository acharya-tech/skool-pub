import {
  type HttpError,
} from "@refinedev/core";

import { IBatch } from "@academic/interface";
import { ACADEMIC_PROGRAM_LIST } from "@academic/constant/urls";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";

import { LANG_ACADEMIC } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
export const ProgramListTable = () => {
  const t = useTranslate(LANG_ACADEMIC, "program");
  const { edit } = useNav(ACADEMIC_PROGRAM_LIST);

  const columns = useMemo<GridColDef<IBatch>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "faculty",
        headerName: t("fields.faculty"),
        sortable: true,
      },
      {
        field: "affiliation",
        headerName: t("fields.affiliation"),
        sortable: true,
      },
      {
        field: "type",
        headerName: t("fields.type"),
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

  const { dataGridProps } = useDataGrid<IBatch, HttpError>();
  return <TableGrid
    {...dataGridProps}
    columns={columns}
  />
};

