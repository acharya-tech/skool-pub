import { ACADEMIC_TIMELINE_URL } from "@academic/constant/server.url";
import { IAcademicTimeline, } from "@academic/interface";
import { getScheduleConvertedForTeacher } from "@academic/utils";
import { WeekDaysEnum } from "@common/all.enum";
import { LANG_EMPLOYEE } from "@common/constant";
import { useTranslate } from "@hooks/useTranslate";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useList } from "@refinedev/core";
import { fTime } from "@utils/format-time";
import { useMemo, useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import PrintIcon from "@mui/icons-material/Print";
import dayjs from 'dayjs';

type TeacherClassScheduleProps = {
    id?: string
}
export const TeacherClassSchedule = ({ id }: TeacherClassScheduleProps) => {
    const t = useTranslate(LANG_EMPLOYEE, "staff");
    const { data: timelineRaw } = useList<IAcademicTimeline>({
        resource: ACADEMIC_TIMELINE_URL,
        pagination: { pageSize: 1000 },
        meta: {
            customQuery: {
                staff_id: id,
                session_enabled: true
            }
        }
    });

    const { periods, schedules } = useMemo(() => {
        if (timelineRaw?.data) {
            return getScheduleConvertedForTeacher(timelineRaw.data)
        }
        return {
            schedules: {},
            periods: []
        }
    }, [timelineRaw]);

    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({
        contentRef,
        documentTitle: `Staff_Timetable`,
        pageStyle: `
        @page {
          size: A4 portrait;
          margin: 10mm;
        }
    
        @media print {
          html, body {
            zoom: 0.75;
          }
    
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
    
          .no-print {
            display: none !important;
          }
        }
      `
    });

    return (
        <Box my={2}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                    color="inherit"
                    size="small"
                    onClick={reactToPrintFn}
                    aria-label="print"
                >
                    <PrintIcon />
                </Button>
            </Box>
            <Box ref={contentRef}>
                <TableContainer component={Paper} elevation={3}>
                    <Table sx={{ minWidth: 650 }} >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">{t("titles.scheduleHead")}</TableCell>
                                {Object.values(WeekDaysEnum).map(day => (
                                    <TableCell key={day} align="center">{day}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {periods.map((period) => (
                                <TableRow key={period.id}>
                                    <TableCell component="th" scope="row" align="center">
                                        <Typography variant="subtitle2">{period.name}</Typography>
                                        <Typography variant="caption" color="textSecondary">{fTime(period.start_time)} - {fTime(period.end_time)}</Typography>
                                    </TableCell>
                                    {Object.values(WeekDaysEnum).map(day => {
                                        const cellid = `${period.id}-${day}`
                                        const entry = schedules[cellid]
                                        return (
                                            <TableCell key={cellid} align="center" sx={{ p: 1 }}>
                                                {entry ? (
                                                    <Box>
                                                        <Typography variant="body1" fontWeight="bold">{entry.subject_name}</Typography>
                                                        <Typography variant="body2" color="text.secondary">{entry.class_name} ({entry.section_name})</Typography>
                                                    </Box>
                                                ) : (
                                                    <Typography variant="caption" color="text.disabled">-</Typography>
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}