import { Box, Button, Grid2 as Grid, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMarkStore } from '../utils/mark.store';
import { CanAccess, HttpError, useDelete, useInvalidate, useUpdate } from '@refinedev/core';
import { IExmSubject, MarkListItem } from '@exam/interface';
import { useConfirm } from '@hooks/confirm.hook';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_EXAM } from '@common/constant';
import { EXAM_SUBJECT_MARKS_ENTRY_URL, EXAM_SUBJECT_URL } from '@exam/constant/service.urls';
import { ExmMarkPostStatusEnum } from '@exam/constant/enum';
import { RiFileExcel2Line } from 'react-icons/ri';
import { RxReset } from 'react-icons/rx';
import LoadingButton from '@mui/lab/LoadingButton';
import { FaRegSave, FaRegTrashAlt } from 'react-icons/fa';
import { CiLock, CiUnlock } from 'react-icons/ci';
import { ImportMarks } from './import.marks';
import { handleExportMarkFoil } from '../utils/export.mark.foil';
import { UCSSearch } from '@components/input/uc.input';
import { EXAM_RESULT_LIST } from '@exam/constant/local.urls';
import { EXAM_SUBJECT_MARKENTRY_AC } from '@exam/constant/access.url';
import { FullScreenButton } from 'src/components/settings/drawer/fullscreen-button';

type MarksActionsProps = {
    containerRef: any
    markList: MarkListItem[]
    esubject: IExmSubject
    refetch: () => void
}
export const MarksActions = ({ containerRef, markList, esubject, refetch }: MarksActionsProps) => {
    const [importModal, setImportModal] = useState(false);
    const t = useTranslate(LANG_EXAM, "marks");
    const invalidate = useInvalidate();
    const { mutate, isLoading: isUpdating } = useUpdate<MarkListItem, HttpError>();
    const { mutate: mutateReset, isLoading: isReseting } = useDelete<MarkListItem, HttpError>();
    const { resetMarks: resetRow, addImport, resetMarks } = useMarkStore()
    const newMarkList = useMarkStore(state => state.markList)
    const inputColumn = useMarkStore(state => state.inputColumn)
    const setSearch = useMarkStore(state => state.setSearch)
    const setFullScreen = useMarkStore(state => state.setFullScreen)
    const [buttonFlag, setButtonFlag] = useState<{ canReset: boolean, canSubmit: boolean }>({ canReset: false, canSubmit: false })
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    useEffect(() => {
        setFullScreen(isMobile)
    }, [isMobile])
    useEffect(() => {
        const buttonFl = {
            canReset: false,
            canSubmit: false
        }
        const hasData = Object.keys(newMarkList).length > 0
        if (hasData) {
            buttonFl.canReset = true
            buttonFl.canSubmit = !Object.values(newMarkList).some((item) => Object.values(item?.error ?? {}).some((val) => val === true))
        }
        setButtonFlag(buttonFl)
    }, [newMarkList])

    const handleReset = () => {
        resetMarks()
        setTimeout(resetRow, 100)
        setButtonFlag({ canReset: false, canSubmit: false })
    }

    const [openConfirm, confirmEle] = useConfirm({
        confirmTitle: t("info.confirmReset"),
        onConfirm: (id) => {
            mutateReset(
                { resource: EXAM_SUBJECT_MARKS_ENTRY_URL, id },
                {
                    onSuccess: () => {
                        refetch();
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

    const handleExport = () => {
        const updatedList: number[] = Object.keys(newMarkList).map((item) => Number(item))
        const markL = markList.map((item) => {
            if (updatedList.includes(item.id)) {
                return { ...item, ...newMarkList[item.id] }
            }
            return item
        })
        handleExportMarkFoil(inputColumn, esubject, markL);
    };

    const handleSubmit = () => {
        const dataToUpload = Object.values(newMarkList).map((mark) => {
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
                    refetch();
                    setTimeout(() => {
                        invalidate({
                            id: esubject.id,
                            resource: EXAM_SUBJECT_URL,
                            invalidates: ["detail"],
                        });
                        handleReset();
                    }, 2000);
                },
            }
        );
    };
    return (
        <Box mb={2}>
            <Grid container spacing={2}>
                {/* Search Box */}
                <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
                    <UCSSearch fullWidth onChange={setSearch} placeholder="Search..." />
                </Grid>

                {/* Buttons */}
                <Grid size={{ xs: 12, sm: 6, md: 8, xl: 9 }} >
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-end', // <-- aligns to right
                            gap: 4
                        }}
                    >
                        {isMobile && <FullScreenButton containerRef={containerRef} />}

                        <CanAccess resource={EXAM_RESULT_LIST} action="create">
                            <Button
                                key="post"
                                onClick={postConfirm}
                                startIcon={
                                    esubject.post_status === ExmMarkPostStatusEnum.Completed
                                        ? <CiUnlock />
                                        : <CiLock />
                                }
                                color={
                                    esubject.post_status === ExmMarkPostStatusEnum.Completed
                                        ? "warning"
                                        : "primary"
                                }
                                size="small"
                                disabled={esubject.post_status === ExmMarkPostStatusEnum.Pending}
                            >
                                {esubject.post_status === ExmMarkPostStatusEnum.Completed
                                    ? t("actions.unpost")
                                    : t("actions.post")}
                            </Button>
                        </CanAccess>

                        <CanAccess resource={EXAM_SUBJECT_MARKENTRY_AC} action="delete">
                            <Button
                                key="clear"
                                onClick={() => openConfirm(esubject.id)}
                                startIcon={<FaRegTrashAlt />}
                                color="error"
                                size="small"
                                loading={isReseting}
                                disabled={
                                    esubject.post_status === ExmMarkPostStatusEnum.Completed
                                }
                            >
                                {t("actions.clear")}
                            </Button>
                        </CanAccess>

                        <CanAccess resource={EXAM_SUBJECT_MARKENTRY_AC} action="create">
                            <Button
                                key="import"
                                onClick={() => setImportModal(true)}
                                startIcon={<RiFileExcel2Line />}
                                color="secondary"
                                size="small"
                                disabled={
                                    esubject.post_status === ExmMarkPostStatusEnum.Completed
                                }
                            >
                                {t("actions.import")}
                            </Button>

                            <Button
                                key="export"
                                onClick={handleExport}
                                startIcon={<RiFileExcel2Line />}
                                color="info"
                                size="small"
                            >
                                {t("actions.export")}
                            </Button>

                            <Button
                                key="reset"
                                onClick={handleReset}
                                startIcon={<RxReset />}
                                color="warning"
                                size="small"
                                disabled={!buttonFlag.canReset}
                            >
                                {t("actions.reset")}
                            </Button>

                            <LoadingButton
                                key="submit"
                                variant="contained"
                                startIcon={<FaRegSave />}
                                color="success"
                                onClick={handleSubmit}
                                loading={isUpdating}
                                disabled={!buttonFlag.canSubmit}
                                size="small"
                            >
                                {t("actions.submit")}
                            </LoadingButton>
                        </CanAccess>
                    </Box>
                </Grid>
            </Grid>

            {/* Import Modal & Confirmations */}
            <ImportMarks
                inputColumn={inputColumn}
                subject={esubject}
                addImport={addImport}
                marks={markList}
                open={importModal}
                close={() => setImportModal(false)}
            />
            {confirmEle}
            {confirmPostEle}
        </Box>
    );
    // return (
    //     <Box mb={2}>
    //         <Grid container spacing={2} >
    //             <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
    //                 <UCSSearch onChange={setSearch} placeholder="Search..." />
    //             </Grid>
    //             <Grid size={{ xl: 9, md: 8, sm: 6, xs: 12 }} >
    //                 <Stack direction={"row"} gap={2} >
    //                     {isMobile && <FullScreenButton containerRef={containerRef} />}
    //                     <CanAccess resource={EXAM_RESULT_LIST} action="create">
    //                         <Button
    //                             key="post"
    //                             onClick={postConfirm}
    //                             startIcon={esubject.post_status === ExmMarkPostStatusEnum.Completed ? <CiUnlock /> : <CiLock />}
    //                             color={esubject.post_status === ExmMarkPostStatusEnum.Completed ? "warning" : "primary"}
    //                             size="small"
    //                             disabled={esubject.post_status === ExmMarkPostStatusEnum.Pending}
    //                         >
    //                             {esubject.post_status === ExmMarkPostStatusEnum.Completed ? t("actions.unpost") : t("actions.post")}
    //                         </Button>
    //                     </CanAccess>
    //                     <CanAccess resource={EXAM_SUBJECT_MARKENTRY_AC} action="delete">
    //                         <Button
    //                             key="clear"
    //                             onClick={() => openConfirm(esubject.id)}
    //                             startIcon={<FaRegTrashAlt />}
    //                             color="error"
    //                             size="small"
    //                             loading={isReseting}
    //                             disabled={esubject.post_status === ExmMarkPostStatusEnum.Completed}
    //                         >
    //                             {t("actions.clear")}
    //                         </Button>
    //                     </CanAccess>
    //                     <CanAccess resource={EXAM_SUBJECT_MARKENTRY_AC} action="create">
    //                         <Button
    //                             key="import"
    //                             onClick={() => setImportModal(true)}
    //                             startIcon={<RiFileExcel2Line />}
    //                             color="secondary"
    //                             size="small"
    //                             disabled={esubject.post_status === ExmMarkPostStatusEnum.Completed}
    //                         >
    //                             {t("actions.import")}
    //                         </Button>
    //                         <Button
    //                             key="export"
    //                             onClick={handleExport}
    //                             startIcon={<RiFileExcel2Line />}
    //                             color="info"
    //                             size="small"
    //                         >
    //                             {t("actions.export")}
    //                         </Button>
    //                         <Button
    //                             key="reset"
    //                             onClick={handleReset}
    //                             startIcon={<RxReset />}
    //                             color="warning"
    //                             size="small"
    //                             disabled={!buttonFlag.canReset}
    //                         >
    //                             {t("actions.reset")}
    //                         </Button>
    //                         <LoadingButton
    //                             key="submit"
    //                             variant="contained"
    //                             startIcon={<FaRegSave />}
    //                             color="success"
    //                             onClick={handleSubmit}
    //                             loading={isUpdating}
    //                             disabled={!buttonFlag.canSubmit}
    //                             size="small"
    //                         >
    //                             {t("actions.submit")}
    //                         </LoadingButton>
    //                     </CanAccess>
    //                 </Stack>
    //             </Grid>
    //         </Grid>
    //         <ImportMarks
    //             inputColumn={inputColumn}
    //             subject={esubject}
    //             addImport={addImport}
    //             marks={markList}
    //             open={importModal}
    //             close={() => setImportModal(false)}
    //         />
    //         {confirmEle}
    //         {confirmPostEle}
    //     </Box>
    // );
};