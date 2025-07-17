import {
  type HttpError
} from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_VEHICLE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { ILocation } from "../interface";
import { VEHICLE_LOCATION_LIST } from "../constant/local.urls";
import { TableListProp } from "src/interfaces";


export const LocationListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_VEHICLE, "location");
  const { edit } = useNav(VEHICLE_LOCATION_LIST);

  const columns = useMemo<GridColDef<ILocation>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "duration",
        headerName: t("fields.duration"),
        width: 180,
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

  const { dataGridProps, setFilters } = useDataGrid<ILocation, HttpError>({

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

