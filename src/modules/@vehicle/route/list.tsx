import {
  type HttpError
} from "@refinedev/core";

import dayjs from "dayjs";
import { VEHICLE_ROUTE_LIST } from "@vehicle/constant/local.urls";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_VEHICLE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { IRoute } from "../interface";
import { Stack } from "@mui/material";
import { TableListProp } from "src/interfaces";


export const RouteListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_VEHICLE, "route");
  const { edit, show } = useNav(VEHICLE_ROUTE_LIST);

  const columns = useMemo<GridColDef<IRoute>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "bus",
        headerName: t("fields.bus"),
        sortable: true,
        renderCell: ({ row }) => {
          return row.bus.name
        }
      },
      {
        field: "depart_time",
        headerName: t("fields.depart_time"),
        sortable: true,
        renderCell: ({ row }) => {
          return dayjs(row.depart_time).format("hh:mm A").toString()
        }
      },
      {
        field: "arrival_time",
        headerName: t("fields.arrival_time"),
        sortable: true,
        renderCell: ({ row }) => {
          return dayjs(row.arrival_time).format("hh:mm A").toString()
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
                onClick={() => show(row.id)}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
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

  const { dataGridProps, setFilters } = useDataGrid<IRoute, HttpError>({
    meta: { customQuery: { bus: true } },

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

