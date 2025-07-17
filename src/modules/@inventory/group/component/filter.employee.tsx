import { Paper, Typography } from "@mui/material";
import { Grid2 as Grid } from "@mui/material";
import { HttpError, useList } from "@refinedev/core";
import { useAutocomplete } from "@refinedev/mui";
import { LANG_INVENTORY } from "@common/constant";
import { CSAutoComplete } from "@components/input";
import { useTranslate } from "@hooks/useTranslate";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StoreGroupType } from "../../constant";
import { IStoreGroupMemberCreate } from "../../interface";
import { EMPLOYEE_STAFF_LIST } from "@employee/constant";
import { IStaff } from "@employee/interface";

type FilterEmployeeProps = {
    setMembers: any
}
export const FilterEmployee = ({
    setMembers
}: FilterEmployeeProps) => {
    const t = useTranslate(LANG_INVENTORY, "groups");
    // const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
    //     meta: { customQuery: { program: true, } },
    //     resource: EMPLOYEE_DEPARTMENT_LIST,
    //     onSearch: (value: string) => {
    //         return [
    //             {
    //                 field: "name",
    //                 operator: "eq",
    //                 value
    //             }
    //         ]
    //     }
    // });

    const {
        control,
        watch,
        formState: { errors },
    } = useForm();

    const filterDepartment = watch("filterDepartment");

    const { data, isLoading } = useList<IStaff, HttpError>({
        resource: EMPLOYEE_STAFF_LIST,
        // meta: {
        //     customQuery: {
        //         class: true,
        //     }
        // },
        // filters: [
        //     {
        //         field: "name",
        //         operator: "eq",
        //         value: filterDepartment?.name
        //     },
        // ],
        // queryOptions: {
        //     enabled: Boolean(filterDepartment?.name),
        // }
    });

    useEffect(() => {
        if (data) {
            setMembers(data.data.map(emp => {
                return {
                    employee: emp,
                    id: emp.id,
                    type: StoreGroupType.Employee
                } as IStoreGroupMemberCreate
            }));
        }
    }, [data, setMembers]);

    return <Grid container spacing={2} >
        <Grid size={12}>
            <Typography variant="subtitle2" >{t('labels.filter')}</Typography>
        </Grid>
        {/* <Grid size={6}>
            <CSAutoComplete
                fullWidth
                required
                groupBy={(option: IClass) => option.program.name}
                getOptionLabel={(r: any) => r.name}
                autocompleteProps={classAutoProps}
                name="filterClass"
                label={t("labels.class")}
                control={control}
                errors={errors}
            />
        </Grid> */}
    </Grid>
};
