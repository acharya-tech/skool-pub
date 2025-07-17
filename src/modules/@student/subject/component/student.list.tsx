import {
    Box,
    Button,
} from "@mui/material";
import { LANG_STUDENT } from "@common/constant";
import { getQueryParam } from "@utils/other";
import { IClassSubject } from "@academic/interface";
import { List } from "@refinedev/mui";
import { TableGrid } from "@components/table/table.body";
import { HttpError, useInvalidate, useList, useUpdate } from "@refinedev/core";
import { StudentSubjectList } from "../../interface";
import { STUDENT_SUBJECT_STUDENT_LIST_URL, STUDENT_SUBJECT_URL } from "../../constant";
import { useEffect, useMemo, useState } from "react";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Divider } from "@mui/material";
import { useStudentColumns } from "../hooks/students.column";
import { RxReset } from "react-icons/rx";
import { FaRegSave } from "react-icons/fa";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslate } from "@hooks/useTranslate";

type StudentViewListProps = {
    subject?: IClassSubject
}
export const StudentViewList = ({ subject }: StudentViewListProps) => {
    const t = useTranslate(LANG_STUDENT, "subject");
    const invalidate = useInvalidate()
    const [students, setStudent] = useState<StudentSubjectList[]>([]);
    const { data, isLoading, refetch } = useList<StudentSubjectList, HttpError>({
        resource: getQueryParam(STUDENT_SUBJECT_STUDENT_LIST_URL, { id: subject?.id }),
        queryOptions: {
            enabled: !!subject
        },
    });

    useEffect(() => {
        if (data?.data) {
            setStudent(data?.data)
        }
    }, [data?.data])

    const columns = useStudentColumns({ t, setStudent, students })

    const [valueChanged, hasChanged] = useMemo(() => {
        let hasChanged = false
        const changes = students?.reduce((result, student, index) => {
            if (student.subject_id !== data?.data[index]?.subject_id) {
                hasChanged = true
                result.push(student);
            }
            return result;
        }, [] as StudentSubjectList[]);
        return [changes, hasChanged];
    }, [students, subject])

    const { mutate, isLoading: isUpdating } = useUpdate<StudentSubjectList, HttpError>()
    const handleSubmit = () => {
        mutate({
            resource: STUDENT_SUBJECT_URL,
            id: subject?.id,
            values: { students: valueChanged ?? [] }
        }, {
            onSuccess: () => {
                refetch()
                setTimeout(() => {
                    invalidate({
                        id: subject?.id,
                        resource: STUDENT_SUBJECT_URL,
                        invalidates: ['detail']
                    })
                }, 2000)

            }
        })
    }
    const handleReset = () => {
        if (data?.data) {
            setStudent(data?.data)
        }
    }

    return <List
        title={t("titles.assignment")}
        breadcrumb={false}
        headerButtons={(props) => [
            <Button
                onClick={handleReset}
                startIcon={<RxReset />}
                color="warning"
                size="small"
                key="reset"
                disabled={!hasChanged}
            >{t("actions.reset")}</Button>,
            <LoadingButton
                variant="contained"
                startIcon={<FaRegSave />}
                color="success"
                onClick={handleSubmit}
                loading={isUpdating}
                disabled={!valueChanged?.length}
                size="small"
                key="submit"
            >{t("actions.submit")}</LoadingButton>
        ]}
    >
        <TableGrid
            rows={students ?? []}
            loading={isLoading}
            rowCount={data?.total ?? 0}
            paginationMode="client"
            sortingMode="client"
            filterMode="client"
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            columns={columns}
            slots={{ toolbar: QuickSearchToolbar }}
        />
    </List>
};


function QuickSearchToolbar() {
    return (
        <>
            <Box py={2} justifyItems={"end"}>
                <GridToolbarQuickFilter size="small" />
            </Box>
            <Divider />
        </>
    );
}