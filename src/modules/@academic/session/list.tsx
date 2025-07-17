import {
  type HttpError,
} from "@refinedev/core";

import { ISession } from "@academic/interface";
import { ACADEMIC_SESSION_LIST } from "@academic/constant/urls";
import { useTranslate } from "@hooks/useTranslate";
import { DeleteButton, EditButton, useDataGrid } from "@refinedev/mui";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_ACADEMIC } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { Chip, Stack } from "@mui/material";
import { useNav } from "@hooks/useNavlHook";
import { ACADEMIC_SESSION_URL } from "@academic/constant/server.url";
import { TableListProp } from "src/interfaces";
export const SessionListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_ACADEMIC, "session");
  const { edit } = useNav(ACADEMIC_SESSION_LIST);

  const columns = useMemo<GridColDef<ISession>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "week",
        headerName: t("fields.week"),
        sortable: false,
        renderCell: ({ row }) => {
          return row.week?.map(e => (<Chip label={e} />))
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

  const { dataGridProps, setFilters } = useDataGrid<ISession, HttpError>({
    resource: ACADEMIC_SESSION_URL
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
