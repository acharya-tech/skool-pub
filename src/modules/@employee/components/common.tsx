import { Chip } from "@mui/material";
import { StatusEnum } from "@common/all.enum";

export const Status = ({ status }: { status?: StatusEnum }) => {
    let color = "warning";
    if (status === StatusEnum.Active) {
        color = "success";
    } else if (status === StatusEnum.Inactive) {
        color = "error";
    } 
    return <Chip size="small" color={color as any} label={status} />;
};