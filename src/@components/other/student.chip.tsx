import { Chip } from "@mui/material";
import { StudentLogStateEnum } from "@student/constant";

type StudentStateProps = {
    state: StudentLogStateEnum
}
export const StudentStateChip = ({ state }: StudentStateProps) => {
    let color: any = 'success';
    if (state == StudentLogStateEnum.Alumni) {
        color = 'warning'
    } else if (state == StudentLogStateEnum.Dropout) {
        color = 'error'
    } else if (state == StudentLogStateEnum.Escalation) {
        color = 'secondary'
    } else if (state == StudentLogStateEnum.Repeated) {
        color = 'info'
    } else if (state == StudentLogStateEnum.Current) {
        color = 'success'
    } else if (state == StudentLogStateEnum.Rejoined) {
        color = 'primary'
    }
    return <Chip color={color} size='small' label={state} />
}