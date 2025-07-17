import { useTranslate } from "@hooks/useTranslate";

import { LANG_ACCOUNT } from "@common/constant";
import { Box, Button, Card, CardActions, CardContent, Grid2 as Grid } from "@mui/material";
import { IAccountPayrollReleaseForm } from "../interface";
import { useState } from "react";
import { PayrollPrePostListTable } from "./postList";
import { LabelData } from "@components/other/label.data";
import { DateLabel } from "@components/label/date.label";
import { PayrollReleaseForm } from "../components/common";
import { YesNoEnum } from "@common/all.enum";

export const PayrollRelease = () => {
  const t = useTranslate(LANG_ACCOUNT, "payrollRelease");
  const [openList, setOpenList] = useState(false);
  const [payrollRelease, setPayrollRelease] = useState<Partial<IAccountPayrollReleaseForm>>({
    date: (new Date()).toISOString(),
    auto_amount: YesNoEnum.No
  });

  return (
    <Box>
      <Card>
        <CardContent>
          {!openList && (
            <PayrollReleaseForm enableAuto={true} payrollRelease={payrollRelease} setPayrollRelease={setPayrollRelease} t={t} />
          )}
          {openList && (
            <Grid container spacing={2}>
              <Grid size={2}>
                <LabelData label={t("fields.type")} value={payrollRelease.type} />
              </Grid>
              <Grid size={2}>
                <LabelData label={t("fields.month")} value={payrollRelease.month} />
              </Grid>
              <Grid size={2}>
                <LabelData label={t("fields.date")} value={<DateLabel date={payrollRelease.date} />} />
              </Grid>
              <Grid size={2}>
                <LabelData label={t("fields.ledger")} value={payrollRelease.ledger?.name} />
              </Grid>
              <Grid size={2}>
                <LabelData label={t("fields.amount")} value={payrollRelease.auto_amount === YesNoEnum.Yes ? "Auto" : payrollRelease.amount} />
              </Grid>
            </Grid>
          )}
        </CardContent>
        <CardActions sx={{ pl: 3, display: "flex", justifyContent: "center" }} >
          {!openList && (
            <Button onClick={() => { setOpenList(true) }} disabled={!(payrollRelease.ledger && (payrollRelease.amount || payrollRelease.auto_amount === YesNoEnum.Yes) && payrollRelease.type && payrollRelease.month && payrollRelease.date)} variant="contained">
              {t("actions.getRelease")}
            </Button>
          )}
          {openList && (
            <Button onClick={() => { setOpenList(false) }} color="secondary" variant="contained">
              {t("actions.updateRelease")}
            </Button>
          )}
        </CardActions>
      </Card>
      {openList && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={12}>
                <PayrollPrePostListTable releaseForm={payrollRelease} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  )
};
