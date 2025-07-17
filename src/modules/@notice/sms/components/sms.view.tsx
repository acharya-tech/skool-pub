import { Button, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useTranslate } from "@hooks/useTranslate"
import { DateLabel, DateTimeLabel } from "@components/label/date.label"
import { TextLabel } from "@components/other/text.label"
import { CsLabel } from "@components/label"
import { INoticeSms } from "../../interface"
import { LANG_NOTICE } from "@common/constant"
import { NoticeState } from "../../component/common"

type SmsGroupViewProps = {
    smsGroup?: INoticeSms
    isLoading: boolean
}

export const SmsGroupView = ({ smsGroup, isLoading }: SmsGroupViewProps) => {
    const t = useTranslate(LANG_NOTICE, "sms");
    return (
        <TableContainer>
            <Table size="small">
                <TableBody>
                    <TableRow>
                        <TableCell><CsLabel text={t("fields.title")} /></TableCell>
                        <TableCell colSpan={5}><TextLabel text={smsGroup?.title} isLoading={isLoading} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><CsLabel text={t("fields.audiance")} /></TableCell>
                        <TableCell><TextLabel text={smsGroup?.total_audiance} isLoading={isLoading} /></TableCell>
                        <TableCell><CsLabel text={t("fields.created_by")} /></TableCell>
                        <TableCell><TextLabel text={smsGroup?.user?.name} isLoading={isLoading} /></TableCell>
                        <TableCell><CsLabel text={t("fields.created_at")} /></TableCell>
                        <TableCell><DateTimeLabel date={smsGroup?.created_at} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><CsLabel text={t("fields.state")} /></TableCell>
                        <TableCell><NoticeState state={smsGroup?.state} /></TableCell>
                        <TableCell><CsLabel text={t("fields.schedule")} /></TableCell>
                        <TableCell><DateTimeLabel date={smsGroup?.schedule} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><CsLabel text={t("fields.message")} /></TableCell>
                        <TableCell colSpan={5}><TextLabel text={smsGroup?.message} isLoading={isLoading} /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}