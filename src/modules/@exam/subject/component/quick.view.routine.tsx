import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_EXAM } from "@common/constant";
import { IExmSubject } from "../../interface";
import { TimeLabel } from "@components/label/date.label";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { getQueryParam } from "@utils/other";
import { EXAM_ROUTINE_SUBJECT_VIEW } from "../../constant/local.urls";

type QuickViewRoutineProps = {
  esubjects: IExmSubject[]
}
export const QuickViewRoutine = ({ esubjects }: QuickViewRoutineProps) => {
  const t = useTranslate(LANG_EXAM, "esubjects");
  return (
    <TableContainer>
      <Table style={{ minWidth: "650" }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell width={80}>{t("fields.subject_code")}</TableCell>
            <TableCell align="left">{t("fields.subject")}</TableCell>
            <TableCell align="right">{t("fields.subject_credit")}</TableCell>
            <TableCell align="right">{t("fields.fm")}</TableCell>
            <TableCell align="right">{t("fields.pm")}</TableCell>
            <TableCell>{t("fields.start_time")}</TableCell>
            <TableCell>{t("fields.duration")}</TableCell>
            <TableCell>{t("fields.status")}</TableCell>
            <TableCell>{t("@table.actions")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {esubjects.map((row, index) => (
            <TableRow key={row.subject_code}>
              <TableCell component="th" scope="row">
                {row.subject_code}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.subject_name}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {Number(row.th_credit ?? 0) + Number(row.in_credit ?? 0)}
              </TableCell>
              <TableCell align="right">{parseFloat(((row.th_fm || 0) + (row.in_fm || 0)).toString())}</TableCell>
              <TableCell align="right">{parseFloat(((row.th_pm || 0) + (row.in_pm || 0)).toString())}</TableCell>
              <TableCell><TimeLabel date={(new Date(row.start_date!).toISOString())} /></TableCell>
              <TableCell><TimeLabel date={(new Date(row.duration!).toISOString())} format="HH:mm" /></TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <Link to={'/' + getQueryParam(EXAM_ROUTINE_SUBJECT_VIEW, { id: row.routine_id, subjectid: row.id })}>
                  <IconButton
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
