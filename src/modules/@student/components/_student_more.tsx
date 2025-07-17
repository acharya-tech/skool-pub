import { useTranslate } from "@hooks/useTranslate";
import { Grid2 as Grid, MenuItem } from "@mui/material";
import { CSAutoComplete, CSImage, CSInput, CSSelect } from "@components/input";
import { LANG_STUDENT } from "@common/constant";
import { useAutocomplete } from "@refinedev/mui";
import { ACADEMIC_HOSTEL_LIST, ACADEMIC_HOUSE_LIST } from "@academic/constant/urls";
import { IHostel, IAcademicHouse } from "@academic/interface";
import { FormGridInputProps } from "../interface/types";
import { BloodGroupEnum, CasteEnum, DisabilityTypeEnum, EthnicGroupEnum, NationalityEnum, ReligionEnum } from "@common/all.enum";

export const StudentMoreGridInput = ({ control, errors }: FormGridInputProps) => {
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

    const { autocompleteProps: hostelAutoProps } = useAutocomplete<IHostel>({
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

    return (
        <>
            <Grid size={2}>
                <CSImage
                    name="image"
                    label={t("fields.image")}
                    control={control}
                    height={150}
                    width={150}
                    error={errors}
                />
            </Grid>
            <Grid size={10}>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            disabled
                            name="regid"
                            label={t("fields.regid")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            name="uni_reg"
                            label={t("fields.uni_reg")}
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
                            name="nationality"
                            label={t("fields.nationality")}
                            placeholder={t("fields.nationality")}
                            control={control}
                            errors={errors}
                        >
                            {Object.values(NationalityEnum).map((e: NationalityEnum) => {
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })}
                        </CSSelect>
                    </Grid>
                    <Grid size={4}>
                        <CSSelect
                            fullWidth
                            name="religion"
                            label={t("fields.religion")}
                            placeholder={t("fields.religion")}
                            control={control}
                            errors={errors}
                        >
                            {Object.values(ReligionEnum).map((e: ReligionEnum) => {
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })}
                        </CSSelect>
                    </Grid>
                    <Grid size={4}>
                        <CSSelect
                            fullWidth
                            name="caste"
                            label={t("fields.caste")}
                            placeholder={t("fields.caste")}
                            control={control}
                            errors={errors}
                        >
                            {Object.values(CasteEnum).map((e: CasteEnum) => {
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })}
                        </CSSelect>
                    </Grid>
                    <Grid size={4}>
                        <CSSelect
                            fullWidth
                            name="ethnic"
                            label={t("fields.ethnic")}
                            placeholder={t("fields.ethnic")}
                            control={control}
                            errors={errors}
                        >
                            {Object.values(EthnicGroupEnum).map((e: EthnicGroupEnum) => {
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })}
                        </CSSelect>
                    </Grid>
                    <Grid size={4}>
                        <CSSelect
                            fullWidth
                            name="disability"
                            label={t("fields.disability")}
                            placeholder={t("fields.disability")}
                            control={control}
                            errors={errors}
                        >
                            {Object.values(DisabilityTypeEnum).map((e: DisabilityTypeEnum) => {
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })}
                        </CSSelect>
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
