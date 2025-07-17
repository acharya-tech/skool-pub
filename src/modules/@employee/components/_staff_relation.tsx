import { useTranslate } from "@hooks/useTranslate";
import { Grid2 as Grid, MenuItem, } from "@mui/material";
import { CSAutoComplete, CSSelect } from "@components/input";
import { LANG_EMPLOYEE } from "@common/constant";
import { EmployeeRelationEnum } from "../constant/enums";
import { StepFormGridInputProps } from "../interface/types";
import { useAutocomplete } from "@refinedev/mui";
import { IStaff } from "../interface";
import { EMPLOYEE_STAFF_URL } from "../constant";

export const StaffRelationGridInput = ({ name, field, index, control, errors }: StepFormGridInputProps) => {
    const t = useTranslate(LANG_EMPLOYEE, "staff_relation");
    const { autocompleteProps: staffRelationAutoProps } = useAutocomplete<IStaff>({
        meta: { customQuery: { } },
        resource: EMPLOYEE_STAFF_URL,
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
            <Grid size={8}>
                <CSAutoComplete
                    fullWidth
                    required
                    getOptionLabel={(option: any) => `${option?.name}`}
                    autocompleteProps={staffRelationAutoProps}
                    name={`${name}.${index}.relatedStaff`}
                    label={t("fields.staff")}
                    renderLabel={(option: any) => {
                        return `${option?.name} `
                    }}
                    control={control}
                    error={errors[name]?.[index]?.['relatedStaff'] ?? undefined}
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
