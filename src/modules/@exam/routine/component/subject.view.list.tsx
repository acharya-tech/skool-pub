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
import { LANG_EXAM } from "@common/constant";
import { DateTimeLabel, TimeLabel } from "@components/label/date.label";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { getQueryParam } from "@utils/other";
import { SubjectMarkStatus } from "../../component/common";
import { CanAccess, useList } from "@refinedev/core";
import { EXAM_SUBJECT_URL } from "@exam/constant/service.urls";
import { EXAM_ROUTINE_SUBJECT_VIEW } from "@exam/constant/local.urls";
import { EXAM_ROUTINE_SUBJECT_AC } from "@exam/constant/access.url";

type SubjectViewListProps = {
    routine_id?: string
}
export const SubjectViewList = ({ routine_id }: SubjectViewListProps) => {
    const t = useTranslate(LANG_EXAM, "esubjects");
    const { data: esubjectsRaw } = useList({
        resource: EXAM_SUBJECT_URL,
        pagination: {
            pageSize: 100
        },
        meta: {
            customQuery: {
                routine_id
            }
        },
        queryOptions: {
            enabled: !!routine_id
        }
    })
    const esubjects = esubjectsRaw?.data
    return (
        <TableContainer>
            <Table style={{ minWidth: "650" }} aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell width={80}>{t("fields.code")}</TableCell>
                        <TableCell align="left">{t("fields.subject")}</TableCell>
                        <TableCell align="right">{t("fields.subject_credit")}</TableCell>
                        <TableCell align="right">{t("fields.fm")}</TableCell>
                        <TableCell align="right">{t("fields.pm")}</TableCell>
                        <TableCell>{t("fields.start_time")}</TableCell>
                        <TableCell>{t("fields.duration")}</TableCell>
                        <TableCell>{t("fields.status")}</TableCell>
                        <TableCell>{t("fields.progress")}</TableCell>
                        <TableCell>{t("@table.actions")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!esubjects && (
                        <>
                            <TableRow><TableCell colSpan={8}><Skeleton width={`70%`} /></TableCell></TableRow>
                            <TableRow><TableCell colSpan={8}><Skeleton width={`80%`} /></TableCell></TableRow>
                            <TableRow><TableCell colSpan={8}><Skeleton width={`60%`} /></TableCell></TableRow>
                        </>
                    )}
                    {esubjects && esubjects?.map((row, index) => (
                        <TableRow key={row.subject_code}>
                            <TableCell component="th" scope="row">
                                {row.subject_code}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.subject_name}
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                                {Number(row.th_credit ?? 0) + Number(row.in_credit ?? 0)}
                            </TableCell>
                            <TableCell align="right">{parseFloat(((row.th_fm || 0) + (row.in_fm || 0)).toString())}</TableCell>
                            <TableCell align="right">{parseFloat(((row.th_pm || 0) + (row.in_pm || 0)).toString())}</TableCell>
                            <TableCell><DateTimeLabel date={(new Date(row.start_date!).toISOString())} /></TableCell>
                            <TableCell><TimeLabel date={(new Date(row.duration!).toISOString())} format="HH:mm" /></TableCell>
                            <TableCell><SubjectMarkStatus status={row.post_status} /></TableCell>
                            <TableCell>{row.progress}%</TableCell>
                            <TableCell>
                                <CanAccess resource={EXAM_ROUTINE_SUBJECT_AC} action="show" >
                                    <Link to={'/' + getQueryParam(EXAM_ROUTINE_SUBJECT_VIEW, { id: row.routine_id, subjectid: row.id })}>
                                        <IconButton
                                            sx={{
                                                color: "text.secondary",
                                            }}
                                        >
                                            <VisibilityIcon fontSize="small" />
                                        </IconButton>
                                    </Link>
                                </CanAccess>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
