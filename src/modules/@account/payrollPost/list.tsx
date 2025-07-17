import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_ACCOUNT, LANG_EMPLOYEE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { HttpError } from "@refinedev/core";
import { IStaff } from "@employee/interface";
import { EMPLOYEE_STAFF_URL } from "@employee/constant";
import { Visibility } from "@mui/icons-material";
import { IAccountPayrollPostListMap } from "../interface";
import { fNumber } from "@utils/format-number";
import { FaCheck } from "react-icons/fa6";
import { AccounPayrollTypeEnum } from "../constant/enum";
import { useNav } from "@hooks/useNavlHook";
import { ACCOUNT_PAYROLL_EMPLOYEE_LIST } from "../constant/urls";
import { StatusEnum } from "@common/all.enum";

type PayrollPostListTableProps = {
  setSelectedList: any
  preReleased: IAccountPayrollPostListMap
} & TableListProp

export const PayrollPostListTable = ({ search, setSelectedList, preReleased }: PayrollPostListTableProps) => {
  const t = useTranslate(LANG_ACCOUNT, "payrollPost");
  const { show } = useNav(ACCOUNT_PAYROLL_EMPLOYEE_LIST)
  const columns = useMemo<GridColDef<IStaff>[]>(
    () => [
      {
        field: "emp_code",
        headerName: t("fields.code"),
        width: 120,
        sortable: true,
      },
      {
        field: "name",
        headerName: t("fields.name"),
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
        field: "dr_amount",
        headerName: t("fields.dr_amount"),
        disableColumnMenu: true,
        type: "number",
        sortable: false,
        renderCell: function render({ row }) {
          const empList = preReleased.get(row.id) ?? []
          const hasPosted = empList.some(e => e.type == AccounPayrollTypeEnum.Plus && e.amount == row.salaryMeta?.plus_amount)
          return <Typography sx={{ color: hasPosted ? "success.main" : "InfoText" }}>{fNumber(row.salaryMeta?.plus_amount ?? 0)}</Typography>
        }
      },
      {
        field: "cr_amount",
        headerName: t("fields.cr_amount"),
        sortable: false,
        type: "number",
        disableColumnMenu: true,
        renderCell: function render({ row }) {
          const empList = preReleased.get(row.id) ?? []
          const hasPosted = empList.some(e => e.type == AccounPayrollTypeEnum.Minus && e.amount == row.salaryMeta?.minus_amount)
          return <Typography sx={{ color: hasPosted ? "success.main" : "InfoText" }}>{fNumber(row.salaryMeta?.minus_amount ?? 0)}</Typography>
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
                <Visibility fontSize="small" />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, preReleased]
  );

  const { dataGridProps, setFilters } = useDataGrid<IStaff, HttpError>({
    resource: EMPLOYEE_STAFF_URL,
    meta: { customQuery: { post: true, status: StatusEnum.Active } },
  });

  const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    setSelectedList(selectionModel.map((id) => dataGridProps.rows.find((row) => row.id === id) as IStaff));
  };

  useEffect(() => {
    setFilters([
      {
        field: "name",
        operator: "eq",
        value: search,
      },
    ]);
  }, [search]);

  return <TableGrid
    {...dataGridProps}
    columns={columns}
    checkboxSelection
    onRowSelectionModelChange={handleSelectionChange}
  />;
};
