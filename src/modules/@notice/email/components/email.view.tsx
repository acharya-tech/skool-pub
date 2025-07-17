import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useTranslate } from "@hooks/useTranslate"
import { DateTimeLabel } from "@components/label/date.label"
import { TextLabel } from "@components/other/text.label"
import { CsLabel } from "@components/label"
import { INoticeEmail } from "../../interface"
import { LANG_NOTICE } from "@common/constant"
import { ActiveStatusChip } from "@components/label/status.label"

type EmailGroupViewProps = {
    emailGroup?: INoticeEmail
    isLoading: boolean
}

export const EmailGroupView = ({ emailGroup, isLoading }: EmailGroupViewProps) => {
    const t = useTranslate(LANG_NOTICE, "email");
    return (
        <TableContainer>
            <Table size="small">
                <TableBody>
                    <TableRow>
                        <TableCell><CsLabel text={t("fields.title")} /></TableCell>
                        <TableCell colSpan={5}><TextLabel text={emailGroup?.title} isLoading={isLoading} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><CsLabel text={t("fields.created_by")} /></TableCell>
                        <TableCell><TextLabel text={emailGroup?.user?.name} isLoading={isLoading} /></TableCell>
                        <TableCell><CsLabel text={t("fields.created_at")} /></TableCell>
                        <TableCell><DateTimeLabel date={emailGroup?.created_at} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><CsLabel text={t("fields.status")} /></TableCell>
                        <TableCell><ActiveStatusChip status={emailGroup?.status} /></TableCell>
                        <TableCell><CsLabel text={t("fields.schedule")} /></TableCell>
                        <TableCell><DateTimeLabel date={emailGroup?.schedule} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><CsLabel text={t("fields.message")} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={6}><div dangerouslySetInnerHTML={{ __html: emailGroup?.message || "" }} /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}