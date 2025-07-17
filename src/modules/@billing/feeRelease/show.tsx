import { useOne, useUpdate, type HttpError } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { LANG_BILLING } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { IBillFeeRelease, IBillFeeReleaseMeta } from "../interface";
import { BILLING_FEE_RELEASE_META_URL, BILLING_FEE_RELEASE_URL } from "../constant/server.urls";
import { StatusEnum } from "@common/all.enum";
import { useConfirm } from "@hooks/confirm.hook";
import { FaRegCheckCircle } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { CardHeader } from "@mui/material";
import { CSSearch } from "@components/input";
import { useParams } from "react-router-dom";
import { ActiveStatusChip } from "@components/label/status.label";
import { ReleaseView } from "./components/release.view";
export const FeeReleaseView = () => {
  const t = useTranslate(LANG_BILLING, "feeRelease");
  const { id } = useParams()
  const { data, isLoading } = useOne<IBillFeeRelease>({
    resource: BILLING_FEE_RELEASE_URL,
    id: id,
    meta: {
      customQuery: {
        createdBy: true,
        aclass: true,
        accountYear: true
      }
    }
  })
  const feeRelease = data?.data
  const [search, setSearch] = useState<string>("")
  const { mutate } = useUpdate()
  const [confirmInactive, ConfirmInactiveEle] = useConfirm({
    onConfirm: (releaseMeta: IBillFeeReleaseMeta) => {
      mutate({
        resource: BILLING_FEE_RELEASE_META_URL,
        id: releaseMeta.id,
        values: {
          status: releaseMeta.status == StatusEnum.Active ? StatusEnum.Inactive : StatusEnum.Active
        }
      })
    },
  })

  const columns = useMemo<GridColDef<IBillFeeReleaseMeta>[]>(
    () => [
      {
        field: "student.regid",
        headerName: t("fields.regid"),
        sortable: true,
        width: 100,
        renderCell: function render({ row }) {
          return <Typography>{row.student.regid}</Typography>
        }
      },
      {
        field: "student.roll_no",
        headerName: t("fields.roll_no"),
        sortable: true,
        width: 100,
        renderCell: function render({ row }) {
          return <Typography>{row.student.roll_no}</Typography>
        }
      },
      {
        field: "student.full_name",
        headerName: t("fields.name"),
        sortable: true,
        renderCell: function render({ row }) {
          return <Typography>{row.student.full_name}{" - "}<Typography variant="caption">{row.remark}</Typography></Typography>
        }
      },
      {
        field: "amount",
        headerName: t("fields.amount"),
        sortable: true,
        width: 100
      },
      {
        field: "status",
        headerName: t("fields.status"),
        sortable: true,
        width: 100,
        renderCell: function render({ row }) {
          return <ActiveStatusChip status={row.status} key={row.id} />
        }
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return (
            <Stack direction="row" >
              <IconButton
                sx={{
                  color: row.status == StatusEnum.Active ? "red" : "green",
                }}
                onClick={() => confirmInactive(row)}
              >
                {row.status == StatusEnum.Active ? <ImCancelCircle fontSize="small" /> : <FaRegCheckCircle fontSize={"small"} />}
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, confirmInactive]
  );

  const { dataGridProps, setFilters } = useDataGrid<IBillFeeReleaseMeta, HttpError>({
    meta: {
      customQuery: { release_id: feeRelease?.id, student: true }
    },
    resource: BILLING_FEE_RELEASE_META_URL,
    queryOptions: {
      enabled: !!feeRelease
    }
  });

  useEffect(() => {
    setFilters([
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
        field: "student_roll_no",
        value: search,
        operator: "eq",
      },
      {
        field: "dr_cr",
        value: search,
        operator: "eq",
      }
    ]);
  }, [search]);

  return (
    <Box>
      <Card>
        <CardHeader
          title={t("titles.show")}
        />
        <CardContent>
          <ReleaseView feeRelease={feeRelease} isLoading={isLoading} />
        </CardContent>
      </Card>
      <Divider sx={{ my: 2 }} />
      <Card>
        <CardHeader
          title={t("titles.student_list")}
          action={
            <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />
          }
        />
        <CardContent>
          <TableGrid
            {...dataGridProps}
            columns={columns}
            getRowClassName={({ row }) => {
              if (row.status === StatusEnum.Inactive) {
                return "error-row"
              }
              return ""
            }}
          />
        </CardContent>
      </Card>
      {ConfirmInactiveEle}
    </Box>
  );
};
