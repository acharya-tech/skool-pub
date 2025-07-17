import { useTranslate } from "@hooks/useTranslate";
import { Grid2 as Grid } from "@mui/material";
import { CSInput } from "@components/input";
import { LANG_EMPLOYEE } from "@common/constant";
import { FormGridInputProps } from "../interface/types";

export const StaffBankGridInput = ({ control, errors }: FormGridInputProps) => {
    const t = useTranslate(LANG_EMPLOYEE, "staff");

    return (
        <>
            <Grid size={12}>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            name="pan_no"
                            label={t("fields.pan_no")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            name="ssf_no"
                            label={t("fields.ssf_no")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            name="pf_no"
                            label={t("fields.pf_no")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            name="bank_detail.bank_name"
                            label={t("fields.bank_name")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            name="bank_detail.account_name"
                            label={t("fields.account_name")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            name="bank_detail.account_no"
                            label={t("fields.account_no")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
