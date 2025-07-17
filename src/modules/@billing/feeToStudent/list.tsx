import { useDelete, type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_BILLING } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { useNav } from "@hooks/useNavlHook";
import { Stack } from "@mui/material";
import { BILLING_FEE_STUDENT_LIST, BILLING_FEE_STUDENT_URL } from "../constant";
import { IBillFeeStudent } from "../interface";
import { Delete } from "@mui/icons-material";
import { useConfirm } from "@hooks/confirm.hook";

export const FeeStudentListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_BILLING, "feeStudent");
  const { edit } = useNav(BILLING_FEE_STUDENT_LIST);
  const { mutate } = useDelete()
  const [confirmDelete, confirmEle] = useConfirm({
    onConfirm: (id) => {
      mutate({
        resource: BILLING_FEE_STUDENT_URL,
        id
      })
    }
  })
  const columns = useMemo<GridColDef<IBillFeeStudent>[]>(
    () => [
      {
        field: "student.class.name",
        headerName: t("fields.class"),
        sortable: true,
        width: 150,
        renderCell: function render({ row }) {
          return row.student?.class?.name
        }
      },
      {
        field: "student.regid",
        headerName: t("fields.regid"),
        sortable: true,
        width: 150,
        renderCell: function render({ row }) {
          return row.student?.regid
        }
      },
      {
        field: "student.full_name",
        headerName: t("fields.student"),
        sortable: true,
        renderCell: function render({ row }) {
          return row.student?.full_name
        }
      },
      {
        field: "fee.name",
        headerName: t("fields.fee"),
        sortable: true,
        renderCell: function render({ row }) {
          return row.fee?.name
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
                onClick={() => confirmDelete(row.id)}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, edit]
  );

  const { dataGridProps, setFilters } = useDataGrid<IBillFeeStudent, HttpError>({
    meta: {
      customQuery: {
        fee: true,
        student: true
      }
    },
    resource: BILLING_FEE_STUDENT_URL
  });


  useEffect(() => {
    setFilters([
      {
        field: "fee_name",
        value: search,
        operator: "eq",
      },
      {
        field: "student_name",
        value: search,
        operator: "eq",
      },
      {
        field: "student_regid",
        value: search,
        operator: "eq",
      },
      {
        field: "class_name",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return <>
    <TableGrid {...dataGridProps} columns={columns} />
    {confirmEle}
  </>;
};
