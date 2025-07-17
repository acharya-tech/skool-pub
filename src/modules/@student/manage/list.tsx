import {
  type HttpError
} from "@refinedev/core";

import { useDataGrid } from "@refinedev/mui";
import { useEffect } from "react";
import { TableGrid } from "@components/table/table.body";
import { IStudentInfo } from "../interface";
import { useParams } from "react-router-dom";
import { STUDENT_CURRENT_URL, STUDENT_LOG_URL, StudentStateEnum } from "../constant";
import { StudentTableListProp } from "../interface/types";
import { useStudentColumn } from "../components/useColumn";

type ManageListTableProps = StudentTableListProp & {
  setStudent: (students: string[]) => void
}

export const ManageListTable = ({ search, advanceFilter, setStudent }: ManageListTableProps) => {
  const { programid } = useParams()
  const { select, setSelect } = useStudentColumn({
    selection: { ...advanceFilter.select, st: true }
  })

  const { dataGridProps, setFilters } = useDataGrid<IStudentInfo, HttpError>({
    meta: {
      customQuery: {
        filter: JSON.stringify({
          ...advanceFilter?.filter,
          program_id: programid == 'all' ? undefined : programid,
        }),
        select: JSON.stringify(advanceFilter.select)
      }
    },
    resource: STUDENT_CURRENT_URL,
  });

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
          state: advanceFilter?.filter.state ?? [StudentStateEnum.Current, StudentStateEnum.Dropout, StudentStateEnum.Alumni]
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
          value: JSON.stringify(filterObj[key]) as string,
          operator: 'eq' as any
        }
      })
      setFilters(filterData)
    } else {
      setFilters([])
    }
    setSelect(advanceFilter.select)
  }, [advanceFilter])

  return <TableGrid
    {...dataGridProps}
    checkboxSelection
    disableRowSelectionOnClick
    onRowSelectionModelChange={(newRowSelectionModel) => {
      setStudent(newRowSelectionModel as any);
    }}
    columns={select}
  />

};

