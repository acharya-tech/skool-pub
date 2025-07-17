import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material"
import { IRepoCollection } from "../../interface"
import { useTranslate } from "@hooks/useTranslate"
import { LANG_REPO } from "@common/constant"
import { useCreate, useUpdate } from "@refinedev/core"
import { useState } from "react"
import LoadingButton from "@mui/lab/LoadingButton"
import { REPO_UPDATE_URL } from "../../constant/server.urls"
import { DirectoryExplorer } from "../directory"

type MoveProps = {
    selected: IRepoCollection
    onClose: () => void
}

/**
 * @component
 * Dialog to move a collection to a new location.
 * 
 * @prop {IRepoCollection} selected - The collection to move.
 * @prop {() => void} onClose - The function to call when the dialog is closed.
 * 
 * @returns A dialog with a title, a content area and a footer. The content area contains a directory explorer that allows the user to select a new location for the collection. The footer contains a cancel button and a save button. When the save button is clicked, the collection is moved to the selected location and the dialog is closed.
 */
export const MoveDialog = ({ selected, onClose }: MoveProps) => {
      
    const t = useTranslate(LANG_REPO, "dialog")
    const [expanded, setExpand] = useState<string|undefined>(undefined);
    const { mutate, isLoading } = useUpdate();
    const handleNewName = () => {
        mutate({
            resource: REPO_UPDATE_URL,
            id: selected.id,
            values: {
                parent_id: expanded,
                type: selected.type
            }
        }, {
            onSuccess: onClose
        })
    }
    return <Dialog
        fullWidth
        maxWidth={"sm"}
        open
        onClose={onClose}>
        <DialogTitle>
            <Stack direction={'row'} alignItems={'baseline'}>
                <Typography>
                    {t("titles.move")}
                </Typography>
                {' '}
                <Typography variant="subtitle2">{selected?.label ?? t('root')}</Typography>
            </Stack>
        </DialogTitle>
        <DialogContent>
            <DirectoryExplorer collection={selected} setExpended={setExpand} />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>{t("@actions.cancel")}</Button>
            <LoadingButton onClick={handleNewName} loading={isLoading} disabled={!expanded || isLoading}>{t("@actions.save")}</LoadingButton>
        </DialogActions>
    </Dialog>
}