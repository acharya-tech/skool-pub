import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_EMPLOYEE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNav } from "@hooks/useNavlHook";
import { IStaff } from "../interface";
import { TableListProp } from "src/interfaces";
import { IconButton, Stack, Typography } from "@mui/material";
import { HttpError } from "@refinedev/core";
import { EMPLOYEE_STAFF_LIST } from "../constant";
import { ActiveStatusChip } from "@components/label/status.label";

export const StaffListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_EMPLOYEE, "staff");
  const { edit, show } = useNav(EMPLOYEE_STAFF_LIST);

  const columns = useMemo<GridColDef<IStaff>[]>(
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
        field: "address1",
        headerName: t("fields.address"),
        sortable: true,
      },
      {
        field: "post.name",
        headerName: t("fields.post"),
        sortable: true,
        renderCell: function render({ row }) {
          return <Typography>{row.post?.name}-{row.post?.level}</Typography>;
        },
      },
      {
        field: "status",
        headerName: t("fields.status"),
        sortable: true,
        renderCell: function render({ row }) {
          return <ActiveStatusChip status={row.status} />
        },
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

  const { dataGridProps, setFilters } = useDataGrid<IStaff, HttpError>({
    meta: { customQuery: { post: true } },
  });

  useEffect(() => {
    setFilters([
      {
        field: "name",
        operator: "eq",
        value: search,
      },
      {
        field: "email",
        operator: "eq",
        value: search,
      },
      {
        field: "phone",
        operator: "eq",
        value: search,
      },
      {
        field: "address1",
        operator: "eq",
        value: search,
      },
    ]);
  }, [search]);

  return <TableGrid {...dataGridProps} columns={columns} />;
};
