import {
    Typography,
    Card,
    Avatar,
    Paper,
    Grid2 as Grid,
    Box,
    CardHeader,
    IconButton,
    Divider
} from '@mui/material';
import { useList } from '@refinedev/core';
import { IStudentParent } from '../../interface';
import { STUDENT_PARENT_RELATION_URL } from '../../constant';
import { LANG_STUDENT } from '@common/constant';
import { useTranslate } from '@hooks/useTranslate';
import NoDataLabel from '@components/other/no.data';
import { NotSetLabel } from '@components/label/notset.label';
import { useState } from 'react';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { BasicModal } from '@components/modal/basic.modal';
import { EditParentForm } from '../edit/parent';
import { LabelData } from '@components/other/label.data';

type StudentViewProps = {
    id?: string
}
function ParentView({ id }: StudentViewProps) {
    const t = useTranslate(LANG_STUDENT, "parent");
    const { data, isLoading } = useList<IStudentParent>({
        meta: { customQuery: { student_id: id, parent: true } },
        resource: STUDENT_PARENT_RELATION_URL,
    });
    const [isEditing, setEditing] = useState(false)
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
                {record?.map((parent: IStudentParent) => {
                    return <ParentCard key={parent.id} parent={parent} t={t} isLoading={isLoading} />
                })}
            </Grid>
        </Grid>
        <BasicModal
            onClose={() => { setEditing(false) }}
            open={isEditing}
            title={t('titles.list')}
        >
            <EditParentForm action='edit' id={id} onClose={() => setEditing(false)} />
        </BasicModal>
    </Card>
}

const ParentCard = ({ parent, t, isLoading }: any) => {
    return <Paper sx={{ display: 'flex', alignItems: 'center', gap: 2, m: 2 }} elevation={2}>
        <Avatar src={parent.parent.image?.url} variant="square" sx={{ width: 100, height: 100 }} />
        <Box>
            <Grid container>
                <Grid size={12}><LabelData label={t('fields.name')} value={parent?.parent.name} isLoading={isLoading} /></Grid>
                <Grid size={12}><LabelData label={t('fields.relation')} value={parent?.relation} isLoading={isLoading} /></Grid>
                <Grid size={12}><LabelData label={t('fields.phone')} value={parent?.parent.phone} isLoading={isLoading} /></Grid>
                <Grid size={12}><LabelData label={t('fields.email')} value={parent?.parent.email} isLoading={isLoading} /></Grid>
                <Grid size={12}><LabelData label={t('fields.occupation')} value={parent?.parent.occupation} isLoading={isLoading} /></Grid>
                <Grid size={12}><LabelData label={t('fields.blood_group')} value={parent?.parent.blood_group} isLoading={isLoading} /></Grid>
            </Grid>
        </Box>
    </Paper>
}

export default ParentView;
