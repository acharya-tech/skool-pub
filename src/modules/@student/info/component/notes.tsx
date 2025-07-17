import React, { useState } from 'react';
import { Box, Card, Typography, Avatar, Container, Rating, Stack, IconButton, Button } from '@mui/material';
import { useTranslate } from '@hooks/useTranslate';
import { useCreate, useList } from '@refinedev/core';
import { LANG_STUDENT } from '@common/constant';
import NoDataLabel from '@components/other/no.data';
import { STUDENT_NOTE_URL } from '../../constant';
import { IStudentNote } from '../../interface';
import { DateLabel } from '@components/label/date.label';
import { DeleteOutline, Send } from '@mui/icons-material';
import { useConfirmButton } from '@hooks/delete.confirm.hook';
import { CSInput, CSRating } from '@components/input';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import { useConfirm } from '@hooks/confirm.hook';

interface UserMessageProps {
    id: string
    senderName: string;
    senderImage: string;
    messageText: string;
    messageDate: string; // Use ISO date string or formatted string
    rating: number,
    delete: {
        loading: boolean
        confirm: (id: string) => void
    }

}

const UserMessage: React.FC<UserMessageProps> = ({ id, senderName, senderImage, messageText, messageDate, rating, delete: { loading, confirm } }) => {
    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                marginTop: 2,
                p: 2,
                borderRadius: '16px',
                boxShadow: 3,
                backgroundColor: '#f0f4f8',
                position: 'relative',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: 20,
                    width: 0,
                    height: 0,
                    borderStyle: 'solid',
                    borderWidth: '10px 10px 0 0',
                    borderColor: '#f0f4f8 transparent transparent transparent',
                },
            }}
        >
            <Avatar src={senderImage} alt={senderName} sx={{ width: 48, height: 48, mr: 2 }} />
            <Box width={'100%'}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {senderName}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ mt: 0.5, mb: 1.5, wordWrap: 'break-word', color: 'text.secondary' }}
                >
                    {messageText}
                </Typography>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'end'}>
                    <div>
                        <Rating value={rating} readOnly size="small" sx={{ mb: 1 }} />
                        <Typography fontSize={'small'} sx={{ color: 'text.disabled' }} display={'flex'}>
                            <DateLabel date={messageDate} />
                        </Typography>
                    </div>
                    <IconButton disabled={loading} onClick={() => confirm(id)} size='small'><DeleteOutline color='error' fontSize='small' /></IconButton>
                </Stack>
            </Box>
        </Card>
    );
};
const NoteInput = ({ id }: any) => {
    const t = useTranslate(LANG_STUDENT, "notes");
    const {
        control,
        formState: { errors, isLoading },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: { rating: null, notes: '' }
    })
    const { mutate } = useCreate({
        resource: STUDENT_NOTE_URL
    })
    const [confirm, confirmEle] = useConfirm({
        onConfirm: (data) => {
            mutate({ values: { ...data, rating: parseInt(data.rating), student_id: id } }, {
                onSuccess: () => reset({ rating: null, notes: '' })
            })
        }
    })

    return (
        <form onSubmit={handleSubmit(data => {
            confirm(data)
        })}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: 2,
                    p: 2,
                    my: 2,
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    boxShadow: 1,
                    backgroundColor: "#f9f9f9",
                }}
            >
                <div style={{ width: '100%' }}>
                    <CSInput
                        placeholder="Type your note..."
                        multiline={2}
                        fullWidth
                        required
                        name='notes'
                        control={control}
                        errors={errors}
                        label={t('fields.notes')}
                    />
                </div>
                <Stack alignItems={'flex-end'} gap={1} width={150} >
                    <CSRating
                        label={t('fields.rating')}
                        name='rating'
                        required
                        control={control}
                        errors={errors}
                    />
                    <LoadingButton
                        type='submit'
                        fullWidth
                        loading={isLoading}
                        variant="outlined">
                        <Send />
                    </LoadingButton>
                </Stack>
            </Box>
            {confirmEle}
        </form>
    );
};


type StudentViewProps = {
    id?: string
}

const StudentNotes = ({ id }: StudentViewProps) => {

    const { data, isLoading } = useList<IStudentNote>({
        meta: { customQuery: { student_id: id, class: true, user: true } },
        resource: STUDENT_NOTE_URL,
    });
    const [
        {
            setOpen,
            loading,
        },
        ConfirmDialog
    ] = useConfirmButton({
        resource: STUDENT_NOTE_URL
    });
    const record = data?.data;
    return (
        <Container sx={{ mt: 4 }}>
            <NoteInput id={id} />
            {record?.length == 0 && <NoDataLabel />}
            {record?.map(note => {
                return <UserMessage
                    key={note.id}
                    id={note.id}
                    senderName={note.user?.name!}
                    senderImage={note.user?.image?.url ?? ''}
                    messageText={note.notes}
                    messageDate={note.created_at}
                    rating={note.rating}
                    delete={{
                        loading,
                        confirm: setOpen
                    }}
                />
            })}

            {ConfirmDialog}
        </Container>
    );
};

export default StudentNotes;
