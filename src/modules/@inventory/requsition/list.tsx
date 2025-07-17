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
import { INVENTORY_REQUISITION_LIST } from "../constant";
import { IStoreRequisition } from "../interface";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ActiveStatusChip } from "@components/label/status.label";

export const RequisitionListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_INVENTORY, "requisition");
  const { edit, show } = useNav(INVENTORY_REQUISITION_LIST);

  const columns = useMemo<GridColDef<IStoreRequisition>[]>(
    () => [
      {
        field: "title",
        headerName: t("fields.title"),
        sortable: true,
      },
      {
        field: "dep_name",
        headerName: t("fields.dep_name"),
        sortable: true,
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
            </Stack>
          );
        },
      },
    ],
    [t, edit]
  );

  const { dataGridProps, setFilters } = useDataGrid<IStoreRequisition, HttpError>({
    resource: INVENTORY_REQUISITION_LIST,
    meta: { customQuery: { procument: true, user: true } },
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
