import { Chip, Grid2 as Grid, MenuItem } from "@mui/material";
import { AccounPayrollTypeEnum, AccountLedgerGroupTypeEnum, AccountVoucherStatusEnum } from "../constant/enum";
import { IAccountLedger, IAccountPayrollReleaseForm } from "../interface";
import { UCSAutoComplete, UCSCheckbox, UCSDatePicker, UCSInput, UCSSelect } from "@components/input/uc.input";
import { NepaliMonthEnum, YesNoEnum } from "@common/all.enum";
import { ACCOUNT_LEDGER_URL } from "../constant/server.urls";
import { useAutocomplete } from "@refinedev/mui";

export const VoucherState = ({ state }: { state?: AccountVoucherStatusEnum }) => {
    let color = "secondary";
    if (state === AccountVoucherStatusEnum.Pending) {
        color = "info";
    } else if (state === AccountVoucherStatusEnum.Approved) {
        color = "success";
    } else if (state === AccountVoucherStatusEnum.Discarded) {
        color = "error";
    }
    return <Chip size="small" color={color as any} label={state} />;
};

type PayrollReleaseFormProps = {
    payrollRelease: Partial<IAccountPayrollReleaseForm>
    setPayrollRelease: any
    t: any
    enableAuto: boolean
}
export const PayrollReleaseForm = ({ payrollRelease, enableAuto, setPayrollRelease, t }: PayrollReleaseFormProps) => {
    const { autocompleteProps: ledgerAutoProps } = useAutocomplete<IAccountLedger>({
        resource: ACCOUNT_LEDGER_URL,
        meta: {
            customQuery: {
                group_type: payrollRelease.type === AccounPayrollTypeEnum.Payment ? [AccountLedgerGroupTypeEnum.Bank, AccountLedgerGroupTypeEnum.Cash] : [AccountLedgerGroupTypeEnum.Salary]
            }
        },
        onSearch: (value: string) => {
            return [
                {
                    field: "name",
                    operator: "eq",
                    value,
                },
                {
                    field: "code",
                    operator: "eq",
                    value,
                },
            ];
        },
    });
    return (
        <Grid container spacing={2}>
            <Grid size={4}>
                <UCSSelect
                    fullWidth
                    value={payrollRelease.type}
                    onChange={(e: any) => {
                        setPayrollRelease((pre: any) => {
                            return {
                                ...pre,
                                type: e.target.value as AccounPayrollTypeEnum
                            }
                        })
                    }}
                    label={t("fields.type")}
                    required
                >
                    {Object.values(AccounPayrollTypeEnum).map((e: AccounPayrollTypeEnum) => {
                        return <MenuItem key={e} value={e}>{e}</MenuItem>
                    })}
                </UCSSelect>
            </Grid>
            <Grid size={4}>
                <UCSSelect
                    fullWidth
                    value={payrollRelease.month}
                    label={t("fields.month")}
                    onChange={(e: any) => {
                        setPayrollRelease((pre: any) => {
                            return {
                                ...pre,
                                month: e.target.value as AccounPayrollTypeEnum
                            }
                        })
                    }}
                    required
                >
                    {Object.values(NepaliMonthEnum).map((e: NepaliMonthEnum) => {
                        return <MenuItem key={e} value={e}>{e}</MenuItem>
                    })}
                </UCSSelect>
            </Grid>
            <Grid size={4}>
                <UCSDatePicker
                    fullWidth
                    label={t("fields.date")}
                    onChange={(value: any) => {
                        setPayrollRelease((pre: any) => {
                            return {
                                ...pre,
                                date: value
                            }
                        })
                    }}
                    value={payrollRelease.date}
                />
            </Grid>
            <Grid size={4}>
                <UCSAutoComplete
                    fullWidth
                    required
                    getOptionLabel={(r: IAccountLedger) => `${r.name} | ${r.code}`}
                    autocompleteProps={ledgerAutoProps}
                    value={payrollRelease.ledger}
                    onChange={(value: any) => {
                        setPayrollRelease((pre: any) => {
                            return {
                                ...pre,
                                ledger: value
                            }
                        })
                    }}
                    label={t("fields.ledger")}
                />
            </Grid>
            <Grid size={4}>
                <UCSInput
                    fullWidth
                    type="number"
                    value={payrollRelease.amount}
                    disabled={payrollRelease.auto_amount === YesNoEnum.Yes}
                    onChange={(e: any) => {
                        setPayrollRelease((pre: any) => {
                            return {
                                ...pre,
                                amount: e.target.value
                            }
                        })
                    }}
                    label={t("fields.amount")}
                />
            </Grid>
            {enableAuto && (
                <Grid size={4}>
                    <UCSCheckbox
                        value={payrollRelease.auto_amount}
                        checkedValue={YesNoEnum.Yes}
                        label={t("fields.auto_amount")}
                        onChange={(e: any) => {
                            setPayrollRelease((pre: any) => {
                                return {
                                    ...pre,
                                    auto_amount: e.target.checked ? YesNoEnum.Yes : YesNoEnum.No
                                }
                            })
                        }}
                    />
                </Grid>
            )}
        </Grid>
    )
}