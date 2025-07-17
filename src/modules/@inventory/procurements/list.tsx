import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_INVENTORY } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { Stack } from "@mui/material";
import { useNav } from "@hooks/useNavlHook";
import { INVENTORY_PROCUREMENT_LIST } from "../constant";
import { IStoreProcurement } from "../interface";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DateLabel } from "@components/label/date.label";
import { ActiveStatusChip } from "@components/label/status.label";

export const ProcurementListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_INVENTORY, "procurement");
  const { edit, show } = useNav(INVENTORY_PROCUREMENT_LIST);

  const columns = useMemo<GridColDef<IStoreProcurement>[]>(
    () => [
      {
        field: "proc_regid",
        headerName: t("fields.proc_regid"),
        sortable: true,
      },
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "entry_date",
        headerName: t("fields.entry_date"),
        sortable: true,
        renderCell: ({ row }) => {
          return <DateLabel date={row.entry_date} />;
        }
      },
      {
        field: "user.name",
        headerName: t("fields.user"),
        sortable: true,
        renderCell: ({ row }) => {
          return row?.user?.name;
        },
      },
      {
        field: "status",
        headerName: t("fields.status"),
        sortable: true,
        width: 100,
        renderCell: function render({ row }) {
          return <ActiveStatusChip status={row.status} />
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
    [t, edit]
  );

  const { dataGridProps, setFilters } = useDataGrid<IStoreProcurement, HttpError>({
    meta: { customQuery: { user: true } },
  });

  useEffect(() => {
    setFilters([
      {
        field: "code",
        value: search,
        operator: "eq",
      },
      {
        field: "name",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return <TableGrid {...dataGridProps} columns={columns} />;
};
