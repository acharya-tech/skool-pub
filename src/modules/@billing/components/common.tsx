import { Chip } from "@mui/material";
import { BillEntranceStateEnum } from "../constant";

export const EntranceApplicationState = ({ state }: { state?: BillEntranceStateEnum }) => {
    let color = "secondary";
    if (state === BillEntranceStateEnum.Pending) {
        color = "info";
    } else if (state === BillEntranceStateEnum.Withdraw) {
        color = "warning";
    } else if (state === BillEntranceStateEnum.Accepted) {
        color = "success";
    } else if (state === BillEntranceStateEnum.Rejected) {
        color = "error";
    } else if (state === BillEntranceStateEnum.Admitted) {
        color = "success";
    } else if (state === BillEntranceStateEnum.Canceled) {
        color = "error";
    } else if (state === BillEntranceStateEnum.Completed) {
        color = "primary";
    }
    return <Chip size="small" color={color as any} label={state} />;
};