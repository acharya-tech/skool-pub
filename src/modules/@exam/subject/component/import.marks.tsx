import { Box, Button, Divider, Input, Stack, Typography } from "@mui/material";
import { ExamMarkCasType, IExmSubject, IGradingRules, MarkListItem } from "../../interface";
import { TableGrid } from "@components/table/table.body";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useExcelGrid } from "@hooks/useExcelGrid";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_EXAM } from "@common/constant";
import { BasicModal } from "@components/modal/basic.modal";
import { RiFileExcel2Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { MarkExcelFildMapColumns, MarkImportExcelColumns } from "../../constant/enum";
import IconButton from '@mui/material/IconButton';
import { DeleteOutline } from '@mui/icons-material';
import { YesNoEnum } from "@common/all.enum";
import { useMarkStore } from "../utils/mark.store";
import { setImportValidMark } from "../utils/mark.list";

type ImportMarksProps = {
  marks: MarkListItem[]
  inputColumn: ExamMarkCasType
  close: () => void
  open: boolean,
  subject: IExmSubject
  addImport: (marks: Record<number, MarkListItem>) => void
};
export const ImportMarks = ({ inputColumn, marks, open, close, addImport }: ImportMarksProps) => {
  const gradingRule = useMarkStore(state => state.gradingRules)
  const t = useTranslate(LANG_EXAM, "marks");
  const { columns, rows, onFileChange, isLoading, reset, setColumns, setRows } = useExcelGrid()
  const [hasError, setHasError] = useState<string>()
  const [regidList, setRegidList] = useState<string[]>([])
  const regidField = MarkImportExcelColumns.REGID
  useEffect(() => {
    if (rows.length > 0) {
      const fields = columns.map(col => col.headerName)
      const missingColumnList = []

      !fields.includes(MarkImportExcelColumns.REGID) && missingColumnList.push(MarkImportExcelColumns.REGID)
      const mappedKeys: any = {}
      Object.keys(MarkExcelFildMapColumns).forEach((key: any) => {
        // @ts-ignore
        mappedKeys[MarkExcelFildMapColumns[key]] = key
      })
      Object.keys(inputColumn ?? {}).forEach((key: any) => {
        !fields.includes(mappedKeys[key]) && missingColumnList.push(mappedKeys[key])
      })
      if (missingColumnList.length > 0) {
        setHasError(t("errors.excelMissingField", { field: missingColumnList.join(", ") }))
        return
      }

      const regidList = marks.map(mark => {
        return mark.student_regid.trim()
      })
      const hasError = rows.map((row: any) => {
        return typeof row[regidField] === "string" ? row[regidField].trim() : row[regidField]
      }).reduce((acc: string[], regid: string) => {
        if (!regidList.includes(regid)) {
          acc.push(regid)
        }
        return acc
      }, [] as string[])
      if (hasError.length > 0) {
        setHasError(t("errors.excelInvalidRows"))
      } else {
        setHasError(undefined)
      }
      setRegidList(regidList)

      const action = columns.find(col => col.field == 'action')
      const isAbsentIndex = columns.findIndex(col => col.field == MarkImportExcelColumns.ABSENT)
      if (isAbsentIndex > -1) {
        columns[isAbsentIndex] = {
          ...columns[isAbsentIndex],
          renderCell: ({ row }) => {
            return row[MarkImportExcelColumns.ABSENT] == "1" ? YesNoEnum.Yes : YesNoEnum.No
          }
        }
      }
      if (!action) {
        setColumns(columns => {
          return [
            ...columns,
            {
              field: "action",
              headerName: t("@table.actions"),
              width: 100,
              renderCell: ({ row }) => {
                return (
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => {
                      setRows((rows: any) => {
                        return rows.filter((e: any) => e[regidField] != row[regidField])
                      })
                    }}
                  >
                    <DeleteOutline />
                  </IconButton>
                )
              }
            }]
        })
      }
    }
  }, [rows])


  const handleImport = () => {
    const fields = columns.map(col => col.headerName)
    let fildMap: Record<string, string> = {}
    if (fields.includes(MarkImportExcelColumns.THEORY)) {
      fildMap[MarkImportExcelColumns.THEORY] = MarkExcelFildMapColumns.THEORY
    }
    if (fields.includes(MarkImportExcelColumns.INTERNAL)) {
      fildMap[MarkImportExcelColumns.INTERNAL] = MarkExcelFildMapColumns.INTERNAL
    }
    if (fields.includes(MarkImportExcelColumns.ENGAGE)) {
      fildMap[MarkImportExcelColumns.ENGAGE] = MarkExcelFildMapColumns.ENGAGE
    }
    if (fields.includes(MarkImportExcelColumns.PROJECT)) {
      fildMap[MarkImportExcelColumns.PROJECT] = MarkExcelFildMapColumns.PROJECT
    }
    if (fields.includes(MarkImportExcelColumns.ABSENT)) {
      fildMap[MarkImportExcelColumns.ABSENT] = MarkExcelFildMapColumns.ABSENT
    }
    const importedMarks: Record<number, MarkListItem> = {}
    marks.forEach(mark => {
      const row = rows.find((row: any) => row[regidField] == mark.student_regid)
      if (row) {
        const newMark = Object.keys(fildMap).reduce((acc: Partial<MarkListItem>, map) => {
          const key = fildMap[map]
          // @ts-ignore
          acc[key] = row[map] ? +row[map] : null
          return acc
        }, {} as Partial<MarkListItem>)
        // console.log(newMark,"newMark")
        const res = updateMark(mark, newMark, gradingRule!)
        importedMarks[mark.id] = res
      }
    })
    addImport(importedMarks)
    close()
  }
  return <BasicModal
    open={open}
    onClose={close}
    title={t("titles.import")}
    footer={
      <Stack gap={2} direction={"row"}>
        {columns.length > 0 && (
          <>
            {!hasError && rows.length > 0 && (
              <Button
                startIcon={<RiFileExcel2Line />}
                onClick={handleImport}
                color="secondary"
                size="small"
                key="import"
                variant="outlined"
              >{t("actions.import")}</Button>
            )}
            <Button color="warning" variant="outlined" onClick={reset}>{t("@buttons.reset")}</Button>
          </>
        )}
        <Button color="error" onClick={close}>{t("@buttons.cancel")}</Button>
      </Stack>
    }
  >
    <Box>
      {columns.length === 0 && <Box>
        <Input
          type="file"
          onChange={onFileChange}
        />
      </Box>}
      {columns.length > 0 && <Box>
        {hasError && <Typography color={"error"}>{hasError}</Typography>}
        <TableGrid
          rows={rows}
          columns={columns}
          rowCount={rows.length}
          loading={isLoading}
          paginationMode="client"
          sortingMode="client"
          filterMode="client"
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: QuickSearchToolbar }}
          getRowClassName={({ row }) => {
            if (!regidList.includes(row[regidField])) {
              return "error-row"
            }
            return ""
          }}
        />
      </Box>}
    </Box>
    <style>
      {`
  .error-row {
    background-color: #f8d7da; /* Light red */
    color: #721c24; /* Dark red */
  }
`}
    </style>
  </BasicModal >

}

function QuickSearchToolbar() {
  return (
    <>
      <Box py={2} justifyItems={"end"}>
        <GridToolbarQuickFilter size="small" />
      </Box>
      <Divider />
    </>
  );
}

const updateMark = (oldMark: MarkListItem, mark: any, gradingRule: IGradingRules): MarkListItem => {
  if (mark.is_absent == 1) {
    return {
      ...oldMark,
      is_absent: YesNoEnum.Yes,
      obtain_mark: null,
      cas: {},
      error: undefined,
    }
  }
  delete mark.is_absent

  const newMark = {
    ...oldMark,
    cas: {
      ...oldMark.cas,
      ...mark
    },
    obtain_mark: null,
  }
  return setImportValidMark(newMark, gradingRule)

}