import {
  type HttpError,
} from "@refinedev/core";

import { IAcademicHouse } from "@academic/interface";
import { ACADEMIC_HOUSE_LIST } from "@academic/constant/urls";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { LANG_ACADEMIC } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { Chip } from "@mui/material";
import { useNav } from "@hooks/useNavlHook";
export const HouseListTable = () => {
  const t = useTranslate(LANG_ACADEMIC, "house");
  const { edit } = useNav(ACADEMIC_HOUSE_LIST);

  const columns = useMemo<GridColDef<IAcademicHouse>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "color",
        headerName: t("fields.color"),
        sortable: false,
        renderCell: ({ row }) => {
          return <Chip label={row.color} sx={{ backgroundColor: row.color }} />
        }
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

  const { dataGridProps } = useDataGrid<IAcademicHouse, HttpError>();
  return <TableGrid
    {...dataGridProps}
    columns={columns}
  />
};
