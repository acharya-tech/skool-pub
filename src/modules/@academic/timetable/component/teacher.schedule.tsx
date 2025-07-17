import { IPeriod, ISection, ISubject, ITimelineClassSection, ITimelineClassToSubject, ITimetableCreate } from "@academic/interface";
import { LANG_ACADEMIC } from "@common/constant";
import { useTranslate } from "@hooks/useTranslate";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { fTime } from "@utils/format-time";


type TeacherScheduleProps = {
    teacherId: string,
    classSubjects: ITimelineClassToSubject
    classSection: ITimelineClassSection
    periods: IPeriod[]
    schedule: ITimetableCreate
}
export const TeacherSchedule = ({ teacherId, classSubjects, periods, classSection, schedule }: TeacherScheduleProps) => {
    const t = useTranslate(LANG_ACADEMIC, "timeline")
    const subjects: Record<string, ISubject> = {}
    Object.values(classSubjects).flat().forEach(item => {
        subjects[item.id] = item
    })
    const teacherClass = Object.values(schedule).filter(item => item.teacherId === teacherId).reduce((acc, item) => {
        if (acc[item.classId]) {
            acc[item.classId] = item.classId
        } else {
            acc[item.classId] = item.classId
        }
        return acc
    }, {} as Record<string, string>)
    return (
        <Box>
            <TableContainer component={Paper} elevation={3}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">{t("titles.head")}</TableCell>
                            {periods?.map(period => (
                                <TableCell key={period.id} align="center">
                                    <Typography variant="subtitle2">{period.name}</Typography>
                                    <Typography variant="caption" color="textSecondary">{fTime(period.start_time)} - {fTime(period.end_time)}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(teacherClass).map((classId) => {
                            const aclass = classSection[classId]
                            return aclass.sections.map((section) => (
                                <TableRow key={aclass.id + section.id}>
                                    <TableCell component="th" scope="row" align="center">
                                        <Typography variant="subtitle2">{section.name}</Typography>
                                        <Typography variant="caption" color="textSecondary">{aclass.name}</Typography>
                                    </TableCell>
                                    {periods?.map(period => {
                                        const cellid = `${aclass.id}-${period.id}-${section.id}`
                                        const entry = schedule[cellid]
                                        const subject = subjects[entry?.subjectId as any]
                                        return (
                                            <TableCell key={cellid} align="center" sx={{ p: 1 }}>
                                                {entry && entry.teacherId == teacherId ? (
                                                    <Typography variant="body1" fontWeight="bold">{subject?.name}</Typography>
                                                ) : (
                                                    <Typography variant="caption" color="text.disabled">-</Typography>
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    )
};