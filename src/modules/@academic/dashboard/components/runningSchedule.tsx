import type { CardProps } from '@mui/material/Card';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import { HttpError, useList } from '@refinedev/core';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_ACADEMIC, LANG_EMPLOYEE } from '@common/constant';
import { IAcademicTimeline, IClass, ISection } from '@academic/interface';
import { ACADEMIC_TIMELINE_URL } from '@academic/constant/server.url';
// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
};

export function RunningSchedule({
  sx,
  title,
  subheader,
  ...other
}: Props) {
  const t = useTranslate(LANG_ACADEMIC, "dashboard")
  const { data: tableData } = useList<IAcademicTimeline, HttpError>({
    resource: ACADEMIC_TIMELINE_URL,
    pagination: {
      pageSize: 1000
    },
    meta: {
      customQuery: {
        session_enabled: true,
        current_schedule: true,
        aclass: true,
        staff: true,
        period: true,
        section: true,
        subject: true
      }
    }
  });

  const sectionObject: Record<string, ISection> = {}
  const classesObject: Record<string, IClass> = {}
  const schedules: Record<string, IAcademicTimeline> = {}
  tableData?.data?.forEach((item) => {
    sectionObject[item.section_id] = item.section
    classesObject[item.class_id] = item.aclass
    schedules[`${item.class_id}-${item.section_id}`] = item
  })
  const columns = Object.values(sectionObject).sort((a, b) => a.name.localeCompare(b.name)).map((item) => {
    return {
      id: item.id,
      label: item.name,
      data: item
    }
  }) ?? []

  const classList = Object.values(classesObject).sort((a, b) => a.sort - b.sort) ?? []
  console.log(classList,classesObject,"classList")
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title ?? t("labels.runningSchedule")} subheader={subheader} sx={{ mb: 3 }} />
      <Table sx={{ minWidth: 720 }}>
        <TableHeadCustom headCells={[
          {
            id: 'class',
            label: 'Class'
          },
          ...columns
        ]} />
        <TableBody>
          {tableData?.data.length == 0 && (
            <TableNoData notFound />
          )}
          {classList.map((aclass) => (
            <TableRow>
              <TableCell>
                <ListItemText primary={aclass.name} />
              </TableCell>
              {columns.map((section) => {
                const timeline = schedules[`${aclass.id}-${section.id}`]
                return (
                  <TableCell>
                    <ListItemText primary={timeline?.subject?.name??"-"} secondary={timeline?.staff?.name ?? "-"} />
                  </TableCell>
                )
              })}
            </TableRow>)
          )}

        </TableBody>
      </Table>
    </Card>
  );
}


