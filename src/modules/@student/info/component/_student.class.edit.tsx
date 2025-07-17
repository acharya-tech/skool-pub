import { useTranslate } from "@hooks/useTranslate";
import { Grid2 as Grid } from "@mui/material";
import { CSAutoComplete, CSInput } from "@components/input";
import { LANG_STUDENT } from "@common/constant";
import { useAutocomplete } from "@refinedev/mui";
import { ACADEMIC_BATCH_LIST, ACADEMIC_HOSTEL_LIST, ACADEMIC_HOUSE_LIST, ACADEMIC_SECTION_LIST } from "@academic/constant/urls";
import { IBatch, IClass, IAcademicHouse, ISection } from "@academic/interface";
import { FormGridInputProps } from "../../interface/types";

export const StudentClassEdit = ({ control, errors }: FormGridInputProps) => {
    const t = useTranslate(LANG_STUDENT, "info");
    const { autocompleteProps: houseAutoProps } = useAutocomplete<IAcademicHouse>({
        resource: ACADEMIC_HOUSE_LIST,
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

    const { autocompleteProps: hostelAutoProps } = useAutocomplete<IAcademicHouse>({
        resource: ACADEMIC_HOSTEL_LIST,
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
        resource: ACADEMIC_BATCH_LIST,
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

    const { autocompleteProps: sectionAutoProps } = useAutocomplete<ISection>({
        resource: ACADEMIC_SECTION_LIST,
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
                    name="roll_no"
                    label={t("fields.roll_no")}
                    control={control}
                    errors={errors}
                />
            </Grid>
            <Grid size={4}>
                <CSAutoComplete
                    fullWidth
                    getOptionLabel={(r: any) => r.name}
                    autocompleteProps={sectionAutoProps}
                    name="section"
                    label={t("fields.section")}
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
                    getOptionLabel={(r: any) => r.name}
                    autocompleteProps={hostelAutoProps}
                    name="hostel"
                    label={t("fields.hostel")}
                    control={control}
                    errors={errors}
                />
            </Grid>
            <Grid size={4}>
                <CSAutoComplete
                    fullWidth
                    getOptionLabel={(r: any) => r.name}
                    autocompleteProps={houseAutoProps}
                    name="house"
                    label={t("fields.house")}
                    control={control}
                    errors={errors}
                />
            </Grid>
        </>
    );
};
