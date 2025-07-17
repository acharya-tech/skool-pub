import { useTranslate } from "@hooks/useTranslate";
import { Grid2 as Grid, MenuItem, } from "@mui/material";
import { CSDatePicker, CSImage, CSInput, CSSelect } from "@components/input";
import { LANG_STUDENT } from "@common/constant";
import { StudentAcademicTypeEnum, StudentRelationEnum } from "../constant/enums";
import { StepFormGridInputProps } from "../interface/types";

export const AcademicGridInput = ({ name, field, index, control, errors }: StepFormGridInputProps) => {
    const t = useTranslate(LANG_STUDENT, "student_academic");
    return (
        <>
            <Grid size={3}>
                <CSImage
                    name={`${name}.${index}.image`}
                    label={t("fields.image")}
                    control={control}
                    height={150}
                    width={150}
                    error={errors[name]?.[index]?.['image'] ?? undefined}
                />
            </Grid>
            <Grid size={9}>
                <Grid container spacing={2}>
                    <Grid size={4}>
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
                            {Object.values(StudentAcademicTypeEnum).map((e: StudentAcademicTypeEnum) => {
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })}
                        </CSSelect>
                    </Grid>
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            name={`${name}.${index}.institute_name`}
                            label={t("fields.institute_name")}
                            required
                            control={control}
                            error={errors[name]?.[index]?.['institute_name'] ?? undefined}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSDatePicker
                            fullWidth
                            name={`${name}.${index}.passed_year_en`}
                            label={t("fields.passed_year_en")}
                            required
                            control={control}
                            error={errors[name]?.[index]?.['passed_year_en'] ?? undefined}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            name={`${name}.${index}.regid`}
                            label={t("fields.regid")}
                            control={control}
                            error={errors[name]?.[index]?.['regid'] ?? undefined}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            name={`${name}.${index}.symbol`}
                            label={t("fields.symbol")}
                            control={control}
                            error={errors[name]?.[index]?.['symbol'] ?? undefined}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            name={`${name}.${index}.score`}
                            label={t("fields.score")}
                            control={control}
                            error={errors[name]?.[index]?.['score'] ?? undefined}
                        />
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