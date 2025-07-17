import { useTranslate } from "@hooks/useTranslate";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import {
    CSAutoComplete,
    CSDatePicker,
    CSInput,
    CSMultiSelect,
    CSSelect,
} from "@components/input";
import { useAutocomplete } from "@refinedev/mui";
import {
    ACADEMIC_CLASS_LIST,
    ACADEMIC_PROGRAM_LIST,
    ACADEMIC_SECTION_LIST,
    ACADEMIC_HOUSE_LIST,
    ACADEMIC_HOSTEL_LIST,
} from "@academic/constant/urls";
import {
    BloodGroupEnum,
    CasteEnum,
    DisabilityTypeEnum,
    EthnicGroupEnum,
    GenderEnum,
    NationalityEnum,
    ReligionEnum,
} from "@common/all.enum";
import { IClass, IProgram, ISection, IAcademicHouse, IHostel, IBatch } from "@academic/interface";
import { IStudentFilter } from "../interface";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { LANG_STUDENT } from "@common/constant";
import { useEffect } from "react";
import { StudentStateEnum } from "../constant";
import { ACADEMIC_BATCH_URL } from "@academic/constant/server.url";

type StudentFilterFormProps = {
    setFilter: (filter: IStudentFilter | undefined) => void
    onClose: () => void,
    isLoading: boolean,
    defaultValues: IStudentFilter
}

export const StudentFilterForm = ({ defaultValues, setFilter, isLoading, onClose }: StudentFilterFormProps) => {
    const t = useTranslate(LANG_STUDENT, "info");
    const { autocompleteProps: programAutoProps } = useAutocomplete<IProgram>({
        resource: ACADEMIC_PROGRAM_LIST,
    });

    const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
        resource: ACADEMIC_CLASS_LIST,
    });

    const { autocompleteProps: sectionAutoProps } = useAutocomplete<ISection>({
        resource: ACADEMIC_SECTION_LIST,
    });

    const { autocompleteProps: houseAutoProps } = useAutocomplete<IAcademicHouse>({
        resource: ACADEMIC_HOUSE_LIST,
    });

    const { autocompleteProps: hostelAutoProps } = useAutocomplete<IHostel>({
        resource: ACADEMIC_HOSTEL_LIST,
    });

    const { autocompleteProps: batchAutoProps } = useAutocomplete<IBatch>({
        resource: ACADEMIC_BATCH_URL,
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<IStudentFilter>({
        disabled: isLoading,
        defaultValues: { ...defaultValues }
    });

    return (
        <form
            onSubmit={handleSubmit((data: IStudentFilter) => {
                const { program, section, sclass, batch, hostel, house, ...rest } = data
                setFilter({
                    ...rest,
                    batch_id: batch?.id,
                    program_id: program?.id,
                    section_id: section?.id,
                    class_id: sclass?.id,
                    hostel_id: hostel?.id,
                    house_id: house?.id,
                });
            })}
        >
            <Grid container spacing={2}>
                <Grid size={3}>
                    <CSInput
                        fullWidth
                        name="regid"
                        label={t("fields.regid")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSInput
                        fullWidth
                        name="first_name"
                        label={t("fields.first_name")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSInput
                        fullWidth
                        name="last_name"
                        label={t("fields.last_name")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSAutoComplete
                        fullWidth
                        autocompleteProps={programAutoProps}
                        getOptionLabel={(r: IProgram) => r.name}
                        name="program"
                        label={t("labels.program")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSAutoComplete
                        fullWidth
                        autocompleteProps={classAutoProps}
                        getOptionLabel={(r: IClass) => r.name}
                        name="sclass"
                        label={t("fields.class")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSAutoComplete
                        fullWidth
                        autocompleteProps={batchAutoProps}
                        getOptionLabel={(r: IBatch) => r.name}
                        name="batch"
                        label={t("fields.batch")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSInput
                        fullWidth
                        name="phone"
                        label={t("fields.phone")}
                        rules={{
                            pattern: {
                                value: /^\+?[1-9]\d{9}$/,
                                message: t("errors.invalid_phone"),
                            },
                        }}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSSelect
                        fullWidth
                        name="gender"
                        label={t("fields.gender")}
                        placeholder={t("fields.gender")}
                        defaultValue={""}
                        control={control}
                        errors={errors}
                    >
                        {Object.values(GenderEnum).map((e: GenderEnum) => (
                            <MenuItem key={e} value={e}>
                                {e}
                            </MenuItem>
                        ))}
                    </CSSelect>
                </Grid>
                <Grid size={3}>
                    <CSAutoComplete
                        fullWidth
                        autocompleteProps={sectionAutoProps}
                        getOptionLabel={(r: ISection) => r.name}
                        name="section"
                        label={t("fields.section")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSInput
                        fullWidth
                        name="roll_no"
                        label={t("fields.roll_no")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSInput
                        fullWidth
                        name="address1"
                        label={t("fields.address1")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSAutoComplete
                        fullWidth
                        autocompleteProps={houseAutoProps}
                        getOptionLabel={(r: IAcademicHouse) => r.name}
                        name="house"
                        label={t("fields.house")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSAutoComplete
                        fullWidth
                        autocompleteProps={hostelAutoProps}
                        getOptionLabel={(r: IHostel) => r.name}
                        name="hostel"
                        label={t("fields.hostel")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSSelect
                        fullWidth
                        name="blood_group"
                        label={t("fields.blood_group")}
                        defaultValue={""}
                        control={control}
                        errors={errors}
                    >
                        {Object.values(BloodGroupEnum).map((e: BloodGroupEnum) => (
                            <MenuItem key={e} value={e}>
                                {e}
                            </MenuItem>
                        ))}
                    </CSSelect>
                </Grid>
                <Grid size={3}>
                    <CSInput
                        fullWidth
                        name="symbol"
                        label={t("fields.symbol")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSInput
                        fullWidth
                        name="uni_reg"
                        label={t("fields.uni_reg")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSInput
                        fullWidth
                        name="email"
                        label={t("fields.email")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSSelect
                        fullWidth
                        name="caste"
                        label={t("fields.caste")}
                        defaultValue={""}
                        control={control}
                        errors={errors}
                    >
                        {Object.values(CasteEnum).map((e: CasteEnum) => (
                            <MenuItem key={e} value={e}>
                                {e}
                            </MenuItem>
                        ))}
                    </CSSelect>
                </Grid>
                <Grid size={3}>
                    <CSSelect
                        fullWidth
                        name="disability"
                        label={t("fields.disability")}
                        defaultValue={""}
                        control={control}
                        errors={errors}
                    >
                        {Object.values(DisabilityTypeEnum).map((e: DisabilityTypeEnum) => (
                            <MenuItem key={e} value={e}>
                                {e}
                            </MenuItem>
                        ))}
                    </CSSelect>
                </Grid>
                <Grid size={3}>
                    <CSSelect
                        fullWidth
                        name="religion"
                        label={t("fields.religion")}
                        defaultValue={""}
                        control={control}
                        errors={errors}
                    >
                        {Object.values(ReligionEnum).map((e: ReligionEnum) => (
                            <MenuItem key={e} value={e}>
                                {e}
                            </MenuItem>
                        ))}
                    </CSSelect>
                </Grid>
                <Grid size={3}>
                    <CSSelect
                        fullWidth
                        name="ethnic"
                        label={t("fields.ethnic")}
                        defaultValue={""}
                        control={control}
                        errors={errors}
                    >
                        {Object.values(EthnicGroupEnum).map((e: EthnicGroupEnum) => (
                            <MenuItem key={e} value={e}>
                                {e}
                            </MenuItem>
                        ))}
                    </CSSelect>
                </Grid>
                <Grid size={3}>
                    <CSSelect
                        fullWidth
                        name="nationality"
                        label={t("fields.nationality")}
                        defaultValue={""}
                        control={control}
                        errors={errors}
                    >
                        {Object.values(NationalityEnum).map((e: NationalityEnum) => (
                            <MenuItem key={e} value={e}>
                                {e}
                            </MenuItem>
                        ))}
                    </CSSelect>
                </Grid>
                <Grid size={3}>
                    <CSMultiSelect
                        fullWidth
                        name="state"
                        label={t("fields.state")}
                        defaultValue={[]}
                        control={control}
                        errors={errors}
                    >
                        {Object.values(StudentStateEnum).map((e: StudentStateEnum) => (
                            <MenuItem key={e} value={e}>
                                {e}
                            </MenuItem>
                        ))}
                    </CSMultiSelect>
                </Grid>
                <Grid size={3}>
                    <CSDatePicker
                        fullWidth
                        name="dob_en"
                        label={t("fields.dob_en")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={3}>
                    <CSDatePicker
                        fullWidth
                        name="admission_date_en"
                        label={t("fields.admission_date_en")}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid size={12}>
                    <Divider />
                </Grid>
                <Grid size={12}>
                    <Stack direction={'row'} justifyContent={'flex-end'} gap={2}>
                        <Button
                            color="secondary"
                            disabled={isLoading}
                            variant="outlined"
                            onClick={onClose}>{t("@buttons.close")}</Button>
                        <Button
                            color="error"
                            disabled={isLoading}
                            variant="outlined"
                            onClick={() => {
                                reset();
                                setFilter(undefined)
                            }}>{t("@buttons.reset")}</Button>
                        <LoadingButton
                            loading={isLoading}
                            color="success"
                            variant="contained"
                            type="submit"
                        >{t("@buttons.filter")}</LoadingButton>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    )
}