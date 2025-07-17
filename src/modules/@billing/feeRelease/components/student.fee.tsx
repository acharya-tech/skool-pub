import { useCreate, useUpdate } from "@refinedev/core";
import { FeeReleaseTabState, FeeReleaseType, IBillFeeClass, IBillPrePostStudentList } from "../../interface";
import { BillFeeReleaseDuplicateEnum, BILLING_FEE_RELEASE_CREATE_FEE_URL } from "../../constant";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_BILLING } from "@common/constant";
import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { GridColDef, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { List } from "@refinedev/mui";
import { RxReset } from "react-icons/rx";
import LoadingButton from "@mui/lab/LoadingButton";
import { FaRegSave } from "react-icons/fa";
import { TableGrid } from "@components/table/table.body";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { FormGroup } from "@mui/material";
import { NepaliMonthEnum } from "@common/all.enum";
import { NotSetLabel } from "@components/label/notset.label";
import { CiCircleCheck } from "react-icons/ci";
import { UCSSelect } from "@components/input/uc.input";
type StudentFeeListProps = {
    students: IBillPrePostStudentList[]
    release: FeeReleaseType
    month: NepaliMonthEnum
    postDate: string
    handleSetTab: (feeClass: IBillFeeClass, state: FeeReleaseTabState) => void
    tabState: FeeReleaseTabState
}
export const StudentFeeList = ({ students: data, release, month, postDate, tabState, handleSetTab }: StudentFeeListProps) => {
    const t = useTranslate(LANG_BILLING, "feeRelease");
    const [students, setStudents] = useState<IBillPrePostStudentList[]>([])
    const { mutate, isLoading: isUpdating } = useCreate({
        resource: BILLING_FEE_RELEASE_CREATE_FEE_URL
    })
    const handleReset = () => {
        setStudents(data.map((student) => {
            return {
                id: student.student.id,
                ...student,
            }
        }))
    }

    useEffect(() => {
        if (data) {
            handleReset()
        }
    }, [data])

    const handleSubmit = () => {
        mutate({
            values: {
                feeClass: release?.fee,
                month,
                release_date: postDate,
                studentMeta: students,
                duplicate: tabState?.duplicate
            }
        }, {
            onSuccess: () => {
                handleSetTab(release.fee, {
                    ...tabState,
                    icon: <CiCircleCheck color="success" />,
                    loaded: false
                })
            }
        })
    }
    const submitDisabled = students.some((student) => {
        return Number(student.amount ?? 0) < 1
    }) || (tabState.duplicate === null && tabState.oldRelease > 0) || students.length === 0

    const handleDelete = (studentId: string) => {
        setStudents((pre) => {
            return pre.filter((student) => student.student.id !== studentId)
        })
    }

    const handleDuplicate = (duplicate: BillFeeReleaseDuplicateEnum) => {
        handleSetTab(release.fee, {
            ...tabState,
            duplicate,
        })
    }

    const columns = useMemo<GridColDef<IBillPrePostStudentList>[]>(
        () => [
            {
                field: "student.regid",
                headerName: t("fields.regid"),
                sortable: true,
                width: 150,
                renderCell: function render({ row }) {
                    return (
                        <Typography>{row.student.regid}</Typography>
                    )
                }
            },
            {
                field: "student.full_name",
                headerName: t("fields.name"),
                sortable: true,
                renderCell: function render({ row }) {
                    return (
                        <Typography>{row.student.full_name}</Typography>
                    )
                }
            },
            {
                field: "student.section.name",
                headerName: t("fields.section"),
                sortable: true,
                width: 100,
                renderCell: function render({ row }) {
                    return (
                        <Typography>{row.student.section?.name}</Typography>
                    )
                }
            },
            {
                field: "student.roll_no",
                headerName: t("fields.roll_no"),
                sortable: true,
                width: 100,
                renderCell: function render({ row }) {
                    return (
                        <Typography>{row.student.roll_no}</Typography>
                    )
                }
            },
            {
                field: "amount",
                headerName: t("fields.post_amount"),
                sortable: true,
                width: 150,
                renderCell: function render({ row }) {
                    return <TextField
                        type="number"
                        value={row.amount ?? release.amount}
                        error={row.amount <= 0}
                        inputProps={{
                            min: 1
                        }}
                        onChange={(e) => {
                            setStudents((pre) => {
                                return pre.map((student) => {
                                    if (student.student.id === row.student.id) {
                                        return {
                                            ...student,
                                            amount: Number(e.target.value)
                                        }
                                    }
                                    return student
                                })
                            })
                        }} />
                }
            },
            {
                field: "old_release",
                headerName: t("fields.old_release"),
                renderCell: function render({ row }) {
                    if (row.previous.length == 0) {
                        return <NotSetLabel />
                    }
                    return <Stack direction="row" spacing={1}>
                        {
                            row.previous.map((item, index) => {
                                return <Typography key={index}>{item.amount}</Typography>
                            })
                        }
                    </Stack>
                }
            },
            {
                field: "actions",
                headerName: t("@table.actions"),
                align: "center",
                headerAlign: "center",
                width: 100,
                renderCell: function render({ row }) {
                    return (
                        <IconButton
                            sx={{
                                color: "text.secondary",
                            }}
                            onClick={() => handleDelete(row.student.id)}
                        >
                            <Delete />
                        </IconButton>
                    );
                },
            },
        ],
        [t, handleDelete],
    );
    return <List
        title={t("titles.students")}
        breadcrumb={false}
        wrapperProps={{
            sx: {
                backgroundColor: "transparent",
                backgroundImage: "none",
                boxShadow: "none",
                padding: "0px",
            },
        }}
        headerButtons={(props) => [
            <FormGroup key={"duplicate"}>
                {
                    tabState.oldRelease > 0 && (
                        <UCSSelect
                            label={t("fields.duplicate_release")}
                            size="small"
                            value={tabState.duplicate}
                            defaultValue={BillFeeReleaseDuplicateEnum.Double}
                            onChange={(e: any) => {
                                handleDuplicate(e.target.value)
                            }}
                        >
                            {Object.keys(BillFeeReleaseDuplicateEnum).map((item, index) => {
                                return <MenuItem
                                    key={index}
                                    value={item}>{item}</MenuItem>
                            })}
                        </UCSSelect>
                    )
                }
            </FormGroup>,
            <Button
                onClick={handleReset}
                startIcon={<RxReset />}
                color="warning"
                size="small"
                key="reset"
            >{t("actions.reset")}</Button>,
            <LoadingButton
                variant="contained"
                startIcon={<FaRegSave />}
                color="success"
                disabled={submitDisabled}
                onClick={handleSubmit}
                loading={isUpdating}
                size="small"
                key="submit"
            >{t("actions.submit")}</LoadingButton>
        ]}
    >
        <TableGrid
            rows={students ?? []}
            rowCount={students.length ?? 0}
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
                <GridToolbarQuickFilter size="medium" />
            </Box>
            <Divider />
        </>
    );
}
