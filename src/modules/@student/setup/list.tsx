import {
  useCreate,
  type HttpError
} from "@refinedev/core";

import { useDataGrid } from "@refinedev/mui";
import { useEffect, useRef, useState } from "react";
import { TableGrid } from "@components/table/table.body";
import { IStudentInfo } from "../interface";
import { useParams } from "react-router-dom";
import { SetupTypeEnum, STUDENT_CURRENT_URL, STUDENT_SETUP_URL } from "../constant";
import { StudentTableListProp } from "../interface/types";
import { useStudentColumn } from "../components/useColumn";
import { GridColDef } from "@mui/x-data-grid";
import { Alert, Box, Button, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_STUDENT } from "@common/constant";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useConfirm } from "@hooks/confirm.hook";
import LoadingButton from "@mui/lab/LoadingButton";

type SetupListTableProps = StudentTableListProp & {
}

export const SetupListTable = ({ search, advanceFilter }: SetupListTableProps) => {
  const { programid } = useParams()
  const t = useTranslate(LANG_STUDENT, "setup");
  const { select, setSelect } = useStudentColumn({
    selection: { ...advanceFilter.select, action: false }
  })
  const [selectedColumn, setSelectedColumn] = useState<SetupTypeEnum>(SetupTypeEnum.roll_no);



  const CustomHeader = () => (
    <div>
      <Select
        sx={{ width: 200 }}
        inputProps={{ sx: { padding: '6px 14px' } }}
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value as SetupTypeEnum)}
        size="small"
      >
        <MenuItem value="roll_no">{t('fields.roll_no')}</MenuItem>
        <MenuItem value="symbol">{t('fields.symbol')}</MenuItem>
        <MenuItem value="uni_reg">{t('fields.uni_reg')}</MenuItem>
      </Select>
    </div>
  );



  const { dataGridProps, setFilters, tableQuery: { refetch } } = useDataGrid<IStudentInfo, HttpError>({
    meta: {
      customQuery: {
        filter: JSON.stringify({
          ...advanceFilter?.filter,
          program_id: programid == 'all' ? undefined : programid,
        }),
        select: JSON.stringify({ ...advanceFilter.select, rn: true, sym: true, urg: true })
      }
    },
    resource: STUDENT_CURRENT_URL,
  });


  const { isLoading, mutate } = useCreate({
    resource: STUDENT_SETUP_URL,
  })

  const [setOpen, ConfirmEle] = useConfirm({
    onConfirm: () => {
      mutate({ values: { type: selectedColumn, updates: columnEdits } }, {
        onSuccess: () => {
          refetch()
          setColumnEdits({})
        }
      })
    },
  })

  useEffect(() => {
    setFilters([
      {
        field: 'filter',
        value: JSON.stringify({
          full_name: search,
          regid: search,
          class_name: search,
          phone: search,
          email: search,
        }) as string,
        operator: 'eq' as any
      },
      {
        field: 'select',
        value: JSON.stringify({
          ...advanceFilter.select,
          rn: true,
          sym: true,
          urg: true
        }) as string,
        operator: 'eq' as any
      }
    ])
  }, [search])

  useEffect(() => {
    if (advanceFilter) {
      const filterObj: any = { ...advanceFilter }
      const filterData = Object.keys(advanceFilter).map((key: string) => {
        return {
          field: key,
          value: JSON.stringify({
            ...filterObj[key],
            rn: true,
            sym: true,
            urg: true
          }) as string,
          operator: 'eq' as any
        }
      })
      setFilters(filterData)
    } else {
      setFilters([])
    }
    setSelect({ ...advanceFilter.select, rn: true, sym: true, urg: true })
  }, [advanceFilter])
  const [columnEdits, setColumnEdits] = useState<any>({});

  useEffect(() => {
    setColumnEdits({})
  }, [selectedColumn])

  const handleInputChange = (index: string, value: string) => {
    setColumnEdits((p: any) => {
      return { ...p, [index]: value }
    });
  };

  const EditableCell = ({ row, tabIndex }: GridRenderCellParams<IStudentInfo>) => {
    return (
      <TextField
        variant="outlined"
        tabIndex={tabIndex}
        size="small"
        inputProps={{ sx: { fontSize: '0.8rem', lineHeight: '1rem', padding: '5px 14px' } }}
        value={row.id in columnEdits ? columnEdits[row.id] : selectedColumn === 'uni_reg' ? row?.uni_reg : row[selectedColumn]}
        onChange={(e) => handleInputChange(row.id, e.target.value)}
        sx={{ width: 200 }}
      />
    );
  };
  const skipList = ["roll_no", "symbol", "uni_reg", "actions"]
  const columns: GridColDef[] = [
    {
      field: selectedColumn,
      width: 250,
      headerName: '',
      renderHeader: CustomHeader,
      disableColumnMenu: true,
      renderCell: EditableCell,
    },
  ];
  const cloList = [
    ...select.filter((e: any) => !skipList.includes(e.field)),
    ...columns
  ]

  const handleAutogenerate = () => {
    const student_id = Object.keys(columnEdits)[0]
    const index = dataGridProps.rows.findIndex((e: IStudentInfo) => e.id == student_id) + 1
    let counter: number = parseInt(columnEdits[student_id]) - (index) + 1
    const newclm: any = {}
    dataGridProps.rows.forEach((e: IStudentInfo) => {
      if (counter > 0) {
        return newclm[e.id] = counter++
      }
    })
    setColumnEdits({ ...newclm })
  }
  console.log(cloList, 'cloList clsd clsd clsdcsdlcksdcksd clsdkc sldk clsdkc sdlcksdlcsdk clcsdc')
  return <><TableGrid
    {...dataGridProps}
    columns={cloList}
  />
    <Stack direction={"row"} m={2} justifyContent={'space-between'}>
      <Stack direction={"row"} gap={1}>
        <Alert sx={{ p: '0px 15px' }}>{t('message.note')}</Alert>
        <Button onClick={handleAutogenerate} disabled={Object.keys(columnEdits).length == 0 || isLoading} color='info' variant="outlined">{t('actions.auto')}</Button>
      </Stack>
      <Stack direction={"row"} spacing={2}>
        <Button disabled={Object.keys(columnEdits).length == 0 || isLoading} color='warning' variant="contained" onClick={() => setColumnEdits({})}>
          {t("actions.reset")}
        </Button>
        <LoadingButton loading={isLoading} disabled={Object.keys(columnEdits).length == 0} variant="contained" color="primary" onClick={setOpen}>
          {t('actions.save')}
        </LoadingButton>
      </Stack>
    </Stack>
    {ConfirmEle}
  </>

};

