import {
  useUpdate,
  type HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_BILLING } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { BILLING_FEE_RELEASE_LIST, BILLING_FEE_RELEASE_URL } from "../constant";
import { TableListProp } from "src/interfaces";
import { Stack } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { IBillFeeRelease } from "../interface";
import { DateTimeLabel } from "@components/label/date.label";
import { ActiveStatusChip } from "@components/label/status.label";
import { useConfirm } from "@hooks/confirm.hook";
import { StatusEnum } from "@common/all.enum";
import { ImCancelCircle } from "react-icons/im";
import { FaRegCheckCircle } from "react-icons/fa";
export const FeeReleaseTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_BILLING, "feeRelease");
  const { edit, show } = useNav(BILLING_FEE_RELEASE_LIST);
  const { mutate } = useUpdate()
  const [confirmStatus, ConfirmStatusEle] = useConfirm({
    onConfirm: (releaseMeta: IBillFeeRelease) => {
      mutate({
        resource: BILLING_FEE_RELEASE_URL,
        id: releaseMeta.id,
        values: {
          status: releaseMeta.status == StatusEnum.Active ? StatusEnum.Inactive : StatusEnum.Active
        }
      })
    },
  })
  const columns = useMemo<GridColDef<IBillFeeRelease>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "program_name",
        headerName: t("fields.program"),
        sortable: false,
        width: 150,
        renderCell: function render({ row }) {
          return row.class?.program?.name
        }
      },
      {
        field: "class_name",
        headerName: t("fields.class"),
        sortable: false,
        width: 150,
        renderCell: function render({ row }) {
          return row.class?.name
        }
      },

      {
        field: "release_date",
        headerName: t("fields.release_date"),
        sortable: true,
        width: 150,
        renderCell: function render({ row }) {
          return <DateTimeLabel date={row.release_date} />
        }
      },
      {
        field: "total_post",
        headerName: t("fields.total_post"),
        sortable: true,
        width: 100,
      },
      {
        field: "avg_amount",
        headerName: t("fields.avg_amount"),
        sortable: true,
        width: 100,
      },
      {
        field: "total_amount",
        headerName: t("fields.total_amount"),
        sortable: true,
        width: 100,
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
                sx={{
                  color: "text.secondary",
                }}
                onClick={() => show(row.id)}
              >
                <Visibility />
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
    [t, edit, show],
  );

  const { dataGridProps, setFilters } = useDataGrid<IBillFeeRelease, HttpError>({
    resource: BILLING_FEE_RELEASE_URL,
    meta: { customQuery: { aclass: true } }
  });

  useEffect(() => {
    setFilters([
      {
        field: "name",
        value: search,
        operator: "eq",
      },
      {
        field: "program_name",
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

  return <><TableGrid
    {...dataGridProps}
    columns={columns}
  />
    {ConfirmStatusEle}
  </>

};