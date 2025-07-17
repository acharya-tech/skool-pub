import {
  type HttpError
} from "@refinedev/core";

import dayjs from "dayjs";
import { IBatch } from "@academic/interface";
import { VEHICLE_INFO_LIST } from "@vehicle/constant/local.urls";
import { useTranslate } from "@hooks/useTranslate";
import { TextFieldComponent, useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_VEHICLE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { IInfo } from "../interface";
import { TableListProp } from "src/interfaces";
import { Avatar } from "@mui/material";



export const InfoListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_VEHICLE, "info");
  const { edit } = useNav(VEHICLE_INFO_LIST);

  const columns = useMemo<GridColDef<IInfo>[]>(
    () => [
      {
        field: "image",
        headerName: ' ',
        sortable: false,
        disableColumnMenu: true,
        width: 45,
        renderCell: function render({ row }) {
          return <Avatar sx={{ width: 30, height: 30 }} src={row.image?.url} alt={row.image?.name} />
        }
      },
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "number",
        headerName: t("fields.number"),
        sortable: true,
      },
      {
        field: "type_id",
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

  const { dataGridProps, setFilters } = useDataGrid<IInfo, HttpError>({
    meta: { customQuery: { image: true } },

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

