import { useFieldArray, useForm } from "react-hook-form";
import { useTranslate } from "@hooks/useTranslate";
import { Box, Button, Divider, Grid2 as Grid, IconButton, Stack } from "@mui/material";
import { LANG_STUDENT } from "@common/constant";

import { useEffect, useRef, useState } from "react";
import { StepFormProps } from "../../interface/types";
import { StudentParentGridInput } from "../../components/_student_parent";
import { CSHiddenInput } from "@components/input";
import { ParentRelationEnum } from "../../constant/enums";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { YesNoEnum } from "@common/all.enum";
import { ParentForm } from "../../components/_parent";
import { BasicModal } from "@components/modal/basic.modal";
import { IBillEntranceFormData } from "@billing/interface";
import { useOne, useUpdate } from "@refinedev/core";
import { STUDENT_ADMISSION_FORM_URL } from "@student/constant";
import { IStudentParent } from "@student/interface";

export const StepTwoForm = ({ onBack, onClose, admissionId, onNext }: StepFormProps) => {
    const t = useTranslate(LANG_STUDENT, "parent");
    const isNext = useRef(false)
    const [addParentFlag, setParentFlag] = useState<any>()
    const { data: query } = useOne<IBillEntranceFormData>({
        id: admissionId,
        resource: STUDENT_ADMISSION_FORM_URL,
    })
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Partial<IBillEntranceFormData>>({
        defaultValues: {
            parents: [] as Partial<IStudentParent>[]
        }
    });
    const { mutate, isLoading: busyButton } = useUpdate<IBillEntranceFormData>({
        resource: STUDENT_ADMISSION_FORM_URL,
        id: admissionId
    })
    const onFinish = (data: Partial<IBillEntranceFormData>) => {
        mutate({
            id: admissionId,
            values: data
        }, {
            onSuccess: () => {
                if (isNext.current) {
                    onNext?.()
                } else {
                    onClose?.()
                }
            }
        })
    }
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "parents"
    });
    useEffect(() => {
        if (query && query.data) {
            reset({ parents: [] })
            query.data?.parents?.forEach(e => {
                append({
                    id: e.id,
                    parent: e.parent,
                    relation: e.relation,
                    isGuardian: e.isGuardian,
                } as any)
            })
        }
    }, [query])

    useEffect(() => {
        return () => {
            isNext.current = false
        }
    }, [])
    const addParent = (phone: string, index: number) => {
        setParentFlag({ phone, index })
    }
    return (
        <Box>
            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data, 'data')
                    onFinish(data);
                })}
            >
                {admissionId && (
                    <CSHiddenInput name="id" defaultValue={admissionId} control={control} />
                )}
                <Grid container spacing={2}>
                    <Grid size={12}>
                        {fields.map((field: any, index) => (
                            <Grid container spacing={2} key={field.id}>
                                <Grid size={11}>
                                    <Grid container spacing={2}>
                                        <StudentParentGridInput key={field.id} field={field} add={addParent} index={index} name="parents" control={control} errors={errors} />
                                    </Grid>
                                </Grid>
                                <Grid size={1}>
                                    <IconButton
                                        onClick={() => remove(index)}
                                        color="error"
                                    >
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                </Grid>
                                <Grid size={12}>
                                    <Divider sx={{ mb: 4 }} />
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid size={12}>
                        <Button
                            variant="outlined"
                            onClick={() =>
                                append({
                                    relation: ParentRelationEnum.Father,
                                    isGuardian: YesNoEnum.No
                                })
                            }
                            fullWidth
                            startIcon={<AddCircleOutlineIcon />}
                            sx={{ mb: 2 }}
                        >
                            {t("actions.add")}
                        </Button>
                    </Grid>
                    <Grid size={2}>
                        <Button
                            disabled={busyButton}
                            onClick={onBack}
                            color="info"
                            variant="contained"
                        >{t("@actions.back")}</Button>
                    </Grid>
                    <Grid size={10}>
                        <Stack direction={'row'} justifyContent={'flex-end'} gap={2}>
                            <Button
                                disabled={busyButton}
                                color="success"
                                variant="contained"
                                type="submit"
                                onClick={(e) => {
                                    isNext.current = true

                                }}
                            >{t("@actions.stepNext")}</Button>
                            <Button
                                color="primary"
                                disabled={busyButton}
                                variant="contained"
                                onClick={onNext}
                            >{t("@actions.skip")}</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
            <BasicModal
                onClose={() => setParentFlag(undefined)}
                open={!!addParentFlag}
            >
                <ParentForm
                    onClose={(data: any) => {
                        if (data.target) {
                            setParentFlag(undefined)
                            return
                        }
                        update(addParentFlag?.index, {
                            parent: data.data as any
                        })
                        setParentFlag(undefined)
                    }}
                    action="create"
                    defaultValues={{ phone: addParentFlag?.phone }}
                />
            </BasicModal>
        </Box>
    );
};
