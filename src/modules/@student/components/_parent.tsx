import {
    HttpError
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, FormControlLabel, Grid2 as Grid, MenuItem, Radio, Stack, Typography } from "@mui/material";
import { CSInput, CSRadio, CSSelect } from "@components/input";
import { LANG_STUDENT } from "@common/constant";
import { BloodGroupEnum, GenderEnum } from "@common/all.enum";
import { IParent } from "../interface";
import { STUDENT_PARENT_URL } from "@student/constant";
import { useRefineForm } from "@hooks/useForm";


export const ParentForm = (props: ATFormProps) => {
    const t = useTranslate(LANG_STUDENT, "parent");
    const {
        control,
        handleSubmit,
        formState: { errors },
        refineCore: { onFinish },
        saveButtonProps,
    } = useRefineForm<IParent, HttpError, Nullable<IParent>>({
        defaultValues: { ...props.defaultValues },
        refineCoreProps: {
            resource: STUDENT_PARENT_URL,
            redirect: false,
            id: props.id,
            onMutationSuccess: props.onClose,
        }
    });
    console.log(errors, 'errors')

    const title = props.action === "edit" ? t("actions.edit") : t("actions.add");
    return (
        <Box>
            <Typography variant="h6">{title}</Typography>
            <Divider sx={{ my: 2 }} />
            <form
                onSubmit={handleSubmit((data) => {
                    onFinish(data);
                })}
            >
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <CSInput
                            fullWidth
                            name="name"
                            label={t("fields.name")}
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
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={6}>
                        <CSRadio
                            fullWidth
                            name={`gender`}
                            label={t("fields.gender")}
                            placeholder={t("fields.gender")}
                            required
                            control={control}
                            errors={errors}
                        >
                            <Stack direction={'row'}>
                                {Object.values(GenderEnum).map((e: GenderEnum) => {
                                    return <FormControlLabel value={e} control={<Radio />} label={e} />
                                })}
                            </Stack>
                        </CSRadio>
                    </Grid>
                    <Grid size={6}>
                        <CSInput
                            fullWidth
                            name="email"
                            label={t("fields.email")}
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
                            defaultValue={BloodGroupEnum.Unknown}
                            control={control}
                            errors={errors}
                        >
                            {Object.values(BloodGroupEnum).map((e: BloodGroupEnum) => {
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })}
                        </CSSelect>
                    </Grid>
                    <Grid size={6}>
                        <CSInput
                            fullWidth
                            name="address1"
                            label={t("fields.address1")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={12} mt={2}>
                        <Divider />
                        <Stack
                            direction={"row"}
                            gap={5}
                            mt={2}
                            justifyContent="flex-end"
                        >
                            <Button onClick={props.onClose}>{t("@buttons.cancel")}</Button>
                            <Button {...saveButtonProps} variant="contained">
                                {t("@buttons.save")}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};
