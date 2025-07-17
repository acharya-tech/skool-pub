import {
  type HttpError
} from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { EditButton, ShowButton, useDataGrid } from "@refinedev/mui";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_APP } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { IRoles } from "../interface";
import { APP_ROLE_URL } from "../constant";
import { Stack } from "@mui/material";
import { SYSTEM_ADMIN_ROLE_ID } from "@common/options";



export const RoleListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_APP, "roles");
  const columns = useMemo<GridColDef<IRoles>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "status",
        headerName: t("fields.status"),
        sortable: true,
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return (
            <Stack direction={"row"}>
              <ShowButton hideText size="small" recordItemId={row.id} />
              {SYSTEM_ADMIN_ROLE_ID != row.id && <EditButton hideText size="small" recordItemId={row.id} />}
            </Stack>
          );
        },
      },
    ],
    [t],
  );

  const { dataGridProps, setFilters } = useDataGrid<IRoles, HttpError>({
    resource: APP_ROLE_URL
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

