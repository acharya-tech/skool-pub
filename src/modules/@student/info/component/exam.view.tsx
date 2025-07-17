import {
  type HttpError,
} from "@refinedev/core";

import { IExmResult } from "@exam/interface";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { LANG_EXAM } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { Box,Divider,Typography } from "@mui/material";
import { StatusEnum } from "@common/all.enum";
import { Visibility } from "@mui/icons-material";
import { Nullable } from "src/interfaces";
import { EXAM_RESULT_URL } from "@exam/constant/service.urls";
import { ViewResult } from "@exam/result/sheet";
type StudentResultListProps = {
    student_id?:string
}
export const StudentResultList = ({ student_id}:StudentResultListProps) => {
  const t = useTranslate(LANG_EXAM, "result");

  const [openResult, setOpenResult] = useState<IExmResult|null>(null);

  const columns = useMemo<GridColDef<IExmResult>[]>(
    () => [
      {
        field: "metadata.rank",
        headerName: t("fields.rank"),
        sortable: true,
        renderCell: function render({ row }) {
          return <Typography>{row.metadata.grade_rank ?? "##"}</Typography>
        }
      },
      {
        field: "metadata.certificate_no",
        headerName: t("fields.certificate_no"),
        sortable: true,
        renderCell: function render({ row }) {
          return <Typography>{row.metadata.certificate_no}</Typography>
        }
      },
      {
        field: "metadata.cgpa",
        headerName: t("fields.cgpa"),
        sortable: true,
        renderCell: function render({ row }) {
          return <Typography>{row.metadata.cgpa}</Typography>
        }
      },
      {
        field: "metadata.passed_failed",
        headerName: t("fields.result"),
        sortable: true,
        renderCell: function render({ row }) {
          return <Typography>{row.metadata.passed_failed}</Typography>
        }
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return (
            <IconButton
              sx={{
                color: "text.secondary",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenResult(row)
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          );
        },
      },
    ],
    [t],
  );

  const { dataGridProps, setFilters } = useDataGrid<IExmResult, HttpError, Nullable<IExmResult>>({
    meta: {
      customQuery: {
        version: true,
        version_status: StatusEnum.Active,
        student_id
      }
    },
    resource: EXAM_RESULT_URL,
    queryOptions: {
      enabled: !!student_id
    },
  });

  return <Box m={2}>
    <Typography variant="h5">{t("titles.list")}</Typography>
    <Divider sx={{ my: 2 }}/>
    <TableGrid
      rowCount={dataGridProps.rowCount}
      rows={student_id ? dataGridProps.rows : []}
      columns={columns}
      paginationMode="client"
      filterMode="client"
      sortingMode="client"
    />
    {Boolean(openResult) && (
      <ViewResult onClose={() => setOpenResult(null)} title={t("titles.viewResult")} results={[openResult!]} version={openResult?.version!} />
    )}
  </Box>
};
