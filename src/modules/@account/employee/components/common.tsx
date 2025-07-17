import { Chip } from "@mui/material";
import { AccounPayrollTypeEnum } from "../../constant/enum";

export const PayrollTypeChip = ({ state }: { state?: AccounPayrollTypeEnum }) => {
    let color = "secondary";
    if (state === AccounPayrollTypeEnum.Plus) {
        color = "info";
    } else if (state === AccounPayrollTypeEnum.Minus) {
        color = "warning";
    }
    return <Chip size="small" color={color as any} label={state} />;
};