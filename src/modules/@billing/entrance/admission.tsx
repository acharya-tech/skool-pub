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
import { Box, Stack, Typography } from "@mui/material";
import { IBillEntrance } from "../interface";
import { DateTimeLabel } from "@components/label/date.label";
import { EntranceApplicationState } from "../components/common";
import { BillEntranceStateEnum, BILLING_ENTRANCE_URL } from "../constant";
import { useConfirm } from "@hooks/confirm.hook";
import { GoPlusCircle } from "react-icons/go";
import { BasicModal } from "@components/modal/basic.modal";
import { CheckCircle, CloseOutlined } from "@mui/icons-material";
import { FeeReceive } from "./component/fee.receive";
import { InvoiceView } from "../feeReceive/components/invoice.view";

export const EntranceAdmissionListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_BILLING, "entrance");
  const [selectedForm, setSelectedForm] = useState<IBillEntrance | null>(null)
  const [invoiceId, setInvoiceId] = useState<string | null>(null)
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
                title={t("actions.admit")}
                sx={{
                  color: "green",
                }}
                onClick={() => setSelectedForm(row)}
              >
                <GoPlusCircle />
              </IconButton>
              <IconButton
                size="small"
                title={row.state === BillEntranceStateEnum.Accepted ? t("actions.cancel") : t("actions.accept")}
                sx={{
                  color: row.state === BillEntranceStateEnum.Accepted ? "red" : "green",
                }}
                onClick={() => confirm({ id: row.id, state: row.state === BillEntranceStateEnum.Accepted ? BillEntranceStateEnum.Canceled : BillEntranceStateEnum.Accepted })}
              >
                {row.state === BillEntranceStateEnum.Accepted ? <RxCrossCircled /> : <CheckCircle fontSize="small" />}
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, setSelectedForm]
  );

  const { dataGridProps, setFilters } = useDataGrid<IBillEntrance, HttpError>({
    resource: BILLING_ENTRANCE_URL,
    meta: {
      customQuery: {
        aclass: true,
        batch: true,
        state: [BillEntranceStateEnum.Accepted, BillEntranceStateEnum.Canceled],
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
    {selectedForm && (
      <BasicModal
        onClose={() => { setSelectedForm(null); setInvoiceId(null) }}
        open={true}
        size={"xl"}
        sx={{

          "& .MuiDialog-paper": {
            width: "100%",
            height: "100%",
            margin: 0,
            maxHeight: "100vh",
            maxWidth: "100vw",
            borderRadius: 0,
            backgroundColor: "#eee",
          },
          "& .MuiDialogContent-root": {
            p: 0
          },
          "& .MuiDialog-container": {
            alignItems: "flex-start",
          }
        }}
      >
        <Box>
          <Stack sx={{ backgroundColor: "#fff", p: 1 }} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="h6" color={"blue"}>{t("titles.feeReceive")}</Typography>
            <Stack direction={"row"}>
              <IconButton size="small" onClick={() => {
                setSelectedForm(null)
                setInvoiceId(null)
              }}><CloseOutlined /></IconButton>
            </Stack>
          </Stack>
          {!invoiceId ? (
            <FeeReceive
              entrance={selectedForm}
              onClose={() => {
                setSelectedForm(null)
                setInvoiceId(null)
              }}
              onSuccess={(data) => {
                setInvoiceId(data.data.id)
              }}
            />
          ) : (
            <InvoiceView invoiceId={invoiceId} />
          )}
        </Box>
      </BasicModal>
    )}
  </>;
};
