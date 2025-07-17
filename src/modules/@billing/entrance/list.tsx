import { useUpdate, type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { RxCrossCircled } from "react-icons/rx";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { LANG_BILLING } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { Stack } from "@mui/material";
import { FiMinusCircle } from "react-icons/fi";
import { IBillEntrance } from "../interface";
import { DateTimeLabel } from "@components/label/date.label";
import { EntranceApplicationState } from "../components/common";
import { BillEntranceStateEnum, BILLING_ENTRANCE_URL } from "../constant";
import { CiReceipt } from "react-icons/ci";
import { BasicModal } from "@components/modal/basic.modal";
import { BillingView } from "./component/bill.view";
import { CheckCircle } from "@mui/icons-material";
import { useConfirm } from "@hooks/confirm.hook";

export const EntranceApplicationListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_BILLING, "entrance");
  const [applicationInvoice, setInvoice] = useState<string | null>(null)
  const { mutate } = useUpdate({
    resource: BILLING_ENTRANCE_URL,
  })

  const [confirm, ConfirmEle] = useConfirm({
    onConfirm: ({ id, state }) => {
      mutate({
        resource: BILLING_ENTRANCE_URL,
        id: id,
        values: {
          state: state
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
                title={t("actions.invoice")}
                sx={{
                  color: "text.secondary",
                }}
                onClick={() => setInvoice(row.form_invoice_id)}
              >
                <CiReceipt />
              </IconButton>
              <IconButton
                size="small"
                title={t("actions.withdraw")}
                sx={{
                  color: "#ffbc00",
                }}
                onClick={() => confirm({ id: row.id, state: BillEntranceStateEnum.Withdraw })}
              >
                <FiMinusCircle />
              </IconButton>
              <IconButton
                size="small"
                title={t("actions.approve")}
                sx={{
                  color: "green",
                }}
                onClick={() => confirm({ id: row.id, state: BillEntranceStateEnum.Accepted })}
              >
                <CheckCircle fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                title={t("actions.reject")}
                sx={{
                  color: "red",
                }}
                onClick={() => confirm({ id: row.id, state: BillEntranceStateEnum.Rejected })}
              >
                <RxCrossCircled />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, setInvoice, confirm]
  );

  const { dataGridProps, setFilters } = useDataGrid<IBillEntrance, HttpError>({
    resource: BILLING_ENTRANCE_URL,
    meta: {
      customQuery: {
        aclass: true,
        batch: true,
        state: [BillEntranceStateEnum.Pending, BillEntranceStateEnum.Withdraw, BillEntranceStateEnum.Rejected],
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
    {Boolean(applicationInvoice) && (
      <BasicModal
        open={true}
        onClose={() => setInvoice(null)}
        title={t("titles.billview")}
      >
        <BillingView billId={applicationInvoice!} />
      </BasicModal>
    )}
  </>;
};
