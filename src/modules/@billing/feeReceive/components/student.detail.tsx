import {
    Typography,
    Grid2 as Grid,
    Card,
    Avatar,
    Stack,
    Paper,
    Divider,
} from '@mui/material';
import { useList, useOne, useShow } from '@refinedev/core';
import { NotSetLabel } from '@components/label/notset.label';
import { LANG_STUDENT } from '@common/constant';
import { useTranslate } from '@hooks/useTranslate';
import { StudentStateChip } from '@components/other/student.chip';
import { CsLabel } from '@components/label';
import { STUDENT_CURRENT_URL, STUDENT_INFO_URL, STUDENT_PARENT_RELATION_URL, STUDENT_SIBLING_URL, StudentLogStateEnum } from '@student/constant';
import { IParent, ISibling, IStudentInfo, IStudentParent } from '@student/interface';
import NoDataLabel from '@components/other/no.data';
type StudentDetailProps = {
    student_id?: string
}
function StudentDetails({ student_id }: StudentDetailProps) {
    const t = useTranslate(LANG_STUDENT, "info");
    const { data, isLoading } = useOne<IStudentInfo>({
        resource: STUDENT_INFO_URL,
        id: student_id,
        meta: {
            customQuery: {
                image: true,
                program: true,
                class: true,
                section: true,
            }
        },
    })
    const { data: parent, isLoading: parentLoading } = useList<IStudentParent>({
        resource: STUDENT_PARENT_RELATION_URL,
        meta: { customQuery: { student_id: student_id, parent: true } },
    })
    const { data: sibling, isLoading: siblingLoading } = useList<ISibling>({
        resource: STUDENT_SIBLING_URL,
        meta: { customQuery: { student_id: student_id, sibling: true, sibling_class: true } },
    })
    const record = data?.data
    const siblingRecord = sibling?.data
    const parentRecord = parent?.data
    return (
        <>
            <Card sx={{ p: 2, mb: 2 }}>
                <Stack gap={2} alignItems={"center"}>
                    <Avatar variant="square" src={record?.image?.url} sx={{ width: 100, height: 100 }} />
                    <Typography variant="subtitle2">{record?.full_name} | {record?.regid}</Typography>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Grid container gap={1}>
                    <Grid size={4}><CsLabel text={t('fields.state')} /></Grid>
                    <Grid size={6}><StudentStateChip state={record?.state as unknown as StudentLogStateEnum} /></Grid>
                    <Grid size={4}><CsLabel text={t('labels.class')} /></Grid>
                    <Grid size={6}><Typography variant='body2' color="textSecondary">{`${record?.program?.name} | ${record?.class?.name}`}</Typography></Grid>
                    <Grid size={4}><CsLabel text={t('labels.section')} /></Grid>
                    <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.section?.name ?? <NotSetLabel />}</Typography></Grid>
                    <Grid size={4}><CsLabel text={t('labels.roll_no')} /></Grid>
                    <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.roll_no ?? <NotSetLabel />}</Typography></Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>{t('titles.siblings')}</Typography>
                {siblingRecord?.map((sibling, index) => (
                    <Grid container gap={1} key={index}>
                        <Grid size={4}><CsLabel text={t('labels.name')} /></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary">{sibling?.sibling.full_name}</Typography></Grid>
                        <Grid size={4}><CsLabel text={t('labels.regid')} /></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary">{sibling?.sibling.regid}</Typography></Grid>
                        <Grid size={4}><CsLabel text={t('labels.class')} /></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary">{sibling?.sibling.class?.name ?? <NotSetLabel />}</Typography></Grid>
                        <Grid size={4}><CsLabel text={t('labels.relation')} /></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary">{sibling?.relation ?? <NotSetLabel />}</Typography></Grid>
                    </Grid>
                ))}
                {siblingRecord?.length === 0 && (
                    <Grid container gap={1}>
                        <NoDataLabel />
                    </Grid>
                )}
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>{t('titles.parentInfo')}</Typography>
                {parentRecord?.map((parent, index) => (
                    <Grid container gap={1} key={index}>
                        <Grid size={4}><CsLabel text={t('labels.name')} /></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary">{parent?.parent.name}</Typography></Grid>
                        <Grid size={4}><CsLabel text={t('labels.relation')} /></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary">{parent?.relation ?? <NotSetLabel />}</Typography></Grid>
                    </Grid>
                ))}
                {parentRecord?.length === 0 && (
                    <Grid container gap={1}>
                        <NoDataLabel />
                    </Grid>
                )}
            </Card>
        </>
    );
}

export default StudentDetails;
