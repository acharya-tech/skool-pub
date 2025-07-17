import { useInvalidate, useUpdate, type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_BILLING } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { Stack } from "@mui/material";
import { DateTimeLabel } from "@components/label/date.label";
import { CheckCircle, Edit } from "@mui/icons-material";
import { BillEntranceStateEnum, BILLING_ENTRANCE_URL } from "@billing/constant";
import { IBillEntrance } from "@billing/interface";
import { EntranceApplicationState } from "@billing/components/common";
import { useNav } from "@hooks/useNavlHook";
import { STUDENT_ADMISSION_ADD_STUDENT_URL, STUDENT_ADMISSION_LIST, STUDENT_ADMISSION_URL } from "../constant";
import { useConfirm } from "@hooks/confirm.hook";

export const AdmissionListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_BILLING, "entrance");
  const { edit } = useNav(STUDENT_ADMISSION_LIST)

  const { mutate } = useUpdate({
    resource: STUDENT_ADMISSION_ADD_STUDENT_URL,
  })
  const invalidate = useInvalidate()

  const [confirm, ConfirmEle] = useConfirm({
    onConfirm: ({ id, state }) => {
      console.log(id)
      mutate({
        resource: STUDENT_ADMISSION_ADD_STUDENT_URL,
        id: id,
        values: { state }
      }, {
        onSuccess: () => {
          invalidate({
            resource: STUDENT_ADMISSION_URL,
            invalidates: ['list']
          })
        }
      })
    }
  })

  const columns = useMemo<GridColDef<IBillEntrance>[]>(
    () => [
      {
        field: "created_at",
        headerName: t("fields.date"),
        sortable: true,
        width: 200,
        renderCell: ({ row }) => {
          return <DateTimeLabel date={row.created_at} />
        },
      },
      {
        field: "form_no",
        headerName: t("fields.form_no"),
        width: 100,
        sortable: true,
      },
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "phone",
        headerName: t("fields.phone"),
        sortable: true,
        width: 150,
      },
      {
        field: "class.name",
        headerName: t("fields.class"),
        sortable: true,
        width: 150,
        renderCell: ({ row }) => {
          return row?.aclass?.name
        }
      },
      {
        field: "batch.name",
        headerName: t("fields.batch"),
        sortable: true,
        width: 100,
        renderCell: ({ row }) => {
          return row?.batch?.name
        }
      },
      {
        field: "state",
        headerName: t("fields.state"),
        sortable: true,
        width: 100,
        renderCell: ({ row }) => {
          return <EntranceApplicationState state={row.state} />
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
                title={t("actions.edit")}
                onClick={() => edit(row.id)}
              >
                <Edit />
              </IconButton>
              {row.state === BillEntranceStateEnum.Admitted && (
                <IconButton
                  size="small"
                  title={t("actions.accept")}
                  sx={{
                    color: "green",
                  }}
                  onClick={() => confirm({ id: row.id, state: BillEntranceStateEnum.Completed })}
                >
                  <CheckCircle fontSize="small" />
                </IconButton>
              )}
            </Stack>
          );
        },
      },
    ],
    [t, edit]
  );

  const { dataGridProps, setFilters } = useDataGrid<IBillEntrance, HttpError>({
    resource: BILLING_ENTRANCE_URL,
    meta: {
      customQuery: {
        aclass: true,
        batch: true,
        // state: [BillEntranceStateEnum.Admitted, BillEntranceStateEnum.Completed],
      }
    }
  });

  useEffect(() => {
    setFilters([
      {
        field: "name",
        value: search,
        operator: "eq",
      },
      {
        field: "form_no",
        value: search,
        operator: "eq",
      },
      {
        field: "phone",
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
    {ConfirmEle}
  </>
};
