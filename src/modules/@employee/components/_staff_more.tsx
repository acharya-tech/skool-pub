import { useTranslate } from "@hooks/useTranslate";
import { Grid2 as Grid } from "@mui/material";
import { CSInput, CSSelect } from "@components/input";
import { LANG_EMPLOYEE } from "@common/constant";
import { FormGridInputProps } from "../interface/types";
import { BloodGroupEnum, MaritalStatusEnum } from "@common/all.enum";
import { MenuItem } from "@mui/material";

export const StaffMoreGridInput = ({ control, errors }: FormGridInputProps) => {
    const t = useTranslate(LANG_EMPLOYEE, "staff");

    return (
        <>
            <Grid size={12}>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            name="licenses_no"
                            label={t("fields.licenses_no")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSSelect
                            fullWidth
                            name="blood_group"
                            label={t("fields.blood_group")}
                            placeholder={t("fields.blood_group")}
                            defaultValue={BloodGroupEnum.Unknown}
                            control={control}
                            errors={errors}
                        >
                            {Object.values(BloodGroupEnum).map((e: BloodGroupEnum) => {
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })}
                        </CSSelect>
                    </Grid>
                    <Grid size={4}>
                        <CSSelect
                            fullWidth
                            name="married"
                            label={t("fields.married")}
                            placeholder={t("fields.married")}
                            defaultValue={MaritalStatusEnum.Single}
                            control={control}
                            errors={errors}
                        >
                            {Object.values(MaritalStatusEnum).map((e: MaritalStatusEnum) => {
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })}
                        </CSSelect>
                    </Grid>
                    <Grid size={12}>
                        <CSInput
                            fullWidth
                            multiline={5}
                            name="qualification"
                            label={t("fields.qualification")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
