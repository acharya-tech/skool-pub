import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_INVENTORY } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { Stack } from "@mui/material";
import { useNav } from "@hooks/useNavlHook";
import {
  INVENTORY_INENTRY_LIST,
} from "../constant";
import { IStoreInEntry } from "../interface";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DateTimeLabel } from "@components/label/date.label";
import { ActiveStatusChip } from "@components/label/status.label";

export const InEntryListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_INVENTORY, "inEntry");
  const { edit, show } = useNav(INVENTORY_INENTRY_LIST);

  const columns = useMemo<GridColDef<IStoreInEntry>[]>(
    () => [
      {
        field: "title",
        headerName: t("fields.title"),
        sortable: true,
      },
      {
        field: "procument.proc_regid",
        headerName: t("fields.proc_regid"),
        sortable: true,
        width: 150,
        renderCell: ({ row }) => {
          return row?.procument?.proc_regid;
        },
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
        field: "entry_date",
        headerName: t("fields.entry_date"),
        sortable: true,
        width: 150,
        renderCell: ({ row }) => {
          return <DateTimeLabel date={row?.entry_date} />;
        },
      },
      {
        field: "total_amount",
        headerName: t("fields.total_amount"),
        sortable: true,
        width: 150,
      },
      {
        field: "status",
        headerName: t("fields.status"),
        sortable: true,
        width: 150,
        renderCell: ({ row }) => {
          return <ActiveStatusChip status={row?.status} />;
        },
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        width: 100,
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
            </Stack>
          );
        },
      },
    ],
    [t, edit]
  );

  const { dataGridProps, setFilters } = useDataGrid<IStoreInEntry, HttpError>({
    meta: { customQuery: { procument: true, user: true } },
    resource: INVENTORY_INENTRY_LIST,
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
      {
        field: "procument_no",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return <TableGrid {...dataGridProps} columns={columns} />;
};
