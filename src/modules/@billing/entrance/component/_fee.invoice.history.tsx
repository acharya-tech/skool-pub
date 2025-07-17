import { Card, Grid2 as Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useList } from "@refinedev/core";
import LoadingWrapper from "@components/other/loading";
import { IStudentInfo } from "@student/interface";
import { IBillInvoice } from "../../interface";
import { BILLING_INVOICE_URL } from "../../constant";
import { StatusEnum } from "@common/all.enum";
import { LANG_BILLING } from "@common/constant";
import { useTranslate } from "@hooks/useTranslate";
import { DateLabel } from "@components/label/date.label";
import { useState } from "react";
import NoDataLabel from "@components/other/no.data";

type FeeInvoiceHistoryProps = {
    invoiceId: string
}
export const FeeInvoiceHistory = ({ invoiceId }: FeeInvoiceHistoryProps) => {
    const t = useTranslate(LANG_BILLING, "invoice");
    const [selectedInvoice, setSelectedInvoice] = useState<IBillInvoice | null>(null)
    const { data } = useList<IBillInvoice>({
        resource: BILLING_INVOICE_URL,
        meta: {
            customQuery: {
                id: invoiceId,
                status: StatusEnum.Active,
                items: true
            }
        }
    })
    const invoiceList = data?.data
    return (
        <LoadingWrapper value={invoiceList}>
            <Grid container spacing={1}>
                <Grid size={6}>
                    <TableContainer sx={{ maxHeight: 200 }}>
                        <Table stickyHeader aria-label="sticky table" className="borderedTable rowBorderOnly">
                            <TableHead>
                                <TableRow sx={{
                                    '& > .MuiTableCell-root': {
                                        p: 1
                                    },
                                }}>
                                    <TableCell sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }}>{t("fields.bill_date")}</TableCell>
                                    <TableCell sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }}>{t("fields.month")}</TableCell>
                                    <TableCell width={"20%"} sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }}>{t("fields.bill_no")}</TableCell>
                                    <TableCell width={"20%"} align="right" sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }}>{t("fields.amount")}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{}}>
                                {invoiceList?.map((invoice, index) => {
                                    return (
                                        <TableRow
                                            key={invoice.id}
                                            onClick={() => {
                                                setSelectedInvoice(invoice)
                                            }}
                                            sx={{
                                                '& > .MuiTableCell-root': {
                                                    px: 1,
                                                    py: 0
                                                },
                                                cursor: "pointer",
                                                '&:hover': {
                                                    backgroundColor: '#ddffff',
                                                },
                                                ...(selectedInvoice?.id === invoice.id && {
                                                    backgroundColor: '#ddffff',
                                                })
                                            }}>
                                            <TableCell sx={{ px: 1, py: 0.5 }}>
                                                <DateLabel date={invoice.bill_date} />
                                            </TableCell>
                                            <TableCell sx={{ px: 1, py: 0.5 }}>
                                                <Typography>{invoice.month}</Typography>
                                            </TableCell>
                                            <TableCell sx={{ px: 1, py: 0.5 }}>
                                                <Typography>{invoice.bill_no}</Typography>
                                            </TableCell>
                                            <TableCell sx={{ px: 1, py: 0.5 }}>
                                                <Typography align="right">{invoice.total_amount}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid size={6}>
                    <TableContainer sx={{ maxHeight: 200 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow sx={{
                                    '& > .MuiTableCell-root': {
                                        p: 1
                                    },
                                }}>
                                    <TableCell width={"70%"} sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }}>{t("fields.item_name")}</TableCell>
                                    <TableCell align="right" sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }}>{t("fields.amount")}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedInvoice == null && (
                                    <TableRow key={"noitem"}>
                                        <TableCell sx={{ px: 1, py: 0.5 }} colSpan={2}>
                                            <NoDataLabel />
                                        </TableCell>
                                    </TableRow>
                                )}
                                {selectedInvoice?.items?.map((item, index) => {
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell sx={{ px: 1, py: 0.5 }}>
                                                <Typography>{item.item}</Typography>
                                            </TableCell>
                                            <TableCell sx={{ px: 1, py: 0.5 }}>
                                                <Typography align="right">{item.amount}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                                {selectedInvoice && (
                                    <>
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: "#eee", px: 1, py: 0.5 }}>
                                                <Typography variant="subtitle2">{t("fields.amount")}</Typography>
                                            </TableCell>
                                            <TableCell align="right" sx={{ backgroundColor: "#eee", px: 1, py: 0.5 }}>
                                                <Typography>{selectedInvoice.amount}</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: "#eee", px: 1, py: 0.5 }}>
                                                <Typography variant="subtitle2">{t("fields.discount")}</Typography>
                                            </TableCell>
                                            <TableCell align="right" sx={{ backgroundColor: "#eee", px: 1, py: 0.5 }}>
                                                <Typography>{selectedInvoice.discount}</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: "#eee", px: 1, py: 0.5 }}>
                                                <Typography variant="subtitle2">{t("fields.tax_amount")}</Typography>
                                            </TableCell>
                                            <TableCell sx={{ backgroundColor: "#eee", px: 1, py: 0.5 }}>
                                                <Typography align="right">{selectedInvoice.tax_amount}</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: "#eee", px: 1, py: 0.5 }}>
                                                <Typography variant="subtitle2">{t("fields.total_amount")}</Typography>
                                            </TableCell>
                                            <TableCell sx={{ backgroundColor: "#eee", px: 1, py: 0.5 }}>
                                                <Typography align="right">{selectedInvoice.total_amount}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </LoadingWrapper>
    )
};