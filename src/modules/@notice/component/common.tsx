import { Chip } from "@mui/material";
import { SmsStateEnum } from "../constant/enum";

export const NoticeState = ({ state }: { state?: SmsStateEnum }) => {
    let color = "warning";
    if (state === SmsStateEnum.Pending) {
        color = "warning";
    } else if (state === SmsStateEnum.Inprogress) {
        color = "info";
    } else if (state === SmsStateEnum.EmptyAddress) {
        color = "secondary";
    } else if (state === SmsStateEnum.Failed) {
        color = "violet";
    } else if (state === SmsStateEnum.Success) {
        color = "success";
    } else if (state === SmsStateEnum.Canceled) {
        color = "error";
    }
    return <Chip size="small" color={color as any} label={state} />;
};
