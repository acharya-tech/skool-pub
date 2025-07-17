import { Box, Button, Divider, Grid2 as Grid, IconButton, Input, LinearProgress, Stack, Typography } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter, useGridApiRef } from "@mui/x-data-grid";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_STUDENT } from "@common/constant";
import { RiFileExcel2Line } from "react-icons/ri";
import { useExcelGrid } from "@student/utils/hooks";
import { ATFormProps } from "src/interfaces";
import { useEffect, useRef, useState } from "react";
import { STUDENT_IMPORT_REQUIRED_COLUMN, validateStudentCell } from "@student/utils";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Delete } from "@mui/icons-material";
import { useConfirm } from "@hooks/confirm.hook";
import { useCreate } from "@refinedev/core";
import { STUDENT_ADMISSION_IMPORT_URL } from "@student/constant";
import { UCSAutoComplete, UCSCheckbox, UCSInput } from "@components/input/uc.input";
import { ACADEMIC_BATCH_URL, ACADEMIC_CLASS_URL } from "@academic/constant/server.url";
import { useAutocomplete } from "@refinedev/mui";
import { IBatch, IClass } from "@academic/interface";
import { YesNoEnum } from "@common/all.enum";

export const ImportStudent = ({ open, onClose }: ATFormProps) => {
    const t = useTranslate(LANG_STUDENT, "admission");
    const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
        meta: { customQuery: { program: true } },
        resource: ACADEMIC_CLASS_URL,
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

    const { autocompleteProps: batchAutoProps } = useAutocomplete<IBatch>({
        resource: ACADEMIC_BATCH_URL,
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
    const [classBatch, setClassBatch] = useState<{ class: IClass | null, batch: IBatch | null, create: YesNoEnum }>({ class: null, batch: null, create: YesNoEnum.No })
    const [selectionModel, setSelectionModel] = useState<any[]>([]);
    const {
        rows,
        columns,
        onFileChange,
        setRows,
        isLoading: isImporting,
        reset
    } = useExcelGrid();
    const errors = useRef<any[]>([])
    const [requiredColError, setRequiredColError] = useState<string | null>(null)
    const apiRef = useGridApiRef();
    const [confirm, confirmEle] = useConfirm({
        onConfirm: () => {
            handleImport()
        }
    })
    const { mutate } = useCreate({
        resource: STUDENT_ADMISSION_IMPORT_URL
    })
    const handleImport = () => {
        const rowsIds = apiRef.current.getAllRowIds()
        const rows: any[] = []
        rowsIds.forEach(rowId => {
            rows.push(apiRef.current.getRow(rowId))
        })
        mutate({
            values: {
                class: classBatch.class,
                batch: classBatch.batch,
                createStudent: classBatch.create,
                rows
            }
        }, {
            onSuccess: () => {
                onClose()
            }
        })
    }
    const handleDeleteRow = () => {
        setRows((prevRows) =>
            prevRows.filter((row) => !selectionModel.includes(row.id))
        );
    };

    useEffect(() => {
        if (columns.length > 0) {
            const availableColumns = columns.map(col => col.field)
            const missingColumn = STUDENT_IMPORT_REQUIRED_COLUMN.filter((col: any) => !availableColumns.includes(col))
            if (missingColumn.length > 0) {
                setRequiredColError(t("info.missingColumn") + missingColumn.join(", "))
            } else {
                setRequiredColError(null)
            }
        }
    }, [columns])
    return (
        <>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="h5" gutterBottom>
                    {t("titles.import")}
                    {columns.length > 0 && (
                        " : " + t("fields.class") + ":" + classBatch.class?.name + " | " + t("fields.batch") + ":" + classBatch.batch?.name
                    )}
                </Typography>
                <IconButton color="error" onClick={onClose}>
                    <IoIosCloseCircleOutline />
                </IconButton>
            </Stack>
            <Divider />
            <Box minHeight={"50vh"}>
                {columns.length === 0 && !isImporting && (
                    <Box py={2}>
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <UCSAutoComplete
                                    onChange={(aclass: IClass) => {
                                        setClassBatch(pre => ({ ...pre, class: aclass }))
                                    }}
                                    value={classBatch.class}
                                    size="small"
                                    fullWidth
                                    required
                                    disabled={isImporting}
                                    groupBy={(option: IClass) => option.program.name}
                                    getOptionLabel={(r: any) => r.name}
                                    autocompleteProps={classAutoProps}
                                    label={t("fields.class")}
                                />
                            </Grid>
                            <Grid size={6}>
                                <UCSAutoComplete
                                    onChange={(abatch: IBatch) => {
                                        setClassBatch(pre => ({ ...pre, batch: abatch }))
                                    }}
                                    value={classBatch.batch}
                                    size="small"
                                    fullWidth
                                    disabled={isImporting}
                                    required
                                    getOptionLabel={(r: any) => r.name}
                                    autocompleteProps={batchAutoProps}
                                    label={t("fields.batch")}
                                />
                            </Grid>
                            <Grid size={12}>
                                <UCSInput
                                    fullWidth
                                    value={null}
                                    label={t("fields.excel")}
                                    type="file"
                                    disabled={classBatch.class === null || classBatch.batch === null || isImporting}
                                    inputProps={{ accept: ".xlsx, .xls" }}
                                    onChange={onFileChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {(isImporting || columns.length > 0) && (
                    <Box height={"80vh"}>
                        <DataGrid
                            apiRef={apiRef}
                            rows={rows}
                            columns={columns.map((col) => ({
                                ...col,
                                editable: true,
                            }))}
                            checkboxSelection
                            onRowSelectionModelChange={(newSelection: any) => {
                                setSelectionModel(newSelection);
                            }}
                            rowSelectionModel={selectionModel}
                            rowCount={rows.length}
                            loading={isImporting}
                            paginationMode="client"
                            sortingMode="client"
                            filterMode="client"
                            disableColumnFilter
                            disableColumnSelector
                            disableDensitySelector
                            hideFooterPagination
                            slots={{
                                toolbar: () => QuickSearchToolbar({
                                    t,
                                    createStudent: classBatch.create,
                                    setCheck: (check: YesNoEnum) => {
                                        setClassBatch(pre => ({ ...pre, create: check }))
                                    },
                                    handleImport: confirm,
                                    reset,
                                    disabled: errors.current.length > 0 || rows.length === 0 || Boolean(requiredColError),
                                    isImporting,
                                    error: requiredColError,
                                    handleDeleteRow,
                                    isRowSelected: selectionModel.length > 0
                                })
                            }}
                            getCellClassName={(params) => {
                                const error = Boolean(validateStudentCell(params.field, params.value, params.row))
                                if (error && !errors.current.includes(params.id)) {
                                    errors.current.push(params.id)
                                }
                                if (!error && errors.current.includes(params.id)) {
                                    errors.current.splice(errors.current.indexOf(params.id), 1)
                                }
                                return error ? "error-cell" : "";
                            }}
                            editMode="cell"
                        />
                    </Box>
                )}
            </Box>
            {confirmEle}
            <style>
                {`
          .error-cell {
            background-color: #f8d7da;
            color: #721c24;
          }
        `}
            </style>
        </>
    );
};

function QuickSearchToolbar({
    handleImport,
    createStudent,
    setCheck,
    reset,
    t,
    disabled,
    isImporting,
    error,
    isRowSelected,
    handleDeleteRow
}: any) {
    return (
        <Box py={2} gap={2} display="flex" justifyContent="space-between">
            <Typography color="error">{error}</Typography>
            <Box py={2} gap={2} display="flex" justifyContent="flex-end" alignItems={"center"}>
                <UCSCheckbox
                    value={createStudent}
                    checkedValue={YesNoEnum.Yes}
                    label={t("actions.setStudent")}
                    disabled={isImporting}
                    onChange={(e: any) => {
                        setCheck(e.target.checked ? YesNoEnum.Yes : YesNoEnum.No)
                    }}
                />
                <Button
                    startIcon={<RiFileExcel2Line />}
                    onClick={handleImport}
                    color="secondary"
                    size="small"
                    key="import"
                    variant="outlined"
                    disabled={disabled || isImporting}
                >
                    {t("actions.import")}
                </Button>
                <Button
                    startIcon={<Delete />}
                    onClick={handleDeleteRow}
                    color="error"
                    size="small"
                    key="delete"
                    variant="outlined"
                    disabled={!isRowSelected || isImporting}
                >
                    {t("actions.deleteRow")}
                </Button>
                <Button color="warning" variant="outlined" size="small" onClick={reset} disabled={isImporting}>
                    {t("@buttons.reset")}
                </Button>
                <GridToolbarQuickFilter disabled={isImporting} size="small" />
            </Box>
        </Box>
    );
}
