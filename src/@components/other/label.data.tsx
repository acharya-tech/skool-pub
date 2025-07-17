import { Box, Stack, Typography } from "@mui/material";
import { CsLabel } from "../label";
import { ReactNode } from "react";
import { NotSetLabel } from "@components/label/notset.label";

type LabelDataProps = {
    label: string
    value?: string | number | ReactNode
    isLoading?: boolean
    direction?: 'row' | 'column'
    gap?: number
}
export const LabelData = ({ label, value, isLoading = false, direction = 'row', gap = 1 }: LabelDataProps) => {
    return <Stack direction={direction} gap={gap} justifyContent={'space-between'}>
        <CsLabel text={label} />
        <TextLabel text={value} isLoading={isLoading} />
    </Stack>
};

const TextLabel = ({ text, TypoProps }: any) => {
    if (text === undefined || text === '' || text === null) {
        return <NotSetLabel />;
    }
    if (typeof text === "string") {
        return <Typography variant='body2' color="textSecondary" {...TypoProps} >{text}</Typography>;
    }
    return <Stack direction={'row'} gap={1}>{text}</Stack>
};