import { Box, Divider, IconButton, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { IRepoCollection } from '../../interface';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_REPO } from '@common/constant';
import { formatBytes } from '@utils/format-filesize';
import { DateTimeLabel } from '@components/label/date.label';
import { CollectionType } from '../../constant/enum';
import FolderIcon from "@mui/icons-material/Folder";
import { FolderChip, UserChip } from '@components/other/user.chip';
import { useEffect, useState } from 'react';
import { useOne } from '@refinedev/core';
import { REPO_COLLECTION_URL } from '../../constant/server.urls';
import { NotSetLabel } from '@components/label/notset.label';
import { TextLabel } from '@components/other/text.label';
import { YesNoEnum } from '@common/all.enum';
import { IUser } from 'src/interfaces';
type RestoreProps = {
    selected: IRepoCollection
    onClose: () => void
}

const SharedWith = ({ shared, isLoading }: { shared: IUser[] | undefined, isLoading: boolean }) => {
    if (isLoading) {
        return <Skeleton variant="text" width={130} />
    }
    if (!shared || shared.length == 0) {
        return <NotSetLabel />
    }
    return shared.map((item, index) => {
        return (
            <UserChip name={item.name} image={item.image!} />
        )
    })
}
export const PropertiesDialog = ({ selected, onClose }: RestoreProps) => {
    const t = useTranslate(LANG_REPO, "properties")
    const [collection, setCollection] = useState<IRepoCollection>(selected)
    const { data, isLoading } = useOne<IRepoCollection>({
        resource: REPO_COLLECTION_URL,
        id: selected.id,
        meta: {
            customQuery: { is_deleted: YesNoEnum.No, user: true, parent: true, shared: true, file: true }
        }
    })
    useEffect(() => {
        if (data) {
            setCollection(data.data)
        }
        return () => setCollection({} as IRepoCollection)
    }, [data, selected])

    let parent = <Skeleton width={120} variant='text' />
    if (collection.path === ".") {
        parent = <FolderChip name={t('root')} />
    } else if (collection.parent) {
        parent = <FolderChip name={collection.parent.label} />
    }
    return (
        <Paper
            elevation={2}
            sx={{ padding: "1rem", ml: 2, height: '100%', transition: "width 0.3s ease", width: 300, position: "fixed", right: 0, top: 0 }}
        >
            <IconButton
                onClick={onClose}
                size='small'
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 1000,
                    backgroundColor: 'white',
                    boxShadow: 2,
                }}
            >
                <CloseIcon fontSize='small' />
            </IconButton>
            <Box mt={2}>
                <Stack
                    alignItems={"center"}
                    justifyContent={"center"}
                    width="100%"
                    height={200}
                >
                    {collection.type == CollectionType.File ? (
                        <Box
                            component="img"
                            src={collection.file?.url} // Placeholder image
                            alt={collection.file?.name}
                            maxWidth="100%"
                            maxHeight="100%"
                            sx={{ borderRadius: 2, boxShadow: 2, marginBottom: 2 }}
                        />
                    ) : (
                        <FolderIcon sx={{
                            fontSize: "64px",
                            color: "#3f51b5",
                            width: "50%",
                            height: "auto"
                        }} />
                    )}
                </Stack>
                <Typography variant="h6">{collection.label}</Typography>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={1}>
                    {collection.type == CollectionType.File && (
                        <>
                            <Box>
                                <Typography variant='subtitle2'>{t('type')}</Typography>
                                <Typography variant='body2' color="textSecondary">{collection?.file?.type}</Typography>
                            </Box>
                            <Box>
                                <Typography variant='subtitle2'>{t('size')}</Typography>
                                <Typography variant='body2' color="textSecondary">{formatBytes(collection?.file?.size!)}</Typography>
                            </Box>
                        </>
                    )}
                    {collection.type == CollectionType.Folder && (
                        <Box>
                            <Typography variant='subtitle2'>{t('type')}</Typography>
                            <Typography variant='body2' color="textSecondary">{t('folder')}</Typography>
                        </Box>
                    )}
                    <Box>
                        <Typography variant='subtitle2'>{t('access')}</Typography>
                        <Typography variant='body2' color="textSecondary">{collection?.access_type}</Typography>
                    </Box>
                    <Box>
                        <Typography variant='subtitle2'>{t('owner')}</Typography>
                        <TextLabel
                            text={collection?.user?.name}
                            isLoading={isLoading}
                            TypoProps={{ variant: 'body2', color: "textSecondary" }} />
                    </Box>
                    <Box>
                        <Typography variant='subtitle2'>{t('parent')}</Typography>
                        {parent}
                    </Box>
                    <Box>
                        <Typography variant='subtitle2'>{t('shared')}</Typography>
                        <Typography variant='body2' color="textSecondary">
                            <SharedWith shared={collection?.shared} isLoading={isLoading} />
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='subtitle2'>{t('date')}</Typography>
                        <Typography variant='body2' color="textSecondary"><DateTimeLabel date={collection?.create_at} /></Typography>
                    </Box>
                </Stack>
            </Box>
        </Paper>
    );
};

