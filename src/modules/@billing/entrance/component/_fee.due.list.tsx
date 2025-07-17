import { Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material"
import { IBillFeeClass } from "../../interface"
import { TableHead } from "@mui/material"
import LoadingWrapper from "@components/other/loading"
import { useMemo, useState } from "react"

type FeeDueListProps = {
    feeClassList?: IBillFeeClass[]
    t: any,
    append: any
    update: any
    fields: any[]
}
export const FeeDueList = ({ fields, t, append, update, feeClassList }: FeeDueListProps) => {
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
        feeList.set("custom", {
            fid: "_custom",
            amount: 0,
            rate: 0,
            due: 0,
            item_name: "",
            title: "Custom",
        })
        return [...feeList.values()]
    }, [feeClassList])

    const addFeeDueToBill = (feeClass: any) => {
        const fieldIndex = fields.findIndex((field) => field.fid == feeClass.fid)
        if (fieldIndex >= 0) {
            if (feeClass.fid == "_custom") {
                append({
                    ...feeClass,
                })
            } else {
                update(fieldIndex, {
                    ...feeClass,
                })
            }
        } else {
            append({
                ...feeClass,
            })
        }
    }
    return (
        <LoadingWrapper value={feeClassList}>
            <Stack direction={"row"} justifyContent={"end"} mb={1} gap={2}>
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
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </LoadingWrapper>
    )
}