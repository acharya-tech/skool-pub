import {
    IconButton,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_EXAM, LANG_STUDENT } from "@common/constant";
import { DateTimeLabel, TimeLabel } from "@components/label/date.label";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { getQueryParam } from "@utils/other";
import { IClass, IClassSubject } from "@academic/interface";
import { STUDENT_SUBJECT_STUDENT_AUTOASSIGN_URL, STUDENT_SUBJECT_VIEW } from "../../constant";
import { CourseTypeEnum } from "@common/all.enum";
import { useInvalidate, useList, useUpdate } from "@refinedev/core";
import { ACADEMIC_CLASS_SUBJECT_URL } from "@academic/constant/server.url";
import { Refresh } from "@mui/icons-material";

type SubjectViewListProps = {
    classes: IClass
}
export const SubjectViewList = ({ classes }: SubjectViewListProps) => {
    const t = useTranslate(LANG_STUDENT, "subject");
    const { data: classSubjectData, isLoading } = useList<IClassSubject>({
        resource: ACADEMIC_CLASS_SUBJECT_URL,
        sorters: [{
            field: "sno",
            order: "asc"
        }],
        meta: {
            customQuery: {
                class_id: classes.id,
                subject: true
            }
        }
    })

    const { mutate } = useUpdate({
        resource: STUDENT_SUBJECT_STUDENT_AUTOASSIGN_URL,
    })
    const invalidate = useInvalidate()
    const handleAutoAssign = (classSubjectId: string) => {
        mutate({
            id: classSubjectId,
            values: {}
        }, {
            onSuccess: () => {
                invalidate({
                    resource: ACADEMIC_CLASS_SUBJECT_URL,
                    invalidates: ["list"]
                })
            }
        })
    }

    const classSubject = classSubjectData?.data ?? []
    return (
        <TableContainer>
            <Table style={{ minWidth: "650" }} aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">{t("fields.subject")}</TableCell>
                        <TableCell>{t("fields.courseType")}</TableCell>
                        <TableCell>{t("fields.sno")}</TableCell>
                        <TableCell align="center">{t("fields.totalStudent")}</TableCell>
                        <TableCell>{t("@table.actions")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading && (
                        <>
                            <TableRow><TableCell colSpan={5}><Skeleton width={`70%`} /></TableCell></TableRow>
                            <TableRow><TableCell colSpan={5}><Skeleton width={`80%`} /></TableCell></TableRow>
                            <TableRow><TableCell colSpan={5}><Skeleton width={`60%`} /></TableCell></TableRow>
                        </>
                    )}
                    {classSubject?.map((row, index) => (
                        <TableRow key={row.subject.code}>
                            <TableCell component="th" scope="row">
                                {row.subject.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.course_type}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.sno}
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                                {`${row.total_assigned} / ${row.total_student}`}
                            </TableCell>
                            <TableCell>
                                <Link to={'/' + getQueryParam(STUDENT_SUBJECT_VIEW, { programid: classes.program_id, classid: classes.id, id: row.id })}>
                                    <IconButton
                                        sx={{
                                            color: "text.secondary",
                                        }}
                                    >
                                        <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                </Link>
                                {row.course_type === CourseTypeEnum.Compulsory && (
                                    <IconButton
                                        onClick={() => handleAutoAssign(row.id)}
                                        disabled={row.total_assigned == row.total_student}
                                    >
                                        <Refresh />
                                    </IconButton>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
