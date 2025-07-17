import { useTranslate } from "@hooks/useTranslate";
import { Grid2 as Grid, MenuItem } from "@mui/material";
import { CSDatePicker, CSImage, CSInput, CSSelect } from "@components/input";
import { LANG_STUDENT } from "@common/constant";
import { BloodGroupEnum, CasteEnum, DisabilityTypeEnum, EthnicGroupEnum, GenderEnum, NationalityEnum, ReligionEnum } from "@common/all.enum";
import { FormGridInputProps } from "../../interface/types";

export const StudentGridEdit = ({ control, errors }: FormGridInputProps) => {
    const t = useTranslate(LANG_STUDENT, "info");

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
                    <Grid size={6}>
                        <CSInput
                            fullWidth
                            name="first_name"
                            label={t("fields.first_name")}
                            required
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={6}>
                        <CSInput
                            fullWidth
                            name="last_name"
                            label={t("fields.last_name")}
                            required
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={6}>
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
                    <Grid size={6}>
                        <CSDatePicker
                            fullWidth
                            name="dob_en"
                            label={t("fields.dob_en")}
                            required
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={6}>
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
                    <Grid size={6}>
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
                    <Grid size={6}>
                        <CSInput
                            fullWidth
                            name="address1"
                            label={t("fields.address1")}
                            required
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={6}>
                        <CSInput
                            fullWidth
                            name="address2"
                            label={t("fields.address2")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={6}>
                        <CSInput
                            fullWidth
                            name="uni_reg"
                            label={t("fields.uni_reg")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={6}>
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
                    <Grid size={6}>
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
                    <Grid size={6}>
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
                    <Grid size={6}>
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
                    <Grid size={6}>
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
                    <Grid size={6}>
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
                </Grid>
            </Grid>
        </>
    );
};
