import { Divider, Grid2 as Grid, IconButton, MenuItem } from "@mui/material";
import { LANG_LIBRARY } from "@common/constant";
import { CSCheckboxYesNo, CSFile, CSInput, CSSelect } from "@components/input";
import { useTranslate } from "@hooks/useTranslate";
import { BookFileTypeEnum } from "../constant";
import { YesNoEnum } from "@common/all.enum";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

type EbookFormProps = {
    field: any
    index: number
    control: any;
    errors: any;
    name: string;
    remove: any
    setValue: any
}
export const EbookForm = ({ remove, setValue, field, index, control, errors, name }: EbookFormProps) => {
    const t = useTranslate(LANG_LIBRARY, "book");
    return <Grid container spacing={2} key={field.id}>
        <Grid size={11} alignContent={'end'}>
            <Grid container spacing={2}>
                <Grid size={12} >
                    <CSInput
                        fullWidth
                        label={t("fields.remark")}
                        name={`${name}.${index}.remark`}
                        control={control}
                        error={errors[name]?.[index]?.['remark'] ?? undefined}
                    />
                </Grid>
                <Grid size={12} >
                    <CSSelect
                        fullWidth
                        label={t("fields.type")}
                        required
                        name={`${name}.${index}.type`}
                        control={control}
                        error={errors[name]?.[index]?.['type'] ?? undefined}
                    >
                        {Object.values(BookFileTypeEnum).map(
                            (e: BookFileTypeEnum) => (
                                <MenuItem key={e} value={e}>
                                    {e}
                                </MenuItem>
                            )
                        )}
                    </CSSelect>
                </Grid>
                <Grid size={12} >
                    <CSCheckboxYesNo
                        label={t("fields.is_public")}
                        defaultValue={YesNoEnum.No}
                        name={`${name}.${index}.is_public`}
                        control={control}
                        error={errors[name]?.[index]?.['is_public'] ?? undefined}
                    />
                </Grid>
                <Grid size={12} mt={2}>
                    <CSFile
                        name={`${name}.${index}.files`}
                        size="small"
                        label={t("fields.file")}
                        required
                        height={30}
                        width={30}
                        onChange={(e: any) => { setValue(`${name}.${index}.files`, e) }}
                        control={control}
                        error={errors[name]?.[index]?.['files'] ?? undefined}
                        accept="application/pdf,application/epub+zip,application/x-mobipocket-ebook,audio/*,video/*,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    />
                </Grid>
            </Grid>
        </Grid>
        <Grid size={1} alignContent={'center'}>
            <IconButton
                onClick={() => remove(index)}
                color="error"
            >
                <RemoveCircleOutlineIcon />
            </IconButton>
        </Grid>
        <Grid size={12}>
            <Divider sx={{ mb: 1 }} />
        </Grid>
    </Grid>
};