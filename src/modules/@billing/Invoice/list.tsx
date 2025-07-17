import { useUpdate, type HttpError } from "@refinedev/core";

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
import { BILLING_INVOICE_LIST, BILLING_INVOICE_URL } from "../constant";
import { IBillInvoice } from "../interface";
import { DateTimeLabel } from "@components/label/date.label";
import { ActiveStatusChip } from "@components/label/status.label";
import { Visibility } from "@mui/icons-material";
import { useConfirm } from "@hooks/confirm.hook";
import { StatusEnum } from "@common/all.enum";
import { ImCancelCircle } from "react-icons/im";
import { FaRegCheckCircle } from "react-icons/fa";

export const InvoiceListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_BILLING, "invoice");
  const { show } = useNav(BILLING_INVOICE_LIST);
  const { mutate } = useUpdate()
  const [confirmStatus, ConfirmStatusEle] = useConfirm({
    onConfirm: (invoice: IBillInvoice) => {
      mutate({
        resource: BILLING_INVOICE_URL,
        id: invoice.id,
        values: {
          status: invoice.status == StatusEnum.Active ? StatusEnum.Inactive : StatusEnum.Active
        }
      })
    },
  })
  const columns = useMemo<GridColDef<IBillInvoice>[]>(
    () => [
      {
        field: "bill_no",
        headerName: t("fields.bill_no"),
        sortable: true,
        width: 100,
      },
      {
        field: "bill_date",
        headerName: t("fields.bill_date"),
        sortable: true,
        width: 200,
        renderCell: function render({ row }) {
          return <DateTimeLabel date={row.bill_date} />
        }
      },
      {
        field: "customer_name",
        headerName: t("fields.customer_name"),
        sortable: true,
      },
      {
        field: "created_name",
        headerName: t("fields.created_by"),
        renderCell: function render({ row }) {
          return row.createdBy?.name
        }
      },
      {
        field: "total_amount",
        headerName: t("fields.total_amount"),
        width: 120,
        align: "right",
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
                onClick={() => show(row.id)}
              >
                <Visibility fontSize="small" />
              </IconButton>
              <IconButton
                sx={{
                  color: "text.secondary",
                }}
                onClick={() => confirmStatus(row)}
              >
                {row.status == StatusEnum.Active ? <ImCancelCircle fontSize="small" color="red" /> : <FaRegCheckCircle fontSize={"small"} color="green" />}
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, show]
  );

  const { dataGridProps, setFilters } = useDataGrid<IBillInvoice, HttpError>({
    resource: BILLING_INVOICE_URL,
    meta: {
      customQuery: {
        createdBy: true
      }
    }
  });

  useEffect(() => {
    setFilters([
      {
        field: "customer_name",
        value: search,
        operator: "eq",
      },
      {
        field: "created_name",
        value: search,
        operator: "eq",
      },
      {
        field: "bill_no",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return <>
    <TableGrid {...dataGridProps} columns={columns} />
    {ConfirmStatusEle}
  </>;
};
