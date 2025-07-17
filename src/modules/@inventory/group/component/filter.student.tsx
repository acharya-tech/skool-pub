import { Paper, Typography } from "@mui/material";
import { Grid2 as Grid } from "@mui/material";
import { HttpError, useList } from "@refinedev/core";
import { useAutocomplete } from "@refinedev/mui";
import { LANG_INVENTORY } from "@common/constant";
import { CSAutoComplete } from "@components/input";
import { useTranslate } from "@hooks/useTranslate";
import { ACADEMIC_CLASS_LIST, ACADEMIC_SECTION_LIST } from "@academic/constant/urls";
import { IClass, ISection } from "@academic/interface";
import { STUDENT_INFO_URL } from "@student/constant";
import { IStudentInfo } from "@student/interface";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StoreGroupType } from "../../constant";
import { IStoreGroupMemberCreate } from "../../interface";

type FilterStudentProps = {
    setMembers: any
}
export const FilterStudent = ({
    setMembers
}: FilterStudentProps) => {
    const t = useTranslate(LANG_INVENTORY, "groups");
    const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
        meta: { customQuery: { program: true, } },
        resource: ACADEMIC_CLASS_LIST,
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


    const { autocompleteProps: sectionAutoProps } = useAutocomplete<ISection>({
        resource: ACADEMIC_SECTION_LIST,
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

    const {
        control,
        watch,
        formState: { errors },
    } = useForm();

    const filterClass = watch("filterClass");
    const filterSection = watch("filterSection");

    const { data, isLoading } = useList<IStudentInfo, HttpError>({
        resource: STUDENT_INFO_URL,
        meta: {
            customQuery: {
                class: true,
            }
        },
        filters: [
            {
                field: "name",
                operator: "eq",
                value: filterClass?.name
            },
            {
                field: "name",
                operator: "eq",
                value: filterClass?.name
            }
        ],
        queryOptions: {
            enabled: Boolean(filterClass?.name) && Boolean(filterSection?.name),
        }
    });

    useEffect(() => {
        if (data) {
            setMembers(data.data.map(std => {
                return {
                    student: std,
                    id: std.id,
                    type: StoreGroupType.Student
                } as IStoreGroupMemberCreate
            }));
        }
    }, [data, setMembers]);

    return <Grid container spacing={2} >
        <Grid size={12}>
            <Typography variant="subtitle2" >{t('labels.filter')}</Typography>
        </Grid>
        <Grid size={6}>
            <CSAutoComplete
                fullWidth
                required
                groupBy={(option: IClass) => option.program.name}
                getOptionLabel={(r: any) => r.name}
                autocompleteProps={classAutoProps}
                name="filterClass"
                label={t("labels.class")}
                control={control}
                errors={errors}
            />
        </Grid>
        <Grid size={6}>
            <CSAutoComplete
                fullWidth
                getOptionLabel={(r: any) => r.name}
                autocompleteProps={sectionAutoProps}
                name="filterSection"
                label={t("labels.section")}
                control={control}
                errors={errors}
            />
        </Grid>
    </Grid>
};
