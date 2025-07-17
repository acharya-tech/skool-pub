import { Chip } from "@mui/material";
import { ExmFinalStatusEnum, ExmMarkPostStatusEnum, ExmRoutinePostStatusEnum } from "../constant/enum";

export const SubjectMarkStatus = ({ status }: { status?: ExmMarkPostStatusEnum }) => {
    let color = "warning";
    if (status === ExmMarkPostStatusEnum.Completed) {
        color = "success";
    } else if (status === ExmMarkPostStatusEnum.Pending) {
        color = "warning";
    } else if (status === ExmMarkPostStatusEnum.Inprogress) {
        color = "info";
    } else if (status === ExmMarkPostStatusEnum.Canceled) {
        color = "error";
    }
    return <Chip size="small" color={color as any} label={status} />;
};

export const RoutineStatus = ({ status }: { status?: ExmRoutinePostStatusEnum }) => {
    let color = "warning";
    if (status === ExmRoutinePostStatusEnum.Pending) {
        color = "warning";
    } else if (status === ExmRoutinePostStatusEnum.Inprogress) {
        color = "info";
    } else if (status === ExmRoutinePostStatusEnum.Ready) {
        color = "secondary";
    } else if (status === ExmRoutinePostStatusEnum.Preparing) {
        color = "violet";
    } else if (status === ExmRoutinePostStatusEnum.Completed) {
        color = "success";
    } else if (status === ExmRoutinePostStatusEnum.Published) {
        color = "primary";
    } else if (status === ExmRoutinePostStatusEnum.Canceled) {
        color = "error";
    }
    return <Chip size="small" color={color as any} label={status} />;
};

export const FinalStatus = ({ status }: { status?: ExmFinalStatusEnum }) => {
    let color = "secondary";
    if (status === ExmFinalStatusEnum.Inprogress) {
        color = "info";
    } else if (status === ExmFinalStatusEnum.Ready) {
        color = "secondary";
    } else if (status === ExmFinalStatusEnum.Completed) {
        color = "success";
    } else if (status === ExmFinalStatusEnum.Canceled) {
        color = "error";
    }
    return <Chip size="small" color={color as any} label={status} />;
};