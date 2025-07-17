import { Chip } from "@mui/material";
import { BookCopyStatusEnum, FineStatusEnum } from "../constant";

export const BookCopyStatus = ({ status }: { status?: BookCopyStatusEnum }) => {
    let color = "warning";
    if (status === BookCopyStatusEnum.Missing) {
        color = "warning";
    } else if (status === BookCopyStatusEnum.Checkout) {
        color = "info";
    } else if (status === BookCopyStatusEnum.Discarded) {
        color = "violet";
    } else if (status === BookCopyStatusEnum.Available) {
        color = "success";
    } else if (status === BookCopyStatusEnum.Lost) {
        color = "error";
    }
    return <Chip size="small" color={color as any} label={status} />;
};

export const FineStatus = ({ status }: { status?: FineStatusEnum }) => {
    let color = "warning";
    if (status === FineStatusEnum.Pending) {
        color = "warning";
    } else if (status === FineStatusEnum.Discard) {
        color = "info";
    } else if (status === FineStatusEnum.Paid) {
        color = "success";
    }
    return <Chip size="small" color={color as any} label={status} />;
};