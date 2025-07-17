import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Divider } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { RiFileExcel2Line } from "react-icons/ri";
import { FaRegTrashAlt, FaRegSave } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import { CiLock, CiUnlock } from "react-icons/ci";

import { useTranslate } from "@hooks/useTranslate";
import { useConfirm } from "@hooks/confirm.hook";
import { LANG_EXAM } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useDelete, useInvalidate, useList, useUpdate, HttpError, useDataProvider } from "@refinedev/core";
import { List } from "@refinedev/mui";

import isEqualObject from "lodash/isEqual";

import {
    EXAM_SUBJECT_MARKS_ENTRY_URL,
    // EXAM_SUBJECT_MARKS_LIST_URL,
    EXAM_SUBJECT_URL
} from "../../constant/service.urls";

import { ExmMarkPostStatusEnum } from "../../constant/enum";
import { IExamSubjectMarks, IExmSubject, MarkListItem } from "../../interface";
import { ImportMarks } from "./import.marks";
import { useMarkColumns } from "../hooks/marks.column";
import { handleExportMarkFoil } from "../utils/export.mark.foil";
import { getQueryParam } from "@utils/other";
import { YesNoEnum } from "@common/all.enum";

type MarksListProps = {
    esubject: IExmSubject;
};

// TODO: improve the application performance using datagrid api to update the row value and input field, similar to that in import student

export const MarksList = ({ esubject }: MarksListProps) => {
    const [importModal, setImportModal] = useState(false);
    const t = useTranslate(LANG_EXAM, "marks");
    const invalidate = useInvalidate();
    const markRef = useRef<MarkListItem[]>([])

    const { columns, marks, setMarks, setInputColumn, setGradingRule, inputColumn, gradingRule } = useMarkColumns({ t, esubject });

    const dataProvider = useDataProvider();
    // const { data, isLoading, refetch } = useList<MarkListItem, HttpError>({
    //     resource: getQueryParam(EXAM_SUBJECT_MARKS_LIST_URL, { subjectid: esubject?.id }),
    //     queryOptions: { enabled: !!esubject },
    // });

    const fetchMarkStudent = () => {
        if (!!esubject) {
            dataProvider().getOne<IExamSubjectMarks>({
                resource: EXAM_SUBJECT_MARKS_ENTRY_URL,
                id: esubject.id!
            }).then((res) => {
                if (res?.data) {
                    setMarks(res.data.marks);
                    setInputColumn(res.data.fields);
                    setGradingRule(res.data.gradingRule);
                    markRef.current = res.data.marks
                }
            })
        }
    }


    useEffect(() => {

        fetchMarkStudent()
    }, [esubject]);

    const { mutate, isLoading: isUpdating } = useUpdate<MarkListItem, HttpError>();
    const { mutate: mutateReset, isLoading: isReseting } = useDelete<MarkListItem, HttpError>();

    const [openConfirm, confirmEle] = useConfirm({
        confirmTitle: t("info.confirmReset"),
        onConfirm: (id) => {
            mutateReset(
                { resource: EXAM_SUBJECT_MARKS_ENTRY_URL, id },
                {
                    onSuccess: () => {
                        fetchMarkStudent();
                        invalidate({
                            id: esubject.id,
                            resource: EXAM_SUBJECT_URL,
                            invalidates: ["detail"],
                        });
                        handleReset();
                    },
                }
            );
        },
    });


    const [postConfirm, confirmPostEle] = useConfirm({
        confirmTitle:
            esubject.post_status === ExmMarkPostStatusEnum.Completed
                ? t("info.confirmUnpost")
                : t("info.confirmPost"),
        onConfirm: () => {
            let status = ExmMarkPostStatusEnum.Completed;
            if (esubject.post_status === ExmMarkPostStatusEnum.Completed) {
                status = (esubject?.mark_student ?? 0) > 0
                    ? ExmMarkPostStatusEnum.Inprogress
                    : ExmMarkPostStatusEnum.Pending;
            }
            mutate({
                resource: EXAM_SUBJECT_URL,
                id: esubject.id,
                values: { post_status: status },
            });
        },
    });

    const [valueChanged, hasError, hasChanged] = useMemo(() => {
        let error = false;
        const changed = marks?.filter((mark, i) => {
            const original = markRef.current[i];
            if (!original) return false;
            const hasFieldError = Object.values(mark.error ?? {}).some((v) => Boolean(v));
            const casChanged = !isEqualObject(mark.cas, original.cas);
            const absentChanged = mark.is_absent !== original.is_absent;
            if (hasFieldError) error = true;
            return hasFieldError || casChanged || absentChanged;
        }) || [];
        return [changed, error, changed.length > 0];
    }, [marks]);

    const handleSubmit = () => {
        const dataToUpload = valueChanged.filter((mark) => {
            if (mark.is_absent === YesNoEnum.Yes) {
                return true
            } else {
                return Object.keys(inputColumn).some((key) => key in mark.cas)
            }
        }).map((mark) => {
            return {
                id: mark.id,
                ...mark.cas,
                esubject_id: mark.esubject_id,
                student_id: mark.student_id,
                is_absent: mark.is_absent
            }
        })
        mutate(
            {
                resource: EXAM_SUBJECT_MARKS_ENTRY_URL,
                id: esubject.id,
                values: { marks: dataToUpload },
            },
            {
                onSuccess: () => {
                    fetchMarkStudent();
                    setTimeout(() => {
                        invalidate({
                            id: esubject.id,
                            resource: EXAM_SUBJECT_URL,
                            invalidates: ["detail"],
                        });
                    }, 2000);
                },
            }
        );
    };

    const handleReset = () => {
        if (markRef.current.length > 0) setMarks(markRef.current);
    };

    const handleExport = () => {
        handleExportMarkFoil(inputColumn, esubject, marks);
    };

    return (
        <List
            title={t("marks")}
            breadcrumb={false}
            headerButtons={() => [
                <Button
                    key="post"
                    onClick={postConfirm}
                    startIcon={esubject.post_status === ExmMarkPostStatusEnum.Completed ? <CiUnlock /> : <CiLock />}
                    color={esubject.post_status === ExmMarkPostStatusEnum.Completed ? "warning" : "primary"}
                    size="small"
                    disabled={esubject.post_status === ExmMarkPostStatusEnum.Pending}
                >
                    {esubject.post_status === ExmMarkPostStatusEnum.Completed ? t("actions.unpost") : t("actions.post")}
                </Button>,
                <Button
                    key="clear"
                    onClick={() => openConfirm(esubject.id)}
                    startIcon={<FaRegTrashAlt />}
                    color="error"
                    size="small"
                    disabled={esubject.post_status === ExmMarkPostStatusEnum.Completed}
                >
                    {t("actions.clear")}
                </Button>,
                <Button
                    key="import"
                    onClick={() => setImportModal(true)}
                    startIcon={<RiFileExcel2Line />}
                    color="secondary"
                    size="small"
                    disabled={esubject.post_status === ExmMarkPostStatusEnum.Completed}
                >
                    {t("actions.import")}
                </Button>,
                <Button
                    key="export"
                    onClick={handleExport}
                    startIcon={<RiFileExcel2Line />}
                    color="info"
                    size="small"
                >
                    {t("actions.export")}
                </Button>,
                <Button
                    key="reset"
                    onClick={handleReset}
                    startIcon={<RxReset />}
                    color="warning"
                    size="small"
                    disabled={!hasChanged}
                >
                    {t("actions.reset")}
                </Button>,
                <LoadingButton
                    key="submit"
                    variant="contained"
                    startIcon={<FaRegSave />}
                    color="success"
                    onClick={handleSubmit}
                    loading={isUpdating}
                    disabled={!valueChanged?.length || hasError}
                    size="small"
                >
                    {t("actions.submit")}
                </LoadingButton>,
            ]}
        >
            <TableGrid
                rows={marks}
                paginationMode="client"
                sortingMode="client"
                filterMode="client"
                hideFooterPagination
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                columns={columns}
                slots={{ toolbar: QuickSearchToolbar }}
            />
            {confirmEle}
            {confirmPostEle}
            <ImportMarks
                inputColumn={inputColumn}
                subject={esubject}
                addImport={setMarks as any}
                marks={marks}
                open={importModal}
                close={() => setImportModal(false)}
            />
        </List>
    );
};

const QuickSearchToolbar = () => (
    <>
        <Box py={2}>
            <GridToolbarQuickFilter size="small" />
        </Box>
        <Divider />
    </>
);
