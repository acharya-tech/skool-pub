import { useTranslate } from "@hooks/useTranslate";
import { Grid2 as Grid, MenuItem } from "@mui/material";
import { CSAutoComplete, CSDatePicker, CSInput, CSSelect } from "@components/input";
import { LANG_STUDENT } from "@common/constant";
import { useAutocomplete } from "@refinedev/mui";
import { IBatch, IClass } from "@academic/interface";
import { GenderEnum } from "@common/all.enum";
import { FormGridInputProps } from "../interface/types";
import { ACADEMIC_BATCH_URL, ACADEMIC_CLASS_URL } from "@academic/constant/server.url";

export const StudentGridInput = ({ control, errors }: FormGridInputProps) => {
    const t = useTranslate(LANG_STUDENT, "info");
    const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
        meta: { customQuery: { program: true } },
        resource: ACADEMIC_CLASS_URL,
        onSearch: (value: string) => {
            return [
                {
                    field: "name",
                    operator: "eq",
                    value
                }
            ]
        }
    });

    const { autocompleteProps: batchAutoProps } = useAutocomplete<IBatch>({
        resource: ACADEMIC_BATCH_URL,
        onSearch: (value: string) => {
            return [
                {
                    field: "name",
                    operator: "eq",
                    value
                }
            ]
        }
    });

    return (
        <>
            <Grid size={4}>
                <CSInput
                    fullWidth
                    name="first_name"
                    label={t("fields.first_name")}
                    required
                    control={control}
                    errors={errors}
                />
            </Grid>
            <Grid size={4}>
                <CSInput
                    fullWidth
                    name="last_name"
                    label={t("fields.last_name")}
                    required
                    control={control}
                    errors={errors}
                />
            </Grid>
            <Grid size={4}>
                <CSSelect
                    fullWidth
                    name="gender"
                    label={t("fields.gender")}
                    placeholder={t("fields.gender")}
                    defaultValue={''}
                    required
                    control={control}
                    errors={errors}
                >
                    {Object.values(GenderEnum).map((e: GenderEnum) => {
                        return <MenuItem key={e} value={e}>{e}</MenuItem>
                    })}
                </CSSelect>
            </Grid>
            <Grid size={4}>
                <CSDatePicker
                    fullWidth
                    name="dob_en"
                    label={t("fields.dob_en")}
                    required
                    control={control}
                    errors={errors}
                />
            </Grid>
            <Grid size={4}>
                <CSAutoComplete
                    fullWidth
                    required
                    getOptionLabel={(r: any) => r.name}
                    autocompleteProps={batchAutoProps}
                    name="batch"
                    label={t("fields.batch")}
                    control={control}
                    errors={errors}
                />
            </Grid>
            <Grid size={4}>
                <CSAutoComplete
                    fullWidth
                    required
                    groupBy={(option: IClass) => option.program.name}
                    getOptionLabel={(r: any) => r.name}
                    autocompleteProps={classAutoProps}
                    name="class"
                    label={t("fields.class")}
                    control={control}
                    errors={errors}
                />
            </Grid>
            <Grid size={4}>
                <CSInput
                    fullWidth
                    name="phone"
                    label={t("fields.phone")}
                    required
                    rules={{
                        pattern: {
                            value: /^\+?[1-9]\d{9}$/,
                            message: 'Invalid phone number',
                        },
                    }}
                    control={control}
                    errors={errors}
                />
            </Grid>
            <Grid size={4}>
                <CSInput
                    fullWidth
                    type="email"
                    name="email"
                    label={t("fields.email")}
                    control={control}
                    errors={errors}
                    rules={{
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email address',
                        }
                    }}
                />
            </Grid>
            <Grid size={4}>
                <CSInput
                    fullWidth
                    name="address1"
                    label={t("fields.address1")}
                    required
                    control={control}
                    errors={errors}
                />
            </Grid>
        </>
    );
};
