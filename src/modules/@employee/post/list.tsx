import {
  type HttpError
} from "@refinedev/core";

import { EMPLOYEE_POST_LIST } from "@employee/constant/local.urls";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_EMPLOYEE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { IPost } from "../interface";
import { Stack } from "@mui/material";
import { TableListProp } from "src/interfaces";
import { EMPLOYEE_POST_URL } from "@employee/constant";

export const PostListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_EMPLOYEE, "post");
  const { edit, show } = useNav(EMPLOYEE_POST_LIST);

  const columns = useMemo<GridColDef<IPost>[]>(
    () => [
      {
        field: "id",
        headerName: t("fields.id"),
        sortable: true,
        width: 50,
      },
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
        renderCell: ({ row }) => {
          return row.name
        }
      },
      {
        field: "level",
        headerName: t("fields.level"),
        sortable: true,
        renderCell: ({ row }) => {
          return row.level
        }
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return (
            <Stack direction={"row"}>
              <IconButton
                size="small"
                sx={{
                  color: "text.secondary",
                }}
                onClick={() => edit(row.id)}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, edit],
  );

  const { dataGridProps, setFilters } = useDataGrid<IPost, HttpError>({
    resource: EMPLOYEE_POST_URL
  });

  useEffect(() => {
    setFilters([
      {
        field: "name",
        value: search,
        operator: "eq"
      }
    ])
  }, [search])

  return <TableGrid
    {...dataGridProps}
    columns={columns}
  />

};

