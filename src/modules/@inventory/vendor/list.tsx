import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_INVENTORY, LANG_VEHICLE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { Avatar, Stack } from "@mui/material";
import { useNav } from "@hooks/useNavlHook";
import { INVENTORY_VENDOR_LIST, INVENTORY_VENDOR_URL } from "../constant";
import { IStoreVendor } from "../interface";
import { ActiveStatusChip } from "@components/label/status.label";

export const VendorListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_INVENTORY, "vendor");
  const { edit } = useNav(INVENTORY_VENDOR_LIST);

  const columns = useMemo<GridColDef<IStoreVendor>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "email",
        headerName: t("fields.email"),
        sortable: true,
      },
      {
        field: "phone",
        headerName: t("fields.phone"),
        sortable: true,
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

  const { dataGridProps, setFilters } = useDataGrid<IStoreVendor, HttpError>({
    resource: INVENTORY_VENDOR_URL,
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
