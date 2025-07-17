import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_ACCOUNT } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { useNav } from "@hooks/useNavlHook";
import { Stack } from "@mui/material";
import { ACCOUNT_PAYROLL_SETTING_LIST } from "../constant/urls";
import { IPayrollSetting } from "../interface";
import { ACCOUNT_PAYROLL_SETTING_URL } from "../constant/server.urls";

export const PayrollSettingListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_ACCOUNT, "payrollSetting");
  const { edit } = useNav(ACCOUNT_PAYROLL_SETTING_LIST);

  const columns = useMemo<GridColDef<IPayrollSetting>[]>(
    () => [
      {
        field: "ledger.name",
        headerName: t("fields.ledger"),
        sortable: true,
        renderCell: ({ row }) => {
          return row?.ledger?.name
        }
      },
      {
        field: "max_amount",
        headerName: t("fields.max_amount"),
        sortable: true,
        width: 200,
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

  const { dataGridProps, setFilters } = useDataGrid<IPayrollSetting, HttpError>({
    resource: ACCOUNT_PAYROLL_SETTING_URL,
    meta: {
      customQuery: {
        ledger: true
      }
    }
  });

  useEffect(() => {
    setFilters([
      {
        field: "ledger.name",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return <>
    <TableGrid {...dataGridProps} columns={columns} />
  </>;
};
