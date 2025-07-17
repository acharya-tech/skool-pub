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
import { LANG_EMPLOYEE, LANG_STUDENT } from '@common/constant';
import { useTranslate } from '@hooks/useTranslate';
import NoDataLabel from '@components/other/no.data';
import { BasicModal } from '@components/modal/basic.modal';
import { EditDocForm } from '../edit/doc';
import { useState } from 'react';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IStaffDoc } from '../../interface';
import { EMPLOYEE_DOC_URL } from '../../constant';

type DocumentViewProps = {
    id?: string
}
function DocumentView({ id }: DocumentViewProps) {
    const t = useTranslate(LANG_EMPLOYEE, "staff_doc");
    const [isEditing, setEditing] = useState(false)
    const { data, isLoading } = useList<IStaffDoc>({
        meta: { customQuery: { staff_id: id, image: true } },
        resource: EMPLOYEE_DOC_URL,
    });
    const record = data?.data;

    return <Card sx={{ p: 2 }}>
        <CardHeader
            title={<Typography variant="h6" gutterBottom>{t('staff_doc')}</Typography>}
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
                {record?.map((doc: IStaffDoc) => {
                    return <DocCard key={doc.id} doc={doc} t={t} />
                })}
            </Grid>
        </Grid>
        <BasicModal
            onClose={() => { setEditing(false) }}
            open={isEditing}
            title={t('titles.list')}
        >
            <EditDocForm action='edit' id={id} onClose={() => setEditing(false)} />
        </BasicModal>
    </Card>
}

const DocCard = ({ doc, t }: any) => {
    return <Paper sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: "#bfbfbf1f", m: 2 }} elevation={2}>
        <Avatar src={doc.image?.url} variant="square" sx={{ width: 50, height: 50 }} />
        <Box>
            <Typography>{doc.image.name}</Typography>
            <Typography variant='subtitle2'>{doc.type}</Typography>
        </Box>
    </Paper>
}

export default DocumentView;
