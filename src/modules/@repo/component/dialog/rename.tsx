import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material"
import { IRepoCollection } from "../../interface"
import { useTranslate } from "@hooks/useTranslate"
import { LANG_REPO } from "@common/constant"
import { useUpdate } from "@refinedev/core"
import { useState } from "react"
import LoadingButton from "@mui/lab/LoadingButton"
import { REPO_UPDATE_URL } from "../../constant/server.urls"

type RenameProps = {
    collection: IRepoCollection
    onClose: () => void
}
export const RenameDialog = ({ collection, onClose }: RenameProps) => {
    const t = useTranslate(LANG_REPO, "dialog")
    const [newName, setName] = useState(collection.label)
    const { mutate, isLoading } = useUpdate();
    const handleNewName = () => {
        mutate({
            resource: REPO_UPDATE_URL,
            id: collection.id,
            values: {
                label: newName
            }
        }, {
            onSuccess: onClose
        })
    }
    return <Dialog
        open
        onClose={onClose}
        fullWidth
        maxWidth={"md"}
    >
        <DialogTitle>
            <Stack direction={'row'} alignItems={'baseline'}>
                <Typography>
                    {t("titles.rename")}
                </Typography>
                {' '}
                <Typography variant="subtitle2">{collection.label}</Typography>
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