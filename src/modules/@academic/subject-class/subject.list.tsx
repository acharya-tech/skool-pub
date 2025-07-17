import {
    Button,
    IconButton,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_ACADEMIC } from "@common/constant";
import { IClass, ICreateClassSubject, ISubject } from "../interface";
import { useFieldArray } from "react-hook-form";
import { Nullable } from "src/interfaces";
import { HttpError } from "@refinedev/core";
import { useAutocomplete } from "@refinedev/mui";
import { CSAutoComplete, CSSelect } from "@components/input";
import React, { useEffect } from "react";
import { CourseTypeEnum } from "@common/all.enum";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box } from "@mui/material";
import { ACADEMIC_CLASS_SUBJECT_MANY_URL, ACADEMIC_SUBJECT_URL } from "../constant/server.url";
import { useRefineForm } from "@hooks/useForm";

type QuickViewSubjectProps = {
    aclass: IClass
}
export const QuickViewSubject = React.memo(({ aclass }: QuickViewSubjectProps) => {
    const t = useTranslate(LANG_ACADEMIC, "classSubject");
    const { autocompleteProps: subjectProps } = useAutocomplete<ISubject>({
        resource: ACADEMIC_SUBJECT_URL,
        onSearch: (value) => {
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
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        refineCore: { onFinish, query },
        saveButtonProps,
    } = useRefineForm<ICreateClassSubject, HttpError, Nullable<ICreateClassSubject>>({
        refineCoreProps: {
            meta: {
                customQuery: {
                    subject: true,
                    class_id: aclass.id,
                    _sort: "sno",
                    _order: "asc"
                }
            },
            invalidates: [],
            resource: ACADEMIC_CLASS_SUBJECT_MANY_URL,
            redirect: false,
            action: "edit",
            id: aclass.id
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "subjects",
    });

    useEffect(() => {
        if (query?.data?.data) {
            reset({ subjects: query?.data?.data.subjects })
        }
    }, [query?.data?.data])

    return (
        <Box>
            <form
                onSubmit={handleSubmit((data) => {
                    onFinish(data);
                })}
            >
                <TableContainer>
                    <Table style={{ minWidth: "650" }} aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">{t("fields.subject")}</TableCell>
                                <TableCell>{t("fields.course_type")}</TableCell>
                                <TableCell>{t("fields.sno")}</TableCell>
                                <TableCell>{t("@table.actions")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fields?.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell scope="row">
                                        <CSAutoComplete
                                            fullWidth
                                            required
                                            getOptionLabel={(r: ISubject) => (r.code + ' | ' + r.name + ' | ' + r.type)}
                                            autocompleteProps={subjectProps}
                                            renderLabel={(r: ISubject) => (r.code + ' | ' + r.name + ' | ' + r.type)}
                                            name={`subjects.${index}.subject`}
                                            label={t("fields.subject")}
                                            control={control}
                                            error={errors[`subjects`]?.[index]?.['subject'] ?? undefined}
                                        />
                                    </TableCell>
                                    <TableCell scope="row" width={200}>
                                        <CSSelect
                                            fullWidth
                                            name={`subjects.${index}.course_type`}
                                            label={t("fields.course_type")}
                                            defaultValue={CourseTypeEnum.Compulsory}
                                            required
                                            control={control}
                                            error={errors[`subjects`]?.[index]?.['course_type'] ?? undefined}
                                        >
                                            {Object.values(CourseTypeEnum).map((e: CourseTypeEnum) => {
                                                return <MenuItem key={e} value={e}>{e}</MenuItem>
                                            })}
                                        </CSSelect>
                                    </TableCell>
                                    <TableCell scope="row" width={200}>
                                        <CSSelect
                                            fullWidth
                                            name={`subjects.${index}.sno`}
                                            label={t("fields.sno")}
                                            defaultValue={aclass.totalSubjects > (index + 1) ? (index + 1) : undefined}
                                            required
                                            control={control}
                                            error={errors[`subjects`]?.[index]?.['sno'] ?? undefined}
                                        >
                                            {Array.from({ length: (aclass.totalSubjects ?? 1) }).map((e, i) => {
                                                return <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                            })}
                                        </CSSelect>
                                    </TableCell>
                                    <TableCell scope="row">
                                        <IconButton
                                            onClick={() => remove(index)}
                                            color="error"
                                        >
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => append({})}
                                        fullWidth
                                        startIcon={<AddCircleOutlineIcon />}
                                        sx={{ mb: 2 }}
                                    >
                                        {t("actions.add")}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ m: 2 }}
                    {...saveButtonProps}
                >
                    {t("actions.update")}
                </Button>
            </Box>
        </Box>
    );
});
