import { Chip } from "@mui/material";
import { InventoryBillUserTypeEnum } from "../constant";

export const BillUser = ({ type }: { type?: InventoryBillUserTypeEnum }) => {
    let color = "secondary";
    if (type === InventoryBillUserTypeEnum.Other) {
        color = "info";
    } else if (type === InventoryBillUserTypeEnum.Staff) {
        color = "secondary";
    } else if (type === InventoryBillUserTypeEnum.Student) {
        color = "success";
    } else if (type === InventoryBillUserTypeEnum.Scholar) {
        color = "primary";
    }
    return <Chip size="small" color={color as any} label={type} />;
};