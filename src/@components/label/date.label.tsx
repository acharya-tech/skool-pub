import { Skeleton, Typography } from "@mui/material"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration";
import { NotSetLabel } from "./notset.label";

dayjs.extend(duration);

type DateLabelProps = {
  date?: string
  isLoading?: boolean
  type?: 'en' | 'np'
  format?: string
  color?: string
  prefix?: any
}
export const DateLabel = ({ date, isLoading = false, prefix, type = 'en', color = "textSecondary" }: DateLabelProps) => {
  if (isLoading) {
    <Skeleton />
  }
  if (!date) {
    return <NotSetLabel />;
  }
  return <Typography variant='body2' color={color}>{prefix}{dayjs(date).format("YYYY-MM-DD")}</Typography>
}

export const DateTimeLabel = ({ date, isLoading = false, type = 'en', color = "textSecondary" }: DateLabelProps) => {
  if (isLoading) {
    <Skeleton />
  }
  if (!date) {
    return <NotSetLabel />;
  }
  return <Typography variant='body2' color={color}>{dayjs(date).format("YYYY-MM-DD hh:mm a")}</Typography>
}

export const TimeLabel = ({ date, isLoading = false, format = 'hh:mm a', type = 'en', color = "textSecondary" }: DateLabelProps) => {
  if (isLoading) {
    <Skeleton />
  }
  if (!date) {
    return <NotSetLabel />;
  }
  return <Typography variant='body2' color={color}>{dayjs(date).format(format)}</Typography>
}

