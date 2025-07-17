import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useTranslate } from "@hooks/useTranslate"
import { DateTimeLabel } from "@components/label/date.label"
import { TextLabel } from "@components/other/text.label"
import { CsLabel } from "@components/label"
import { INoticeMessage } from "../../interface"
import { LANG_NOTICE } from "@common/constant"
import { ActiveStatusChip } from "@components/label/status.label"

type NoticeGroupViewProps = {
    noticeGroup?: INoticeMessage
    isLoading: boolean
}

export const NoticeGroupView = ({ noticeGroup, isLoading }: NoticeGroupViewProps) => {
    const t = useTranslate(LANG_NOTICE, "sms");
    return (
        <TableContainer>
            <Table size="small">
                <TableBody>
                    <TableRow>
                        <TableCell><CsLabel text={t("fields.title")} /></TableCell>
                        <TableCell colSpan={5}><TextLabel text={noticeGroup?.title} isLoading={isLoading} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><CsLabel text={t("fields.created_by")} /></TableCell>
                        <TableCell><TextLabel text={noticeGroup?.user?.name} isLoading={isLoading} /></TableCell>
                        <TableCell><CsLabel text={t("fields.created_at")} /></TableCell>
                        <TableCell><DateTimeLabel date={noticeGroup?.created_at} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><CsLabel text={t("fields.status")} /></TableCell>
                        <TableCell><ActiveStatusChip status={noticeGroup?.status} /></TableCell>
                        <TableCell><CsLabel text={t("fields.schedule")} /></TableCell>
                        <TableCell><DateTimeLabel date={noticeGroup?.schedule} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><CsLabel text={t("fields.message")} /></TableCell>
                        <TableCell colSpan={5}><TextLabel text={noticeGroup?.message} isLoading={isLoading} /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}