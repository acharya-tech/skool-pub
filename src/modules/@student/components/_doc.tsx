import { useTranslate } from "@hooks/useTranslate";
import { Grid2 as Grid, MenuItem, } from "@mui/material";
import { CSImage, CSInput, CSSelect } from "@components/input";
import { LANG_STUDENT } from "@common/constant";
import { StepFormGridInputProps } from "../interface/types";
import { StudentDocEnum } from "../constant";

export const DocGridInput = ({ name, field, index, control, errors }: StepFormGridInputProps) => {
    const t = useTranslate(LANG_STUDENT, "student_doc");
    return (
        <>
            <Grid size={3}>
                <CSImage
                    name={`${name}.${index}.image`}
                    label={t("fields.image")}
                    control={control}
                    height={75}
                    width={150}
                    error={errors[name]?.[index]?.['image'] ?? undefined}
                />
            </Grid>
            <Grid size={9}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <CSSelect
                            fullWidth
                            name={`${name}.${index}.type`}
                            defaultValue={''}
                            label={t("fields.type")}
                            placeholder={t("fields.type")}
                            required
                            control={control}
                            error={errors[name]?.[index]?.['type'] ?? undefined}
                        >
                            {Object.values(StudentDocEnum).map((e: StudentDocEnum) => {
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })}
                        </CSSelect>
                    </Grid>
                    <Grid size={12}>
                        <CSInput
                            fullWidth
                            name={`${name}.${index}.remark`}
                            label={t("fields.remark")}
                            control={control}
                            error={errors[name]?.[index]?.['remark'] ?? undefined}
                        />
                    </Grid>
                </Grid>
            </Grid>

        </>
    );
};