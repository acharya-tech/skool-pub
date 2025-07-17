import { useTranslate } from "@hooks/useTranslate";
import { FormControlLabel, Grid2 as Grid, MenuItem, Radio, RadioGroup, Stack, } from "@mui/material";
import { CSRadio, CSSelect, CSSoloComplete } from "@components/input";
import { LANG_STUDENT } from "@common/constant";
import { YesNoEnum } from "@common/all.enum";
import { ParentRelationEnum } from "../constant/enums";
import { StepFormGridInputProps } from "../interface/types";
import { useAutocomplete } from "@refinedev/mui";
import { IParent } from "../interface";
import React, { useCallback, useState } from "react";
import _debounce from 'lodash/debounce';
import { STUDENT_PARENT_URL } from "@student/constant";

export const StudentParentGridInput = React.memo(({ add, control, field, errors, name, index }: StepFormGridInputProps) => {
    const t = useTranslate(LANG_STUDENT, "student_parent");
    const { autocompleteProps: parentAutoProps } = useAutocomplete<IParent>({
        resource: STUDENT_PARENT_URL,
        onSearch: (value: string) => {
            return [
                {
                    field: "phone",
                    operator: "eq",
                    value
                }
            ]
        }
    });

    const onChange = (newValue: any, field: any) => {
        if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
                add(newValue, index);
            });
        } else if (newValue && newValue.inputValue) {
            add(newValue.inputValue, index);
        } else {
            field.onChange(newValue)
        }
    }


    return (
        <>
            <Grid size={6}>
                <CSSoloComplete
                    fullWidth
                    required
                    getOptionLabel={(option: any) => {
                        // for example value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        return `${option.name} | ${option.phone}`
                    }}
                    autocompleteProps={parentAutoProps}
                    name={`${name}.${index}.parent`}
                    label={t("fields.parent")}
                    onChange={onChange}
                    control={control}
                    renderLabel={(option: IParent) => {
                        return `${option.name} | ${option.phone}`
                    }}
                    error={errors[name]?.[index]?.['parent'] ?? undefined}
                />
            </Grid>
            <Grid size={3}>
                <CSSelect
                    fullWidth
                    name={`${name}.${index}.relation`}
                    label={t("fields.relation")}
                    placeholder={t("fields.relation")}
                    required
                    defaultValue={''}
                    control={control}
                    error={errors[name]?.[index]?.['relation'] ?? undefined}
                >
                    {Object.values(ParentRelationEnum).map((e: ParentRelationEnum) => {
                        return <MenuItem key={e} value={e}>{e}</MenuItem>
                    })}
                </CSSelect>
            </Grid>
            <Grid size={3}>
                <CSRadio
                    fullWidth
                    name={`${name}.${index}.isGuardian`}
                    label={t("fields.isGuardian")}
                    placeholder={t("fields.isGuardian")}
                    required
                    defaultValue={YesNoEnum.No}
                    control={control}
                    error={errors[name]?.[index]?.['isGuardian'] ?? undefined}
                >
                    <Stack direction={'row'}>
                        {Object.values(YesNoEnum).map((e: YesNoEnum) => {
                            return <FormControlLabel value={e} control={<Radio />} label={e} />
                        })}
                    </Stack>
                </CSRadio>
            </Grid>
        </>
    );
});
