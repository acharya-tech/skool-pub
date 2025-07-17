import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material"
import { IBillFeeClass, IStudentDueByFeeHead } from "../../interface"
import { TableHead } from "@mui/material"
import LoadingWrapper from "@components/other/loading"
import { IStudentInfo } from "@student/interface"
import { useMemo, useState } from "react"
import { BillFeeReleaseTypeEnum } from "../../constant"

type FeeDueListProps = {
    feeDue?: IStudentDueByFeeHead
    feeClassList?: IBillFeeClass[]
    t: any,
    append: any
    update: any
    fields: any[]
    student: IStudentInfo
}
export const FeeDueList = ({ feeDue, fields, student, t, append, update, feeClassList }: FeeDueListProps) => {
    const [searchDue, setSearchDue] = useState<string | null>(null)
    const feeList = useMemo(() => {
        const feeList = new Map()
        feeClassList?.forEach((feeClass) => {
            feeList.set(feeClass.fee_id, {
                fid: feeClass.fee_id,
                fee_id: feeClass.fee_id,
                title: feeClass.fee.name,
                item_name: feeClass.fee.name,
                due: 0,
                amount: feeClass.amount,
                rate: feeClass.amount,
            })
        })
        const studentFeeDue = new Map<string, Map<string, number>>()
        feeDue?.dues.forEach(due => {
            const amount = Number(due.amount)
            const preFee = studentFeeDue.get(due.student_id) ?? new Map<string, number>()
            const oldDue = preFee.get(due.fee_id) ?? 0
            if (due.type === BillFeeReleaseTypeEnum.Fee) {
                preFee.set(due.fee_id, oldDue + amount)
            } else {
                preFee.set(due.fee_id, oldDue - amount)
            }
            studentFeeDue.set(due.student_id, preFee)
        })
        feeDue?.feeHeads?.forEach(feeHead => {
            const dueAmount = (studentFeeDue.get(student.id)?.get(feeHead.id)) as unknown as number
            if (dueAmount < 0) {
                return
            }
            if (!feeList.has(feeHead.id)) {
                feeList.set(feeHead.id, {
                    fid: feeHead.id,
                    fee_id: feeHead.id,
                    title: feeHead.name,
                    item_name: feeHead.name,
                    due: Number(dueAmount),
                    amount: Number(dueAmount),
                    rate: Number(dueAmount),
                })
            } else {
                feeList.set(feeHead.id, {
                    ...(feeList.get(feeHead.id)),
                    due: dueAmount
                })
            }
        })
        feeList.set("custom", {
            fid: "_custom",
            amount: 0,
            rate: 0,
            due: 0,
            item_name: "",
            title: "Custom",
        })
        return [...feeList.values()]
    }, [feeDue, feeClassList])

    const addFeeDueToBill = (feeClass: any) => {
        const fieldIndex = fields.findIndex((field) => field.fid == feeClass.fid)
        if (fieldIndex >= 0) {
            if (feeClass.fid == "_custom") {
                append({
                    ...feeClass,
                    amount: feeClass.due > 0 ? feeClass.due : feeClass.amount,
                })
            } else {
                update(fieldIndex, {
                    ...feeClass,
                    amount: feeClass.due > 0 ? feeClass.due : feeClass.amount,
                })
            }
        } else {
            append({
                ...feeClass,
                amount: feeClass.due > 0 ? feeClass.due : feeClass.amount,
            })
        }

    }
    return (
        <LoadingWrapper value={feeClassList}>
            <Stack direction={"row"} justifyContent={"end"} mb={1} gap={2}>
                <Button
                    size="small"
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                        feeList.filter(fee => fee.due > 0).forEach(feeClass => {
                            addFeeDueToBill(feeClass)
                        })
                    }}
                    sx={{
                        minWidth: "40px",
                        padding: "2px 6px",
                        fontSize: "10px",
                        height: "24px",
                        lineHeight: "1",
                    }}
                >
                    {t("actions.addAllDue")}
                </Button>
                <TextField
                    size="small"
                    type="search"
                    placeholder={t("@buttons.search")}
                    sx={{
                        height: "24px",
                        "& .MuiInputBase-root": {
                            height: "100%",
                            fontSize: "12px",
                            padding: "2px 6px",
                        },
                        "& input": {
                            padding: "0px 6px",
                        },
                        "& .MuiInputLabel-root": {
                            fontSize: "12px",
                        },
                    }}
                    value={searchDue}
                    onChange={(e) => setSearchDue(e.target.value)}
                />
            </Stack>
            <TableContainer sx={{ maxHeight: 300 }}>
                <Table stickyHeader aria-label="sticky table" className="borderedTable rowBorderOnly">
                    <TableHead>
                        <TableRow sx={{
                            '& > .MuiTableCell-root': {
                                p: 1
                            },
                        }}>
                            <TableCell align="right" width={"5%"} sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }}>{t("labels.sno")}</TableCell>
                            <TableCell width={"50%"} sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }}>{t("labels.particular")}</TableCell>
                            <TableCell align="right" sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }}>{t("labels.amount")}</TableCell>
                            <TableCell width={"30%"} align="right" sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }}>{t("labels.dueAmount")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {feeList.filter(fee => {
                            if (searchDue === null) {
                                return true
                            }
                            return fee.title.toLowerCase().includes(searchDue.toLowerCase())
                        }).map((feeClass, index) => {
                            return (
                                <TableRow
                                    key={feeClass.id}
                                    onClick={() => {
                                        addFeeDueToBill(feeClass)
                                    }}
                                    sx={{
                                        '& > .MuiTableCell-root': {
                                            px: 1,
                                            py: 0
                                        },
                                        cursor: "pointer",
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}>
                                    <TableCell sx={{ px: 1, py: 0.5 }}>
                                        <Typography>{index + 1}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ px: 1, py: 0.5 }}>
                                        <Typography>{feeClass.title}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ px: 1, py: 0.5 }} align="right">
                                        <Typography>{feeClass.amount}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ px: 1, py: 0.5 }} align="right">
                                        <Typography>{feeClass.due ?? 0}</Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </LoadingWrapper>
    )
}