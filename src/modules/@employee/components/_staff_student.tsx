import { useTranslate } from "@hooks/useTranslate";
import { Grid2 as Grid, MenuItem, } from "@mui/material";
import { CSAutoComplete, CSSelect } from "@components/input";
import { LANG_EMPLOYEE } from "@common/constant";
import { EmployeeRelationEnum } from "../constant/enums";
import { StepFormGridInputProps } from "../interface/types";
import { useAutocomplete } from "@refinedev/mui";
import { IStudentInfo } from "@student/interface";
import { STUDENT_INFO_URL } from "@student/constant";

export const StaffStudentGridInput = ({ name, field, index, control, errors }: StepFormGridInputProps) => {
    const t = useTranslate(LANG_EMPLOYEE, "student");
    
    const { autocompleteProps: studentAutoProps } = useAutocomplete<IStudentInfo>({
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
                    autocompleteProps={studentAutoProps}
                    name={`${name}.${index}.student`}
                    label={t("fields.student")}
                    renderLabel={(option: any) => {
                        return `${option?.full_name} | ${option?.regid} | ${option.class?.name}`
                    }}
                    control={control}
                    error={errors[name]?.[index]?.['student'] ?? undefined}
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
                    {Object.values(EmployeeRelationEnum).map((e: EmployeeRelationEnum) => {
                        return <MenuItem key={e} value={e}>{e}</MenuItem>
                    })}
                </CSSelect>
            </Grid>
        </>
    );
};
