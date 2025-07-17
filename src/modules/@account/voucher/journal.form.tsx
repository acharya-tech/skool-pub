import { Button, Divider, Grid2 as Grid, Paper, Stack } from "@mui/material";
import { HttpError } from "@refinedev/core";
import { LANG_ACCOUNT } from "@common/constant";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { IVoucherCreate } from "../interface";
import { VoucherForm } from "./_voucher.form";
import { CSDatePicker, CSHiddenInput } from "@components/input";
import { AccountVoucherTypeEnum } from "../constant/enum";
import { ACCOUNT_VOUCHER_URL } from "../constant/server.urls";
import { VoucherHistory } from "./voucher.history";
import { useRefineForm } from "@hooks/useForm";

export const JournalEntryForm = (props: ATFormProps) => {
    const t = useTranslate(LANG_ACCOUNT, "entry");
    const {
        control,
        handleSubmit,
        formState: { errors },
        refineCore: { onFinish },
        watch,
        saveButtonProps,
    } = useRefineForm<IVoucherCreate, HttpError>({
        defaultValues: {
            drEntry: [
                {
                    ledger: "",
                    amount: 0
                }
            ],
            crEntry: [
                {
                    ledger: "",
                    amount: 0
                }
            ]
        },
        refineCoreProps: {
            resource: ACCOUNT_VOUCHER_URL,
            redirect: false,
            id: props.id,
            action: props.action,
            onMutationSuccess: props.onClose,
        }
    });

    return (
        <Grid container spacing={2}>
            <Grid size={10}>
                <Paper elevation={4} sx={{ p: 4 }}>
                    <form
                        onSubmit={handleSubmit((data) => {
                            onFinish(data);
                        })}
                    >
                        <CSHiddenInput control={control} name="voucher_type" defaultValue={AccountVoucherTypeEnum.Journal} />
                        <Grid container spacing={2}>
                            <Grid size={10} />
                            <Grid size={2}>
                                <CSDatePicker
                                    fullWidth
                                    control={control}
                                    errors={errors}
                                    required
                                    name="transaction_date"
                                    label={t("fields.transaction_date")}
                                />
                            </Grid>
                            <Grid size={12}>
                                <VoucherForm
                                    watch={watch}
                                    control={control}
                                    errors={errors}
                                    multiDr={false}
                                    multiCr={true}
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
                </Paper>
            </Grid>
            <Grid size={2}>
                <VoucherHistory />
            </Grid>
        </Grid>
    );
};
