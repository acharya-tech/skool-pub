import { IPeriod, ISection, ISubject, ITimetableCreate } from "@academic/interface";
import { WeekDaysEnum } from "@common/all.enum";
import { IStaff } from "@employee/interface";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { fTime } from "@utils/format-time";


type SectionTimetableProps = {
    section: ISection
    schedule: ITimetableCreate,
    periods: IPeriod[],
    teachers: Record<string, IStaff>,
    subjects: Record<string, ISubject>
    headTitle: string
}

export const SectionTimetable = ({ section, periods, subjects, teachers, schedule, headTitle }: SectionTimetableProps) => (
    <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label={`timetable for ${section.name}`}>
            <TableHead>
                <TableRow>
                    <TableCell align="center">{headTitle}</TableCell>
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
                            const cellid = `${section.id}-${period.id}-${day}`
                            const entry = schedule[cellid]
                            const subject = subjects[entry?.subjectId as any]
                            const teacher = teachers[entry?.teacherId as any]
                            return (
                                <TableCell key={cellid} align="center" sx={{ p: 1 }}>
                                    {entry ? (
                                        <Box>
                                            <Typography variant="body1" fontWeight="bold">{subject?.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">{teacher?.name}</Typography>
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
);