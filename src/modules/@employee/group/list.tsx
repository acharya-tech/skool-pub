import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_EMPLOYEE, LANG_INVENTORY } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { Stack } from "@mui/material";
import { useNav } from "@hooks/useNavlHook";
import { EMPLOYEE_GROUP_LIST } from "../constant";
import { Edit, Visibility } from "@mui/icons-material";
import { IEmpGroup } from "../interface";

export const GroupListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_EMPLOYEE, "groups");
  const { show, edit } = useNav(EMPLOYEE_GROUP_LIST);

  const columns = useMemo<GridColDef<IEmpGroup>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "tot_mem",
        headerName: t("fields.tot_mem"),
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
              <IconButton
                size="small"
                sx={{
                  color: "text.secondary",
                }}
                onClick={() => show(row.id)}
              >
                <Visibility fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "text.secondary",
                }}
                onClick={() => edit(row.id)}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, show]
  );

  const { dataGridProps, setFilters } = useDataGrid<IEmpGroup, HttpError>();

  useEffect(() => {
    setFilters([
      {
        field: "name",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return <TableGrid {...dataGridProps} columns={columns} />;
};
