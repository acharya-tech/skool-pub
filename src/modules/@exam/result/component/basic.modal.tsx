import { Dialog, DialogContent, DialogProps, DialogTitle, Divider } from "@mui/material";
import React from "react";


type Props = {
    open: boolean
    onClose: () => void;
    children: any
    title?: string
    footer?: React.ReactNode
    size?: DialogProps['maxWidth']
    isLoading?: boolean
    keepMounted?: boolean
};

export const PrintableModal = (props: Props) => {
    const { size, children, keepMounted, onClose } = props
    return <Dialog
        open={props.open}
        onClose={onClose}
        fullWidth
        maxWidth={size ?? "md"}
        keepMounted={keepMounted ?? false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {props.title}
        </DialogTitle>
        <Divider />
        <DialogContent>
            {children}
        </DialogContent>
    </Dialog>


}