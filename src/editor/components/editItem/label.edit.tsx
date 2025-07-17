import { Grid2 as Grid, MenuItem } from "@mui/material";
import { CSCheckbox, CSColor, CSInput, CSNumber, CSSelect } from "@components/input";

type LabelEditProps = {
  control: any;
  errors: any;
  category: string;
  t: any;
};
export function LabelEdit({ control, errors, category, t }: LabelEditProps) {

  return (
    <>
      {category === "element" && <Grid size={12}>
        <CSInput
          fullWidth
          label={t("fields.text")}
          control={control}
          errors={errors}
          name="text"
        />
      </Grid>}

      <Grid size={3}>
        <CSNumber
          fullWidth
          label={t("fields.fontSize")}
          control={control}
          errors={errors}
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
      <Grid size={3}>
        <CSSelect
          fullWidth
          label={t("fields.textAlign")}
          control={control}
          errors={errors}
          name="textAlign"
        >
          <MenuItem value={"left"}>Left</MenuItem>
          <MenuItem value={"center"}>Center</MenuItem>
          <MenuItem value={"right"}>Right</MenuItem>
        </CSSelect>
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
      <Grid size={1}>
        <CSCheckbox
          fullWidth
          label={t("fields.italic")}
          control={control}
          errors={errors}
          name="italic"
        />
      </Grid>
    </>
  );
};


export const LabelExtraEdit = ({ control, errors, t }: LabelEditProps) => {
  return (
    <>
      <Grid size={4}>
        <CSNumber
          fullWidth
          label={t("fields.scaleX")}
          control={control}
          errors={errors}
          name="scaleX"
        />
      </Grid>
      <Grid size={4}>
        <CSNumber
          fullWidth
          label={t("fields.scaleY")}
          control={control}
          errors={errors}
          name="scaleY"
        />
      </Grid>
    </>
  );
}