import { Grid2 as Grid, MenuItem } from "@mui/material";
import { CSCheckbox, CSColor, CSInput, CSNumber, CSSelect } from "@components/input";

type SubjectTableEditProps = {
  control: any;
  errors: any;
  t: any;
};
export function SubjectTableEdit({ control, errors, t }: SubjectTableEditProps) {

  return (
    <>
      <Grid size={3}>
        <CSNumber
          fullWidth
          label={t("fields.tableRows")}
          control={control}
          errors={errors}
          min={5}
          max={100}
          name="rows"
        />
      </Grid>
      <Grid size={3}>
        <CSNumber
          fullWidth
          label={t("fields.cellPadding")}
          control={control}
          errors={errors}
          min={0}
          max={50}
          name="cellPadding"
        />
      </Grid>
      <Grid size={3}>
        <CSNumber
          fullWidth
          label={t("fields.rowHeight")}
          control={control}
          errors={errors}
          min={0}
          max={50}
          name="rowHeight"
        />
      </Grid>
      <Grid size={3}>
        <CSNumber
          fullWidth
          label={t("fields.colHeight")}
          control={control}
          errors={errors}
          min={0}
          max={50}
          name="colHeight"
        />
      </Grid>
      <Grid size={3}>
        <CSNumber
          fullWidth
          label={t("fields.fontSize")}
          control={control}
          errors={errors}
          min={0}
          max={50}
          name="fontSize"
        />
      </Grid>
      <Grid size={3}>
        <CSColor
          fullWidth
          label={t("fields.color")}
          control={control}
          errors={errors}
          name="color"
        />
      </Grid>
      <Grid size={1}>
        <CSCheckbox
          fullWidth
          label={t("fields.bold")}
          control={control}
          errors={errors}
          name="bold"
        />
      </Grid>
    </>
  );
};