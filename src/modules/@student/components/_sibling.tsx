import { useTranslate } from "@hooks/useTranslate";
import { Grid2 as Grid, MenuItem, } from "@mui/material";
import { CSAutoComplete, CSInput, CSSelect } from "@components/input";
import { LANG_STUDENT } from "@common/constant";
import { StudentRelationEnum } from "../constant/enums";
import { StepFormGridInputProps } from "../interface/types";
import { useAutocomplete } from "@refinedev/mui";
import { IStudentInfo } from "../interface";
import { STUDENT_INFO_URL } from "../constant";

export const SiblingGridInput = ({ name, field, index, control, errors }: StepFormGridInputProps) => {
    const t = useTranslate(LANG_STUDENT, "sibling");
    const { autocompleteProps: siblingAutoProps } = useAutocomplete<IStudentInfo>({
        meta: { customQuery: { class: true,} },
        resource: STUDENT_INFO_URL,
        onSearch: (value: string) => {
            return [
                {
                    field: "full_name",
                    operator: "eq",
                    value
                },
                {
                    field: "regid",
                    operator: "eq",
                    value
                }
            ]
        }
    });
    return (
        <>
            <Grid size={8}>
                <CSAutoComplete
                    fullWidth
                    required
                    getOptionLabel={(option: any) => `${option?.full_name} | ${option?.regid} | ${option.class?.name}`}
                    autocompleteProps={siblingAutoProps}
                    name={`${name}.${index}.sibling`}
                    label={t("fields.sibling")}
                    renderLabel={(option: any) => {
                        return `${option?.full_name} | ${option?.regid} | ${option.class?.name}`
                    }}
                    control={control}
                    error={errors[name]?.[index]?.['sibling'] ?? undefined}
                />
            </Grid>
            <Grid size={4}>
                <CSSelect
                    fullWidth
                    name={`${name}.${index}.relation`}
                    defaultValue={''}
                    label={t("fields.relation")}
                    placeholder={t("fields.relation")}
                    required
                    control={control}
                    errors={errors}
                >
                    {Object.values(StudentRelationEnum).map((e: StudentRelationEnum) => {
                        return <MenuItem key={e} value={e}>{e}</MenuItem>
                    })}
                </CSSelect>
            </Grid>
        </>
    );
};
