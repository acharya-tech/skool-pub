import {
  type HttpError,
} from "@refinedev/core";

import { IExmFinal, IExmFinalResult, IExmResult } from "@exam/interface";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { LANG_EXAM } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { Box, Button, ButtonGroup, Grid2 as Grid, Paper, Typography } from "@mui/material";
import { StatusEnum } from "@common/all.enum";
import { Visibility } from "@mui/icons-material";
import { ViewResult } from "./sheet";
import { LabelData } from "@components/other/label.data";
import { Nullable } from "src/interfaces";
import { useParams } from "react-router-dom";
import { EXAM_FINAL_RESULT_URL, EXAM_FINAL_URL } from "../constant/service.urls";
import { useRefineShow } from "@hooks/useShow";
export const FinalResultListTable = () => {
  const t = useTranslate(LANG_EXAM, "result");
  const { id: version_id } = useParams()
  const [search, setSearch] = useState<string>("")
  const [openLedger, setOpenLedger] = useState<boolean>(false)
  const [selectedList, setSelectedList] = useState<IExmFinalResult[]>([])
  const [showList, setShowList] = useState<{ result: IExmFinalResult[], open: boolean, type: "gradeSheet" | "markSheet" }>({ result: [], open: false, type: "gradeSheet" });
  const { query: { data, isLoading } } = useRefineShow<IExmFinal>({
    id: version_id,
    resource: EXAM_FINAL_URL,
    meta: {
      customQuery: {
        class: true,
        batch: true,
        template: true,
        status: StatusEnum.Active
      }
    }
  })
  const finalModal = data?.data

  const columns = useMemo<GridColDef<IExmFinalResult>[]>(
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
        field: "student_detail.student_fullname",
        headerName: t("fields.student"),
        sortable: true,
        renderCell: function render({ row }) {
          return <Typography>{row.student_detail.student_fullname}</Typography>
        }
      },
      {
        field: "student_detail.student_section",
        headerName: t("fields.section"),
        sortable: true,
        renderCell: function render({ row }) {
          return <Typography>{row.student_detail.student_section}</Typography>
        }
      },
      {
        field: "student_detail.student_rollno",
        headerName: t("fields.rollno"),
        sortable: true,
        renderCell: function render({ row }) {
          return <Typography>{row.student_detail.student_rollno}</Typography>
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
                setShowList({
                  result: [row],
                  open: true,
                  type: "gradeSheet"
                })
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
        status: StatusEnum.Active,
        version_id: version_id
      }
    },
    resource: EXAM_FINAL_RESULT_URL,
    queryOptions: {
      enabled: !!finalModal
    },
  });

  useEffect(() => {
    setFilters([

    ])
  }, [search])

  const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    setSelectedList(selectionModel.map((id) => dataGridProps.rows.find((row) => row.id === id) as IExmFinalResult));
  };


  return <Box>
    <Paper elevation={2} sx={{ mb: 2 }}>
      <Grid container p={2}>
        <Grid size={6}>
          <Grid container p={2} spacing={2}>
            <Grid size={4}>
              <LabelData label={t("labels.batch")} value={finalModal?.batch?.name} isLoading={isLoading} />
            </Grid>
            <Grid size={4}>
              <LabelData label={t("labels.class")} value={finalModal?.class?.name} isLoading={isLoading} />
            </Grid>
            <Grid size={4}>
              <LabelData label={t("labels.version")} value={finalModal?.version_no} isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={6} mt={2}>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button
              variant="outlined"
              color="info"
              size="small"
              onClick={() => {
                setOpenLedger(true)
              }}
            >
              {t("labels.markLedger")}
            </Button>
            <Button
              variant="outlined"
              color="info"
              size="small"
              onClick={() => {
                setOpenLedger(true)
              }}
            >
              {t("labels.gradeLedger")}
            </Button>
            <Button
              variant="outlined"
              color="info"
              size="small"
              disabled={selectedList.length == 0}
              onClick={() => {
                setShowList((pre) => ({
                  result: selectedList,
                  open: true,
                  type: "markSheet"
                }))
              }}
            >
              {t("labels.markSheet")}
            </Button>
            <Button
              variant="outlined"
              color="info"
              size="small"
              disabled={selectedList.length == 0}
              onClick={() => {
                setShowList((pre) => ({
                  result: selectedList,
                  open: true,
                  type: "gradeSheet"
                }))
              }}
            >
              {t("labels.gradeSheet")}
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Paper>
    <TableGrid
      rowCount={dataGridProps.rowCount}
      rows={dataGridProps.rows ?? []}
      columns={columns}
      paginationMode="client"
      filterMode="client"
      sortingMode="client"
      checkboxSelection
      onRowSelectionModelChange={handleSelectionChange}
    />
    {showList.open && (
      <ViewResult template={finalModal?.template!} onClose={() => setShowList({ ...showList, open: false })} title={t("titles.viewResult")} results={showList.result} />
    )}
    {/* {openLedger && (
      <ViewLedger title={t("titles.viewLedger")} results={dataGridProps.rows as IExmResult[]} version={routineId!} onClose={() => setOpenLedger(false)} />
    )} */}
  </Box>
};
