import { useTranslate } from "@hooks/useTranslate";
import { Grid2 as Grid, MenuItem } from "@mui/material";
import { CSAutoComplete, CSDatePicker, CSImage, CSInput, CSSelect } from "@components/input";
import { LANG_EMPLOYEE } from "@common/constant";
import { useAutocomplete } from "@refinedev/mui";
import { BloodGroupEnum, GenderEnum } from "@common/all.enum";
import { FormGridInputProps } from "../interface/types";
import { IDepartment, IPost } from "../interface";
import { ContractTypeEnum, EMPLOYEE_DEPARTMENT_LIST, EMPLOYEE_DEPARTMENT_URL, EMPLOYEE_POST_LIST, EMPLOYEE_POST_URL, EmployeeTypeEnum, EmployeeWorkShiftEnum } from "../constant";

export const StaffGridInput = ({ control, errors }: FormGridInputProps) => {
    const t = useTranslate(LANG_EMPLOYEE, "staff");
    const { autocompleteProps: postAutoProps } = useAutocomplete<IPost>({
        resource: EMPLOYEE_POST_URL,
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

    const { autocompleteProps: departmentAutoProps } = useAutocomplete<IDepartment>({
        resource: EMPLOYEE_DEPARTMENT_URL,
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
            <Grid size={3}>
                <CSImage
                    name="image"
                    label={t("fields.image")}
                    control={control}
                    height={150}
                    width={150}
                    error={errors}
                    direction="column"
                />
            </Grid>
            <Grid size={9}>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            name="name"
                            label={t("fields.name")}
                            required
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSDatePicker
                            fullWidth
                            name="date_of_birth"
                            label={t("fields.date_of_birth")}
                            required
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSDatePicker
                            fullWidth
                            name="date_of_join"
                            label={t("fields.date_of_join")}
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
                        <CSSelect
                            fullWidth
                            required
                            name="blood_group"
                            label={t("fields.blood_group")}
                            placeholder={t("fields.emp_type")}
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
                            required
                            name="emp_type"
                            label={t("fields.emp_type")}
                            placeholder={t("fields.emp_type")}
                            defaultValue={EmployeeTypeEnum.Teaching}
                            control={control}
                            errors={errors}
                        >
                            {Object.values(EmployeeTypeEnum).map((e: EmployeeTypeEnum) => {
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })}
                        </CSSelect>
                    </Grid>
                    <Grid size={4}>
                        <CSSelect
                            fullWidth
                            required
                            name="contract_type"
                            label={t("fields.contract_type")}
                            placeholder={t("fields.contract_type")}
                            defaultValue={ContractTypeEnum.Probation}
                            control={control}
                            errors={errors}
                        >
                            {Object.values(ContractTypeEnum).map((e: ContractTypeEnum) => {
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })}
                        </CSSelect>
                    </Grid>
                    <Grid size={4}>
                        <CSSelect
                            fullWidth
                            required
                            name="work_shift"
                            label={t("fields.work_shift")}
                            placeholder={t("fields.work_shift")}
                            defaultValue={EmployeeWorkShiftEnum.Day}
                            control={control}
                            errors={errors}
                        >
                            {Object.values(EmployeeWorkShiftEnum).map((e: EmployeeWorkShiftEnum) => {
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })}
                        </CSSelect>
                    </Grid>
                    <Grid size={4}>
                        <CSAutoComplete
                            fullWidth
                            required
                            getOptionLabel={(r: IDepartment) => r.name}
                            autocompleteProps={departmentAutoProps}
                            name="department"
                            label={t("fields.department")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSAutoComplete
                            fullWidth
                            required
                            getOptionLabel={(r: any) => r.name}
                            autocompleteProps={postAutoProps}
                            name="post"
                            label={t("fields.post")}
                            control={control}
                            errors={errors}
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
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            name="address2"
                            label={t("fields.address2")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
