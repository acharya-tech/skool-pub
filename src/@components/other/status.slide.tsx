import { useEffect } from "react"
import { StatusEnum, YesNoEnum } from "@common/all.enum"
import { useUpdater } from "@hooks/status.hooks"
import { ISwitcher } from "../../interfaces"
import { GoUnread, GoRead } from "react-icons/go";
import { Button, Switch } from "@mui/material";

export const StatusSlide = ({ resource, record }: ISwitcher) => {
    const [newRecord, slide, isLoading] = useUpdater({
        resource, record
    })
    useEffect(() => {
        record = newRecord
    }, [newRecord])
    return (
        <Switch size="small"
            onClick={() => slide({
                status: record?.status == StatusEnum.Active ? StatusEnum.Inactive : StatusEnum.Active,
            })}
            disabled={isLoading}
            checked={record?.status == StatusEnum.Active} />
    )
}

export const ReadSwitch = ({ resource, record }: ISwitcher) => {
    const [newRecord, slide, isLoading] = useUpdater({
        resource, record
    })
    useEffect(() => {
        record = newRecord
    }, [newRecord])
    return (
        <Button size="small"
            onClick={() => slide(
                {
                    read: record.read == YesNoEnum.Yes ? YesNoEnum.No : YesNoEnum.Yes,
                }
            )}
            disabled={isLoading}
            sx={{ color: newRecord.read == YesNoEnum.No ? "green" : "grey" }}>
            {record.read == YesNoEnum.No ? <GoUnread /> : <GoRead />}
        </Button>
    )
}