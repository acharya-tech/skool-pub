import { HttpError, useList } from "@refinedev/core";
import { IClass } from "@academic/interface";
import { FeeReleaseType, FeeReleaseTypeList, IBillFeeClass } from "../../interface";
import { BILLING_FEE_CLASS_LIST, BILLING_FEE_CLASS_URL } from "../../constant";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_BILLING } from "@common/constant";
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type ReleaseFeeListProps = {
    aclass?: IClass,
    feeRelease: FeeReleaseTypeList,
    setFeeRelease: React.Dispatch<React.SetStateAction<FeeReleaseTypeList>>
}
export const ReleaseFeeList = ({ aclass, feeRelease, setFeeRelease }: ReleaseFeeListProps) => {
    const t = useTranslate(LANG_BILLING, "feeRelease");
    const [postAmount, setPostAmount] = useState<FeeReleaseTypeList>({})
    const { data, isLoading } = useList<IBillFeeClass, HttpError>({
        resource: BILLING_FEE_CLASS_URL,
        meta: { customQuery: { fee: true, class: true, class_id: aclass?.id } },
        queryOptions: {
            enabled: !!aclass
        },
        pagination: {
            pageSize: 1000
        },
    });
    useEffect(() => {
        setFeeRelease((prev) => {
            return Object.keys(prev).reduce((acc: FeeReleaseTypeList, e) => {
                acc[e] = postAmount[e]
                return acc
            }, {})
        })
    }, [postAmount])

    useEffect(() => {
        if (data?.data) {
            setPostAmount((prev) => {
                return data?.data.reduce((acc: FeeReleaseTypeList, e) => {
                    acc[e.id] = {
                        amount: e.amount,
                        fee: e
                    }
                    return acc
                }, {})
            })
        }
    }, [data?.data])
    return (
        <TableContainer>
            <Table style={{ minWidth: "650" }} size="small">
                <TableHead >
                    <TableRow>
                        <TableCell width={40}></TableCell>
                        <TableCell align="left">{t("fields.name")}</TableCell>
                        <TableCell width={100}>{t("fields.fee_type")}</TableCell>
                        <TableCell width={200}>{t("fields.amount")}</TableCell>
                        <TableCell width={200}>{t("fields.post_amount")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.data.map((row) => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell scope="row" sx={{ py: 0, borderBottom: "1px solid #e0e0e0" }}>
                                    <Checkbox
                                        checked={Boolean(feeRelease[row.id as string])}
                                        onChange={(e: any) => {
                                            if (e.target.checked) {
                                                setFeeRelease((prev) => {
                                                    return {
                                                        ...prev,
                                                        [row.id as string]: postAmount[row.id as string]
                                                    }
                                                })
                                            } else {
                                                setFeeRelease((prev) => {
                                                    let temp = { ...prev }
                                                    delete temp[row.id as string];
                                                    return temp;
                                                })
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell scope="row" sx={{ py: 0, borderBottom: "1px solid #e0e0e0" }}>
                                    {row.fee?.name}
                                </TableCell>
                                <TableCell scope="row" sx={{ py: 0, borderBottom: "1px solid #e0e0e0" }}>
                                    {row.fee.type}
                                </TableCell>
                                <TableCell scope="row" sx={{ py: 0, borderBottom: "1px solid #e0e0e0" }}>
                                    {row.amount}
                                </TableCell>
                                <TableCell scope="row" sx={{ py: 0, borderBottom: "1px solid #e0e0e0" }}>
                                    <TextField
                                        type="number"
                                        size="small"
                                        inputProps={{
                                            style: {
                                                textAlign: "right",
                                                padding: "5px 10px"
                                            }
                                        }}
                                        value={postAmount[row.id]?.amount ?? 0}
                                        onChange={(e) => {
                                            setPostAmount((prev: FeeReleaseTypeList) => {
                                                return {
                                                    ...prev,
                                                    [row.id]: {
                                                        amount: Number(e.target.value),
                                                        fee: row
                                                    }
                                                }
                                            })
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};