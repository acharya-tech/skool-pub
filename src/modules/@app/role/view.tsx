import { APP_ROLE_URL } from "@app/constant";
import { IRoles } from "@app/interface";
import { LANG_APP } from "@common/constant";
import { ActiveStatusChip } from "@components/label/status.label";
import { LabelData } from "@components/other/label.data";
import { useRefineShow } from "@hooks/useShow";
import { useTranslate } from "@hooks/useTranslate";
import { Box, Card, Divider, Grid2 as Grid } from "@mui/material";
import TreeTable from "./components/access.assign";
import { SYSTEM_ADMIN_ROLE_ID } from "@common/options";



export function RoleView() {
  const t = useTranslate(LANG_APP, "roles");
  const { query: roleData } = useRefineShow<IRoles>({
    resource: APP_ROLE_URL,
    meta: {
      costomQuery: {
        users: true
      }
    }
  });
  const roles = roleData?.data?.data;
  return (
    <Box>
      <Card sx={{ p: 3 }}>
        <Grid container>
          <Grid size={4}>
            <LabelData label={t("fields.name")} value={roles?.name} />
          </Grid>
          <Grid size={6}>
            <LabelData label={t("fields.users")} value={roles?.users?.map((u) => u.name).join(", ")} />
          </Grid>
          <Grid size={2}>
            <LabelData label={t("fields.status")} value={<ActiveStatusChip status={roles?.status} />} />
          </Grid>
          <Grid size={12}>
            <LabelData label={t("fields.description")} value={roles?.description} />
          </Grid>
        </Grid>
      </Card>
      {SYSTEM_ADMIN_ROLE_ID != roles?.id && (
        <>
          <Divider sx={{ my: 3 }} />
          <Card>
            <TreeTable role={roles} />
          </Card>
        </>
      )}

    </Box>
  );
}
