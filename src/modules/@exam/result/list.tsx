import {
  useDataProvider,
  type HttpError,
} from "@refinedev/core";

import { IExmResult, IExmVersion } from "@exam/interface";
import { useTranslate } from "@hooks/useTranslate";
import { useAutocomplete, useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { LANG_EXAM } from "@common/constant";
import { EXAM_RESULT_LIST } from "../constant/local.urls";
import { TableGrid } from "@components/table/table.body";
import { Autocomplete, Box, Button, ButtonGroup, Grid2 as Grid, Stack, TextField, Typography } from "@mui/material";
import { StatusEnum } from "@common/all.enum";
import { Visibility } from "@mui/icons-material";
import { ViewResult } from "./sheet";
import { EXAM_RESULT_URL, EXAM_VERSION_URL } from "../constant/service.urls";
import { LabelData } from "@components/other/label.data";
import { ViewLedger } from "./ledger";
import { Nullable } from "src/interfaces";
export const ResultListTable = () => {
  const t = useTranslate(LANG_EXAM, "result");

  const [routineId, setRoutine] = useState<IExmVersion | null>(null);
  const [search, setSearch] = useState<string>("")
  const [resultList, setResultList] = useState<{ rows: IExmResult[], total: number }>({ rows: [], total: 0 })
  const [openLedger, setOpenLedger] = useState<"grade" | "mark" | null>(null)
  const [selectedList, setSelectedList] = useState<IExmResult[]>([])
  const [showList, setShowList] = useState<{ result: IExmResult[], open: boolean }>({ result: [], open: false });
  const { autocompleteProps: routineAutoProps } = useAutocomplete<IExmVersion>({
    resource: EXAM_VERSION_URL,
    meta: {
      customQuery: {
        status: StatusEnum.Active,
        batch: true,
        class: true,
        type: true,
        esubjects: true
      }
    },
    onSearch: (value: string) => {
      return [
        {
          field: "code",
          value: value,
          operator: "eq"
        },
        {
          field: "class_name",
          value: value,
          operator: "eq"
        },
        {
          field: "type_name",
          value: value,
          operator: "eq"
        }
      ]
    }
  });

  const dataProvider = useDataProvider();
  useEffect(() => {
    if (routineId) {
      dataProvider().getList<IExmResult>({
        resource: EXAM_RESULT_URL,
        meta: {
          customQuery: {
            version_status: StatusEnum.Active,
            version_id: routineId?.id
          }
        },
        pagination: {
          mode: "client",
        },
      }).then((res) => {
        setResultList({
          rows: res.data,
          total: res.total
        })
      })
    }
  }, [routineId])


  const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    setSelectedList(selectionModel.map((id) => resultList.rows.find((row) => row.id === id) as IExmResult));
  };


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
        field: "metadata.grade_remarks",
        headerName: t("fields.result"),
        sortable: true,
        renderCell: function render({ row }) {
          return <Typography>{row.metadata.grade_remarks}</Typography>
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
                })
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          );
        },
      },
    ],
    [],
  );

  return <Box>
    <Box>
      <Stack direction={"row"} width={"100%"} p={2}>
        <Autocomplete
          fullWidth
          {...routineAutoProps}
          onChange={(_, value) => {
            setRoutine(value);
          }}
          getOptionLabel={(option) => `${option.routine.code} | ${option.routine.type.name} | ${option.routine.class?.name} | ${option.routine.batch?.name}`}
          renderOption={(props, option) => (
            <li {...props} key={option.version_no}>
              {`${option.routine.code} | ${option.routine.type.name} | ${option.routine.class?.name} | ${option.routine.batch?.name}`}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("fields.routine")}
            />
          )}
        />
      </Stack>
      {routineId && (
        <Grid container p={2}>
          <Grid size={6}>
            <Grid container p={2} spacing={2}>
              <Grid size={4}>
                <LabelData label={t("labels.routine")} value={routineId?.routine.code} />
              </Grid>
              <Grid size={4}>
                <LabelData label={t("labels.batch")} value={routineId?.routine?.batch?.name!} />
              </Grid>
              <Grid size={4}>
                <LabelData label={t("labels.class")} value={routineId?.routine?.class?.name!} />
              </Grid>
              <Grid size={4}>
                <LabelData label={t("labels.term")} value={routineId?.routine?.type?.name!} />
              </Grid>
              <Grid size={4}>
                <LabelData label={t("labels.version")} value={routineId?.version_no} />
              </Grid>
              <Grid size={4}>
                <LabelData label={t("labels.passRatio")} value={`${routineId?.passed_student}/${routineId?.total_student}`} />
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
                  setOpenLedger("mark")
                }}
              >
                {t("labels.markLedger")}
              </Button>
              <Button
                variant="outlined"
                color="info"
                size="small"
                onClick={() => {
                  setOpenLedger("grade")
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
                  }))
                }}
              >
                {t("labels.resultSheet")}
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      )}
    </Box>
    <TableGrid
      rowCount={resultList.total}
      rows={resultList.rows}
      columns={columns}
      paginationMode="client"
      filterMode="client"
      sortingMode="client"
      checkboxSelection
      onRowSelectionModelChange={handleSelectionChange}
    />
    {showList.open && (
      <ViewResult onClose={() => setShowList({ ...showList, open: false })} title={t("titles.viewResult")} results={showList.result} version={routineId!} />
    )}
    {openLedger && (
      <ViewLedger title={t("titles.viewLedger")} type={openLedger} results={resultList.rows} version={routineId!} onClose={() => setOpenLedger(null)} />
    )}
  </Box>
};
