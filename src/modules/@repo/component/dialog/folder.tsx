import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material"
import { IRepoCollection } from "../../interface"
import { useTranslate } from "@hooks/useTranslate"
import { LANG_REPO } from "@common/constant"
import { useCreate, useUpdate } from "@refinedev/core"
import { useEffect, useState } from "react"
import LoadingButton from "@mui/lab/LoadingButton"
import { REPO_UPDATE_URL } from "../../constant/server.urls"
import { CollectionType } from "../../constant/enum"

type NewFolderProps = {
    selected: IRepoCollection | undefined
    onClose: () => void
}

export const NewFolderDialog = ({ selected, onClose }: NewFolderProps) => {
    const t = useTranslate(LANG_REPO, "dialog")
    const [newName, setName] = useState<string>("")
    const { mutate, isLoading } = useCreate();
    const handleNewName = () => {
        mutate({
            resource: REPO_UPDATE_URL,
            values: {
                parent: selected,
                label: newName,
                type: CollectionType.Folder
            }
        }, {
            onSuccess: onClose
        })
    }
    useEffect(() => {
        return () => setName("")
    }, [])
    return <Dialog
        fullWidth
        maxWidth={"sm"}
        open
        onClose={onClose}>
        <DialogTitle>
            <Stack direction={'row'} alignItems={'baseline'}>
                <Typography>
                    {t("titles.newFolder")}
                </Typography>
                {' '}
                <Typography variant="subtitle2">{selected?.label ?? t('root')}</Typography>
            </Stack>
        </DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label={t("inputs.rename")}
                fullWidth
                disabled={isLoading}
                required
                value={newName}
                onChange={(e) => setName(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>{t("@actions.cancel")}</Button>
            <LoadingButton onClick={handleNewName} loading={isLoading} disabled={!newName.trim() || isLoading}>{t("@actions.save")}</LoadingButton>
        </DialogActions>
    </Dialog>
}