import {
    HttpError,
} from "@refinedev/core";
import { ICreateExmRoutine, IExmRule, IExmType } from "@exam/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSDatePicker, CSDateTimePicker, CSNumber, CSSelect, CSTime } from "@components/input";
import { LANG_EXAM } from "@common/constant";
import { ExmFormulaTypeEnum } from "../constant/enum";
import { ACADEMIC_BATCH_LIST, ACADEMIC_CLASS_LIST } from "@academic/constant/urls";
import { useAutocomplete } from "@refinedev/mui";
import { IBatch, IClass } from "@academic/interface";
import { EXAM_FORMULA_LIST, EXAM_TYPE_LIST } from "../constant/local.urls";
import LoadingButton from "@mui/lab/LoadingButton";
import { EXAM_ROUTINE_URL, EXAM_RULE_URL } from "../constant/service.urls";
import { useRefineForm } from "@hooks/useForm";
import { DATAVALUE_URL } from "@datavalue/constant/server.url";
import { DataKeyTemplateEnum } from "@datavalue/constant/enum";
import { IDataValue } from "@datavalue/interface";
import { StatusEnum } from "@common/all.enum";

export const RoutineEditForm = (props: ATFormProps) => {
    const t = useTranslate(LANG_EXAM, "routine");
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        refineCore: { onFinish, },
        saveButtonProps,
    } = useRefineForm<ICreateExmRoutine, HttpError, Nullable<ICreateExmRoutine>>({
        refineCoreProps: {
            meta: {
                customQuery: {
                    batch: true,
                    class: true,
                    type: true,
                    template: true,
                    markLedgerTemplate: true,
                    gradeLedgerTemplate: true,
                    formula_mark: true,
                    formula_grade: true,
                }
            },
            resource: EXAM_ROUTINE_URL,
            id: props.id,
            action: props.action,
            redirect: false,
            onMutationSuccess: props.onClose
        }
    });

    const { autocompleteProps: formulaGradeAutoProps } = useAutocomplete<IBatch>({
        resource: EXAM_FORMULA_LIST,
        meta: { customQuery: { type: ExmFormulaTypeEnum.Grade } },
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

    const { autocompleteProps: formulaMarkAutoProps } = useAutocomplete<IBatch>({
        resource: EXAM_FORMULA_LIST,
        meta: { customQuery: { type: ExmFormulaTypeEnum.Mark } },
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

    const { autocompleteProps: templateAutoProps } = useAutocomplete<IDataValue>({
        resource: DATAVALUE_URL,
        meta: {
            customQuery: {
                data_key: DataKeyTemplateEnum.EXAM_SHEET
            }
        },
        onSearch: (value) => {
            return [
                {
                    field: "name",
                    operator: "eq",
                    value
                }
            ]
        }
    });

    const { autocompleteProps: gradeTemplateAutoProps } = useAutocomplete<IDataValue>({
        resource: DATAVALUE_URL,
        meta: {
            customQuery: {
                data_key: DataKeyTemplateEnum.EXAM_GRADE_LEDGER
            }
        },
        onSearch: (value) => {
            return [
                {
                    field: "name",
                    operator: "eq",
                    value
                }
            ]
        }
    });

    const { autocompleteProps: markTemplateAutoProps } = useAutocomplete<IDataValue>({
        resource: DATAVALUE_URL,
        meta: {
            customQuery: {
                data_key: DataKeyTemplateEnum.EXAM_MARK_LEDGER
            }
        },
        onSearch: (value) => {
            return [
                {
                    field: "name",
                    operator: "eq",
                    value
                }
            ]
        }
    });

    const { autocompleteProps: typeAutoProps } = useAutocomplete<IExmType>({
        resource: EXAM_TYPE_LIST,
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
    const { autocompleteProps: ruleAutoProps } = useAutocomplete<IExmRule>({
        resource: EXAM_RULE_URL,
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
        <Box>
            <Typography variant="h6">{t("titles.edit")}</Typography>
            <Divider sx={{ my: 2 }} />
            <form
                onSubmit={handleSubmit((data) => {
                    onFinish(data);
                })}
            >
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <CSAutoComplete
                            fullWidth
                            required
                            disabled
                            getOptionLabel={(r: any) => (r.name)}
                            placeholder={t("fields.batch")}
                            name={"batch"}
                            label={t("fields.batch")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSAutoComplete
                            fullWidth
                            required
                            disabled
                            getOptionLabel={(r: any) => (r.name)}
                            placeholder={t("fields.class")}
                            name={"class"}
                            label={t("fields.class")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSAutoComplete
                            fullWidth
                            required
                            getOptionLabel={(r: any) => (r.name)}
                            autocompleteProps={typeAutoProps}
                            placeholder={t("fields.type")}
                            name={"type"}
                            label={t("fields.type")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSAutoComplete
                            fullWidth
                            required
                            getOptionLabel={(r: any) => (r.name)}
                            autocompleteProps={ruleAutoProps}
                            placeholder={t("fields.rule")}
                            name={"rule"}
                            label={t("fields.rule")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4} alignContent={'end'}>
                        <CSDateTimePicker
                            fullWidth
                            name="start_date"
                            label={t("fields.start_date")}
                            required
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4} alignContent={'end'}>
                        <CSDatePicker
                            fullWidth
                            name="result_date"
                            label={t("fields.result_date")}
                            required
                            control={control}
                            errors={errors}
                        />
                    </Grid>

                    <Grid size={4}>
                        <CSAutoComplete
                            fullWidth
                            required
                            getOptionLabel={(r: any) => (r.name)}
                            autocompleteProps={templateAutoProps}
                            placeholder={t("fields.template")}
                            name={"template"}
                            label={t("fields.template")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSAutoComplete
                            fullWidth
                            required
                            getOptionLabel={(r: any) => (r.name)}
                            autocompleteProps={gradeTemplateAutoProps}
                            placeholder={t("fields.grade_template")}
                            name={"gradeLedgerTemplate"}
                            label={t("fields.grade_template")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSAutoComplete
                            fullWidth
                            required
                            getOptionLabel={(r: any) => (r.name)}
                            autocompleteProps={markTemplateAutoProps}
                            placeholder={t("fields.mark_template")}
                            name={"markLedgerTemplate"}
                            label={t("fields.mark_template")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSSelect
                            fullWidth
                            required
                            name={"status"}
                            label={t("fields.status")}
                            control={control}
                            errors={errors}
                        >
                            {Object.values(StatusEnum).map((e: StatusEnum) => {
                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                            })}
                        </CSSelect>
                    </Grid>
                    <Grid size={12}>
                        <Divider sx={{ my: 2 }} />
                    </Grid>
                    <Grid size={12}>
                        <Stack direction={"row"} justifyContent={"flex-end"} gap={2}>
                            <Button onClick={props.onClose}>{t("@buttons.cancel")}</Button>
                            <LoadingButton {...saveButtonProps} loading={isSubmitting} variant="contained">
                                {t("@buttons.save")}
                            </LoadingButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};
