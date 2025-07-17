import { useDelete, type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { LANG_BILLING } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { Box, Button, Card, CardContent, CardHeader, Grid2 as Grid, Stack } from "@mui/material";
import { BILLING_SCHOLAR_PERCENT_URL } from "../constant";
import { IBillScholarPercentbase, IBillScholarPostbase } from "../interface";
import { Delete, EditOutlined } from "@mui/icons-material";
import { DateLabel } from "@components/label/date.label";
import StudentDetails from "./studentdetail.view";
import { useParams } from "react-router-dom";
import { ActiveStatusChip } from "@components/label/status.label";
import { useConfirm } from "@hooks/confirm.hook";
import { BasicModal } from "@components/modal/basic.modal";
import { ScholarPercentForm } from "./_form";
import { CSSearch } from "@components/input";
import { STUDENT_INFO_URL } from "@student/constant";
import { IStudentInfo } from "@student/interface";
import { useRefineShow } from "@hooks/useShow";
type CreateEditTypes = {
  type: "create" | "edit",
  id?: string
}
export const ScholarPercentView = () => {
  const t = useTranslate(LANG_BILLING, "scholarPercent");
  const [createEdit, setCreateEdit] = useState<CreateEditTypes | null>(null)
  const [search, setSearch] = useState<string>("")
  const { id: studentId } = useParams()
  const { mutate } = useDelete()
  const [confirmDelete, confirmEle] = useConfirm({
    onConfirm: (id) => {
      mutate({
        resource: BILLING_SCHOLAR_PERCENT_URL,
        id
      })
    }
  })
  const columns = useMemo<GridColDef<IBillScholarPercentbase>[]>(
    () => [
      {
        field: "scholar.name",
        headerName: t("fields.scholar"),
        sortable: true,
        renderCell: function render({ row }) {
          return row?.scholar?.name
        }
      },
      {
        field: "percent",
        headerName: t("fields.percent"),
        sortable: true,
        width: 100,
        renderCell: function render({ row }) {
          return `${row.percent}%`
        }
      },
      {
        field: "created_by",
        headerName: t("fields.created_by"),
        sortable: true,
        renderCell: function render({ row }) {
          return row?.createdBy?.name
        }
      },
      {
        field: "created_at",
        headerName: t("fields.created_at"),
        sortable: true,
        width: 100,
        renderCell: function render({ row }) {
          return <DateLabel date={row.created_at} />
        }
      },
      {
        field: "end_date",
        headerName: t("fields.end_date"),
        sortable: true,
        width: 100,
        renderCell: function render({ row }) {
          return <DateLabel date={row.end_date} />
        }
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
                onClick={() => setCreateEdit({ type: "edit", id: row.id })}
              >
                <EditOutlined fontSize="small" />
              </IconButton>
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
    [t, setCreateEdit]
  );

  const { dataGridProps, setFilters } = useDataGrid<IBillScholarPostbase, HttpError>({
    meta: {
      customQuery: {
        scholar: true,
        createdBy: true,
        student_id: studentId,
      }
    },
    resource: BILLING_SCHOLAR_PERCENT_URL,
  });


  useEffect(() => {
    setFilters([
      {
        field: "scholar_name",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  const { query: { data, isLoading }, } = useRefineShow<IStudentInfo>({
    meta: { customQuery: { image: true, class: true, section: true, batch: true } },
    resource: STUDENT_INFO_URL,
    id: studentId
  });
  const record = data?.data;

  return <Box>
    <Grid container spacing={2}>
      <Grid size={9}>
        <Card>
          <CardHeader
            title={t("titles.list")}
            action={
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />
                <Button
                  variant="contained"
                  color="inherit"
                  key="create"
                  size="small"
                  onClick={() => {
                    setCreateEdit({ type: "create" })
                  }}
                >
                  {t("actions.addMore")}
                </Button>
              </Stack>
            }
          />
          <CardContent>
            <TableGrid {...dataGridProps} columns={columns} />
          </CardContent>
        </Card>
      </Grid>
      <Grid size={3}>
        <StudentDetails record={record} />
      </Grid>
    </Grid>
    {createEdit && (
      <BasicModal
        open
        onClose={() => { setCreateEdit(null) }}
      >
        <ScholarPercentForm
          id={createEdit.id}
          action={createEdit.type}
          defaultValues={{ student: record }}
          onClose={() => setCreateEdit(null)}
        />
      </BasicModal>
    )}

    {confirmEle}
  </Box>
};
