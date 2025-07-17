import {
    Typography,
    Avatar,
    Paper,
    Grid2 as Grid,
    Box,
    CardHeader,
    IconButton,
    Card
} from '@mui/material';
import { useList } from '@refinedev/core';
import { IStudentAcademic } from '../../interface';
import { STUDENT_ACADEMIC_URL } from '../../constant';
import { LANG_STUDENT } from '@common/constant';
import { useTranslate } from '@hooks/useTranslate';
import NoDataLabel from '@components/other/no.data';
import { NotSetLabel } from '@components/label/notset.label';
import { DateLabel } from '@components/label/date.label';
import { BasicModal } from '@components/modal/basic.modal';
import { useState } from 'react';
import { Divider } from '@mui/material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { EditAcademicForm } from '../edit/academic';

type StudentViewProps = {
    id?: string
}
function AcademicView({ id }: StudentViewProps) {
    const t = useTranslate(LANG_STUDENT, "student_academic");
    const [isEditing, setEditing] = useState(false)
    const { data, isLoading } = useList<IStudentAcademic>({
        meta: { customQuery: { student_id: id, image: true } },
        resource: STUDENT_ACADEMIC_URL,
    });
    const record = data?.data;
    return <Card sx={{ mt: 2, p: 2 }}>
        <CardHeader
            title={<Typography variant="h6" gutterBottom>{t('titles.list')}</Typography>}
            sx={{ p: 0 }}
            action={
                <IconButton
                    size='small'
                    sx={{
                        color: "text.secondary",
                    }}
                    onClick={() => setEditing(true)}
                >
                    <EditOutlinedIcon fontSize='small' />
                </IconButton>
            }
        />
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
            <Grid size={12}>
                {record?.length == 0 && <NoDataLabel />}
                {record?.map((doc: IStudentAcademic) => {
                    return <AcademicCard key={doc.id} doc={doc} t={t} />
                })}
            </Grid>
        </Grid>
        <BasicModal
            onClose={() => { setEditing(false) }}
            size={"lg"}
            open={isEditing}
            title={t('titles.list')}
        >
            <EditAcademicForm action='edit' id={id} onClose={() => { setEditing(false) }} />
        </BasicModal>
    </Card>
}

const AcademicCard = ({ doc, t }: any) => {
    return <>
        <Paper sx={{ display: 'flex', justifyContent: 'space-between', m: 2 }} elevation={2}>
            <Avatar src={doc.image?.url} variant="square" sx={{ width: 50, height: 50 }} />
            <Box>
                <Typography variant='subtitle2'>{t('fields.type')}</Typography>
                <Typography variant='body2' color="textSecondary">{doc.type}</Typography>
            </Box>
            <Box>
                <Typography variant='subtitle2'>{t('fields.regid')}</Typography>
                <Typography variant='body2' color="textSecondary">{Boolean(doc.regid) ? doc.regid : <NotSetLabel />}</Typography>
            </Box>
            <Box>
                <Typography variant='subtitle2'>{t('fields.symbol')}</Typography>
                <Typography variant='body2' color="textSecondary">{Boolean(doc.symbol) ? doc.symbol : <NotSetLabel />}</Typography>
            </Box>
            <Box>
                <Typography variant='subtitle2'>{t('fields.institute_name')}</Typography>
                <Typography variant='body2' color="textSecondary">{Boolean(doc.institute_name) ? doc.institute_name : <NotSetLabel />}</Typography>
            </Box>
            <Box>
                <Typography variant='subtitle2'>{t('fields.score')}</Typography>
                <Typography variant='body2' color="textSecondary">{Boolean(doc.score) ? doc.score : <NotSetLabel />}</Typography>
            </Box>
            <Box>
                <Typography variant='subtitle2'>{t('fields.passed_year_en')}</Typography>
                <DateLabel date={doc.passed_year_en} />
            </Box>
        </Paper>
    </>
}

export default AcademicView;
