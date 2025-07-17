import {
  type HttpError
} from "@refinedev/core";

import { IRoom } from "@academic/interface";
import { ACADEMIC_ROOM_LIST } from "@academic/constant/urls";
import { useTranslate } from "@hooks/useTranslate";
import { DeleteButton, EditButton, useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";

import { LANG_ACADEMIC } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { Stack } from "@mui/material";
export const RoomListTable = () => {
  const t = useTranslate(LANG_ACADEMIC, "room");
  const { edit } = useNav(ACADEMIC_ROOM_LIST)

  const columns = useMemo<GridColDef<IRoom>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "class_name",
        headerName: t("fields.class"),
        sortable: true,
      },
      {
        field: "size",
        headerName: t("fields.size"),
        renderCell: function render({ row }) {
          return `${row.row} x ${row.column}`
        }
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return (
            <Stack direction={"row"} justifyContent={"center"}>
              <EditButton
                sx={{
                  color: "text.secondary",
                }}
                recordItemId={row.id}
                hideText
                size="small"
              />
              <DeleteButton
                recordItemId={row.id}
                hideText
                size="small"
              />
            </Stack>
          );
        },
      },
    ],
    [t, edit],
  );

  const { dataGridProps } = useDataGrid<IRoom, HttpError>();
  return <TableGrid
    {...dataGridProps}
    columns={columns}
  />
};
