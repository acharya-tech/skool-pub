import { useAutocomplete } from "@refinedev/mui";
import { ACCOUNT_LEDGER_URL } from "../constant/server.urls";
import { IAccountLedger } from "../interface";
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TextField, Typography } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_ACCOUNT } from "@common/constant";
import { useFieldArray } from "react-hook-form";
import { CSAutoComplete, CSHiddenInput, CSInput, CSNumber } from "@components/input";
import { DeleteOutlined } from "@mui/icons-material";
import { BiPlus } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";

type VoucherFormProps = {
    control: any;
    watch: any;
    errors: any;
    multiDr?: boolean;
    multiCr?: boolean;
}
export const VoucherForm = ({ control, watch, errors, multiDr = true, multiCr = true }: VoucherFormProps) => {
    const t = useTranslate(LANG_ACCOUNT, "entry");
    const { autocompleteProps: ledgerAutoProps } = useAutocomplete<IAccountLedger>({
        resource: ACCOUNT_LEDGER_URL,
        meta: {
            customQuery: {
                ledgerGroup: true
            }
        },
        onSearch: (value: string) => {
            return [
                {
                    field: "name",
                    operator: "eq",
                    value,
                }
            ];
        },
    });
    const { fields: drFields, append: addDr, remove: removeDr } = useFieldArray({
        name: "drEntry",
        control
    })

    const { fields: crFields, append: addCr, remove: removeCr } = useFieldArray({
        name: "crEntry",
        control,
    })
    const crError = errors["crEntry"];
    const drError = errors["drEntry"];

    const [drFieldsValue, crFieldsValue] = watch(["drEntry", "crEntry"])

    const drTotal = drFieldsValue?.reduce((total: number, item: any) => {
        return total + Number(item.amount)
    }, 0) ?? 0

    const crTotal = crFieldsValue?.reduce((total: number, item: any) => {
        return total + Number(item.amount)
    }, 0) ?? 0

    return (
        <Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="subtitle2">{t("fields.account").toUpperCase()}</Typography></TableCell>
                            <TableCell width={"20%"}><Typography variant="subtitle2">{t("fields.debit").toUpperCase()}</Typography></TableCell>
                            <TableCell width={"20%"}><Typography variant="subtitle2">{t("fields.credit").toUpperCase()}</Typography></TableCell>
                            <TableCell width={"5%"}><Typography variant="subtitle2">{t("@table.actions").toUpperCase()}</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {drFields.map((field, index) => {
                            return (
                                <TableRow key={index} sx={{ backgroundColor: "#64b9f533" }}>
                                    <TableCell>
                                        <CSAutoComplete
                                            fullWidth
                                            required
                                            getOptionLabel={(r: IAccountLedger) => `${r.code} | ${r.name} - ${r.ledgerGroup.name}`}
                                            renderLabel={(r: IAccountLedger) => `${r.code} | ${r.name} - ${r.ledgerGroup.name}`}
                                            autocompleteProps={ledgerAutoProps}
                                            name={`drEntry.${index}.ledger`}
                                            label={t("fields.by").toUpperCase()}
                                            control={control}
                                            error={drError?.[index]?.['ledger'] ?? undefined}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <CSNumber
                                            control={control}
                                            name={`drEntry.${index}.amount`}
                                            label={t("fields.amount").toUpperCase()}
                                            min={1}
                                            required
                                            error={drError?.[index]?.['amount'] ?? undefined}
                                        />
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        {(index === 0 && multiDr) ? (
                                            <IconButton onClick={() => addDr({ ledger: "", amount: 0 })} >
                                                <FaPlusCircle color="success" />
                                            </IconButton>
                                        ) : multiDr && (
                                            <IconButton onClick={() => removeDr(index)} >
                                                <DeleteOutlined color="error" />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        {crFields.map((field, index) => {
                            return (
                                <TableRow key={index} sx={{ backgroundColor: "#f5f16433" }}>
                                    <TableCell>
                                        <CSAutoComplete
                                            fullWidth
                                            required
                                            getOptionLabel={(r: IAccountLedger) => `${r.code} | ${r.name} - ${r.ledgerGroup.name}`}
                                            renderLabel={(r: IAccountLedger) => `${r.code} | ${r.name} - ${r.ledgerGroup.name}`}
                                            autocompleteProps={ledgerAutoProps}
                                            name={`crEntry.${index}.ledger`}
                                            label={t("fields.to").toUpperCase()}
                                            control={control}
                                            error={crError?.[index]?.['ledger'] ?? undefined}
                                        />
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <CSNumber
                                            control={control}
                                            name={`crEntry.${index}.amount`}
                                            label={t("fields.amount")}
                                            min={1}
                                            required
                                            error={crError?.[index]?.['amount'] ?? undefined}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {(index === 0 && multiCr) ? (
                                            <IconButton onClick={() => addCr({ ledger: "", amount: 0 })} >
                                                <FaPlusCircle color="green" />
                                            </IconButton>
                                        ) : multiCr && (
                                            <IconButton onClick={() => removeCr(index)} >
                                                <DeleteOutlined color="error" />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                    </TableBody>
                    <TableFooter sx={{ backgroundColor: "#74f5641a" }}>
                        <TableRow key={"total"}>
                            <TableCell>
                                <Typography variant="subtitle2">{t("fields.total").toUpperCase()}</Typography>
                            </TableCell>
                            <TableCell>
                                <TextField size="small" sx={{ backgroundColor: "#fff" }} inputProps={{ style: { textAlign: "right" } }} disabled value={drTotal} />
                            </TableCell>
                            <TableCell>
                                <TextField size="small" sx={{ backgroundColor: "#fff" }} inputProps={{ style: { textAlign: "right" } }} disabled value={crTotal} />
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <CSInput
                                    fullWidth
                                    multiline={3}
                                    name="narration"
                                    required
                                    label={t("fields.narration")}
                                    control={control}
                                    errors={errors}
                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <CSHiddenInput
                control={control}
                name="total"
                rules={{
                    validate: (value: string, fd: any) => {
                        if (drTotal != crTotal) {
                            return t('validation.total')
                        }
                        return undefined
                    }
                }}
            />
            {errors?.total?.message && (
                <Typography color="error">{errors?.total?.message}</Typography>
            )}

        </Box>
    )
}