import {
  type HttpError,
} from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { LANG_EXAM } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { IExmType } from "../../interface";
import { EXAM_ESUBJECT_LIST } from "../../constant/local.urls";

export const ESubjectListTable = () => {
  const t = useTranslate(LANG_EXAM, "esubject");
  const { edit } = useNav(EXAM_ESUBJECT_LIST);

  const columns = useMemo<GridColDef<IExmType>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "status",
        headerName: t("fields.status"),
        sortable: false,
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

  const { dataGridProps } = useDataGrid<IExmType, HttpError>();
  return <TableGrid
    {...dataGridProps}
    columns={columns}
  />
};
