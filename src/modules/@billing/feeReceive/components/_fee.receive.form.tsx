import { Divider, Grid2 as Grid, MenuItem, TableContainer, TableRow, Typography } from "@mui/material";
import { CSDatePicker, CSHiddenInput, CSInput, CSNumber, CSSelect } from "@components/input";
import { NepaliMonthEnum } from "@common/all.enum";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableBody } from "@mui/material";
import { IconButton } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { IBillInvoiceItem } from "../../interface";
import NoDataLabel from "@components/other/no.data";

type FeeReceiveFormProps = {
    control: any;
    errors: any;
    watch: any
    fields: any[],
    remove: any,
    t: any
}
export const FeeReceiveForm = ({ control, errors, watch, t, fields, remove }: FeeReceiveFormProps) => {

    const itemsFields = watch("items");
    const calculateTotal = itemsFields?.reduce((sum: number, item: IBillInvoiceItem) => sum + ((Number(item.amount) ?? 0)), 0) ?? 0;
    const error: any = errors["items"];
    return <Grid container spacing={1} gap={0}>
        <Grid size={8}>
            <CSInput
                mini
                fullWidth
                name={`customer_name`}
                label={t("labels.student")}
                control={control}
                error={errors}
            />
        </Grid>
        <Grid size={4}>
            <CSDatePicker
                mini
                fullWidth
                name="release_date"
                label={t("labels.date")}
                defaultValue={new Date()}
                required
                control={control}
                errors={errors}
            />
        </Grid>
        <Grid size={8}>
            <CSInput
                mini
                fullWidth
                name={`customer_address`}
                label={t("labels.address")}
                control={control}
                error={errors}
            />
        </Grid>
        <Grid size={4}>
            <CSSelect
                mini
                fullWidth
                name="month"
                label={t("labels.month")}
                required
                control={control}
                errors={errors}
            >
                {Object.values(NepaliMonthEnum).map((e: NepaliMonthEnum) => {
                    return <MenuItem value={e} key={e}>{e}</MenuItem>
                })}
            </CSSelect>
        </Grid>
        <Grid size={12}>
            <TableContainer>
                <Table className="borderedTable rowBorderOnly">
                    <TableHead>
                        <TableRow sx={{
                            '& > .MuiTableCell-root': {
                                p: 1
                            },
                        }}>
                            <TableCell align="right" width={"5%"} sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }}>{t("labels.sno")}</TableCell>
                            <TableCell width={"50%"} sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }}>{t("labels.particular")}</TableCell>
                            <TableCell align="right" sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }}>{t("labels.qty")}</TableCell>
                            <TableCell width={"30%"} align="right" sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }}>{t("labels.amount")}</TableCell>
                            <TableCell align="right" sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fields.length == 0 && (
                            <TableRow key={"noitem"} sx={{
                                '& > .MuiTableCell-root': {
                                    px: 1,
                                    py: 0
                                },
                            }}>
                                <TableCell colSpan={5} sx={{ backgroundColor: "#eee", px: 1, py: 0.5 }}>
                                    <NoDataLabel />
                                </TableCell>
                            </TableRow>
                        )}
                        {fields.map((field: any, index) => (
                            <TableRow key={field.id} sx={{
                                '& > .MuiTableCell-root': {
                                    px: 1,
                                    py: 0
                                },
                            }}>
                                <TableCell sx={{ px: 1, py: 0.5 }}>
                                    <CSHiddenInput control={control} name={`items.${index}.fee`} defaultValue={field.fee} />
                                    {/* <CSHiddenInput control={control} name={`items.${index}.rate`} defaultValue={field.rate} /> */}
                                    <Typography align="left">{index + 1}</Typography>
                                </TableCell>
                                <TableCell width={"50%"} sx={{ px: 1, py: 0.5 }}>
                                    {field.fee_id ? (
                                        <>
                                            <CSHiddenInput defaultValue={field.item_name} control={control} name="item_name" />
                                            <Typography align="left">{field.item_name}</Typography>
                                        </>
                                    ) : (
                                        <CSInput
                                            mini
                                            size="small"
                                            fullWidth
                                            required
                                            name={`items.${index}.item_name`}
                                            placeholder={t("labels.fee")}
                                            control={control}
                                            error={error?.[index]?.['item_name'] ?? undefined}
                                        />
                                    )}
                                </TableCell>
                                <TableCell sx={{ px: 1, py: 0.5 }}>
                                    <Typography align="right">{field.rate > 0 ? (itemsFields[index].amount / field.rate).toFixed(2) : 1}</Typography>
                                </TableCell>
                                <TableCell width={"30%"} align="right" sx={{ px: 1, py: 0.5 }}>
                                    <CSNumber
                                        mini
                                        fullWidth
                                        required
                                        min={1}
                                        textAlign="right"
                                        name={`items.${index}.amount`}
                                        error={error?.[index]?.['amount'] ?? undefined}
                                        placeholder={t("labels.amount")}
                                        control={control}
                                    />
                                </TableCell>
                                <TableCell width={"10px"} align="right" sx={{ px: 1, py: 0.5 }}>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => remove(index)}
                                    >
                                        <FaTrash fontSize={"small"} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow key={"total"}>
                            <TableCell sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }} align="left" colSpan={3}><Typography variant="subtitle1">{t("labels.total")}</Typography></TableCell>
                            <TableCell sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }} align="right" ><Typography variant="subtitle1">{calculateTotal.toFixed(2)}</Typography></TableCell>
                            <TableCell sx={{ backgroundColor: "#ddd", px: 1, py: 0.5 }} align="right" ></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {errors.items && <Typography color="error">{errors?.items?.root?.message as unknown as string}</Typography>}
            <Grid size={12} >
                <Divider sx={{ my: 2 }} />
            </Grid>
            <Grid size={12} >
                <CSInput
                    fullWidth
                    multiline={2}
                    name="remark"
                    label={t("labels.remarks")}
                    control={control}
                    errors={errors}
                />
            </Grid>
        </Grid>
    </Grid>
};