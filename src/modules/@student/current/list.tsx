import {
  type HttpError
} from "@refinedev/core";

import { useDataGrid } from "@refinedev/mui";
import { useEffect } from "react";

import { TableGrid } from "@components/table/table.body";
import { IStudentInfo } from "../interface";
import { useParams } from "react-router-dom";
import { STUDENT_CURRENT_URL } from "../constant";
import { StudentTableListProp } from "../interface/types";
import { useStudentColumn } from "../components/useColumn";


export const CurrentListTable = ({ search, advanceFilter }: StudentTableListProp) => {
  const { programid } = useParams()
  const { select, setSelect } = useStudentColumn({
    selection: advanceFilter?.select
  })

  const { dataGridProps, setFilters } = useDataGrid<IStudentInfo, HttpError>({
    meta: {
      customQuery: {
        filter: JSON.stringify({
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
          email: search
        }) as string,
        operator: 'eq' as any
      }
    ])
  }, [search])

  useEffect(() => {
    if (advanceFilter) {
      const filterObj: any = { ...advanceFilter }
      const filterData = Object.keys(advanceFilter).filter(key => filterObj[key] != null).map((key: string) => {
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
    columns={select}
  />

};

