import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material"
import { IRepoCollection, IRepoFileUpload } from "../../interface"
import { useTranslate } from "@hooks/useTranslate"
import { LANG_REPO } from "@common/constant"
import { HttpError, useInvalidate } from "@refinedev/core"
import LoadingButton from "@mui/lab/LoadingButton"
import { REPO_COLLECTION_URL, REPO_UPLOAD_MANY_FILES_URL } from "../../constant/server.urls"
import { CSFile, CSHiddenInput, CSImage } from "@components/input"
import { Nullable } from "src/interfaces"
import { useForm } from "@refinedev/react-hook-form"
import { CollectionType } from "../../constant/enum"

type UploadProps = {
    selected: IRepoCollection | undefined
    onClose: () => void
}
export const UploadDialog = ({ selected, onClose }: UploadProps) => {
    const t = useTranslate(LANG_REPO, "dialog")
    const invalidate = useInvalidate()
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isLoading },
        refineCore: { onFinish },
        saveButtonProps,
        watch
    } = useForm<IRepoFileUpload, HttpError, Nullable<IRepoFileUpload>>({
        refineCoreProps: {
            redirect: false,
            resource: REPO_UPLOAD_MANY_FILES_URL,
            onMutationSuccess: () => {
                invalidate({
                    resource: REPO_COLLECTION_URL,
                    invalidates: ["all"]
                })
                onClose()
            }
        }
    });

    const files = watch('files')

    return <Dialog
        open
        onClose={onClose}
        fullWidth
        maxWidth={"sm"}
    >
        <form
            onSubmit={handleSubmit((data) => {
                onFinish(data);
            })}
        >
            <DialogTitle>
                <Stack direction={'row'} alignItems={'baseline'}>
                    <Typography>
                        {t("titles.upload")}
                    </Typography>
                    {' '}
                    <Typography variant="subtitle2">{selected?.label ?? t('root')}</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <CSHiddenInput name="parent" control={control} defaultValue={selected} />
                <CSHiddenInput name="type" control={control} defaultValue={CollectionType.File} />
                <CSFile
                    name="files"
                    label={t("inputs.upload")}
                    control={control}
                    height={50}
                    width={50}
                    errors={errors}
                    onChange={(e: any) => { setValue("files", e) }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t("@buttons.cancel")}</Button>
                <LoadingButton {...saveButtonProps} loading={isLoading} disabled={isLoading || !(files?.length)}>{t("@buttons.upload")}</LoadingButton>
            </DialogActions>
        </form>
    </Dialog>
}