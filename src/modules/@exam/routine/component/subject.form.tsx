import { Divider, Grid2 as Grid, IconButton, MenuItem, Select } from "@mui/material";
import { LANG_EXAM } from "@common/constant";
import { CSAutoComplete, CSDatePicker, CSDateTimePicker, CSInput, CSNumber, CSSelect, CSTime } from "@components/input";
import { useTranslate } from "@hooks/useTranslate";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { ACADEMIC_SUBJECT_LIST } from "@academic/constant/urls";
import { useAutocomplete } from "@refinedev/mui";
import { ISubject } from "@academic/interface";
import { SubjectTypeEnum } from "@common/all.enum";
import { ExmRoutineCasEnum, GradingFormulaTypeEnum } from "@exam/constant/enum";
import { useEffect } from "react";

type SubjectFormProps = {
    field: any
    index: number
    control: any;
    errors: any;
    name: string;
    remove: any
    watch: any
    setValue: any
    regulation: GradingFormulaTypeEnum
}
export const SubjectForm = ({ setValue, regulation, watch, remove, field, index, control, errors, name }: SubjectFormProps) => {
    const t = useTranslate(LANG_EXAM, "esubjects");
    const subject = watch(`${name}.${index}.subject`);
    const cas_type = watch(`cas_type`);

    useEffect(() => {
        if (cas_type === ExmRoutineCasEnum.Full_Internal || cas_type === ExmRoutineCasEnum.Internal) {
            setValue(`${name}.${index}.type`, SubjectTypeEnum.IN)
        } else if (cas_type === ExmRoutineCasEnum.Final) {
            setValue(`${name}.${index}.type`, SubjectTypeEnum.TH)
        }
    }, [cas_type])

    const { autocompleteProps: subjectAutoProps } = useAutocomplete<ISubject>({
        resource: ACADEMIC_SUBJECT_LIST,
        onSearch: (value: string) => {
            return [
                {
                    field: "name",
                    operator: "eq",
                    value
                },
                {
                    field: "code",
                    operator: "eq",
                    value
                }
            ]
        }
    });
    return (
        <Grid container spacing={2} key={field.id}>
            <Grid size={11}>
                <Grid container spacing={2}>
                    <Grid size={4} alignContent={'end'}>
                        <CSAutoComplete
                            fullWidth
                            required
                            renderLabel={(r: any) => (r.code + " - " + r.name)}
                            getOptionLabel={(r: any) => (r.code + " - " + r.name)}
                            autocompleteProps={subjectAutoProps}
                            placeholder={t("fields.program")}
                            name={`${name}.${index}.subject`}
                            label={t("fields.subject")}
                            control={control}
                            error={errors[name]?.[index]?.['subject'] ?? undefined}
                        />
                    </Grid>
                    <Grid size={2} alignContent={'end'}>
                        <CSSelect
                            fullWidth
                            name={`${name}.${index}.type`}
                            label={t("fields.type")}
                            disabled={cas_type !== ExmRoutineCasEnum.Regular}
                            required
                            control={control}
                            error={errors[name]?.[index]?.['subject'] ?? undefined}
                        >
                            {(subject?.type === SubjectTypeEnum.IN_TH || subject?.type === SubjectTypeEnum.TH) && (
                                <MenuItem key={SubjectTypeEnum.TH} value={SubjectTypeEnum.TH}>{SubjectTypeEnum.TH}</MenuItem>
                            )}
                            {(subject?.type === SubjectTypeEnum.IN_TH || subject?.type === SubjectTypeEnum.IN) && (
                                <MenuItem key={SubjectTypeEnum.IN} value={SubjectTypeEnum.IN}>{SubjectTypeEnum.IN}</MenuItem>
                            )}
                            {subject?.type === SubjectTypeEnum.IN_TH && regulation == GradingFormulaTypeEnum.Regular && (
                                <MenuItem key={SubjectTypeEnum.IN_TH} value={SubjectTypeEnum.IN_TH}>{SubjectTypeEnum.IN_TH}</MenuItem>
                            )}
                        </CSSelect>
                    </Grid>
                    <Grid size={3} alignContent={'end'}>
                        <CSDateTimePicker
                            fullWidth
                            name={`${name}.${index}.start_date`}
                            label={t("fields.start_date")}
                            required
                            control={control}
                            error={errors.meta?.[index]?.['start_date'] ?? undefined}
                        />
                    </Grid>
                    <Grid size={3}>
                        <CSTime
                            fullWidth
                            format="HH:mm"
                            name={`${name}.${index}.duration`}
                            ampm={false}
                            label={t("fields.duration")}
                            required
                            control={control}
                            error={errors.meta?.[index]?.['duration'] ?? undefined}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={1} alignContent={'end'}>
                <IconButton
                    onClick={() => remove(index)}
                    color="error"
                >
                    <RemoveCircleOutlineIcon />
                </IconButton>
            </Grid>
            <Grid size={12}>
                <Divider sx={{ mb: 1 }} />
            </Grid>
        </Grid>
    );
};