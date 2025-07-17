import {
  type HttpError,
} from "@refinedev/core";

import { IHostel } from "@academic/interface";
import { ACADEMIC_HOSTEL_LIST } from "@academic/constant/urls";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { LANG_ACADEMIC } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
export const HostelListTable = () => {
  const t = useTranslate(LANG_ACADEMIC, "house");
  const { edit } = useNav(ACADEMIC_HOSTEL_LIST);

  const columns = useMemo<GridColDef<IHostel>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
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

  const { dataGridProps } = useDataGrid<IHostel, HttpError>();
  return <TableGrid
    {...dataGridProps}
    columns={columns}
  />
};
