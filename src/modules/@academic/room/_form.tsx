import {
  HttpError,
} from "@refinedev/core";
import { IClass, IRoom, ISection } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Checkbox, Divider, Grid2 as Grid, Stack, Switch, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { CSAutoComplete, CSInput, CSNumber } from "@components/input";
import { LANG_ACADEMIC, LANG_COMMON } from "@common/constant";
import { ACADEMIC_CLASS_LIST, ACADEMIC_SECTION_LIST } from "../constant/urls";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { FormControlLabel } from "@mui/material";
import { useAutocomplete } from "@refinedev/mui";
import { useRefineForm } from "@hooks/useForm";


const RoomSize = ({ length, breath, control }: { length: number, breath: number, control: any }) => {
  return <Table sx={{}}>
    <TableHead>
      <TableCell padding={"none"}>R/C</TableCell>
      {Array.from({ length }).map((e, i) => {
        return <TableCell>{i + 1}</TableCell>
      })}
    </TableHead>
    <TableBody>
      {Array.from({ length: breath }).map((e, i) => {
        return <TableRow>
          <TableCell padding={"none"}>{i + 1}</TableCell>
          {
            Array.from({ length }).map((e, j) => {
              return <TableCell padding={"none"}>
                <Controller
                  control={control}
                  name={`size[${i}][${j}]`}
                  render={({ field }) => {
                    return <Checkbox {...field} />
                  }}
                />
              </TableCell>
            })
          }
        </TableRow>
      })}
    </TableBody>
  </Table >
}

export const RoomForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_ACADEMIC, "room");
  const [showGrid, setShowGrid] = useState(false);


  const { autocompleteProps: sectionAutoProps } = useAutocomplete<ISection>({
    resource: ACADEMIC_SECTION_LIST,
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value
        }
      ]
    }
  });

  const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
    resource: ACADEMIC_CLASS_LIST,
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value
        }
      ]
    }
  });

  const {
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IRoom, HttpError, Nullable<IRoom>>({
    refineCoreProps: {
      meta: { customQuery: { class: true, section: true } },
      redirect: false,
      id: props.id,
      onMutationSuccess: props.onClose,
    }
  });


  const rowVal = watch("row");
  const columnVal = watch("column");

  const title = props.action === "edit" ? t("actions.edit") : t("actions.add");
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Divider sx={{ my: 2 }} />
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data);
        })}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <CSInput
              fullWidth
              defaultValue=""
              name="name"
              label={t("fields.name")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: any) => r.name}
              autocompleteProps={classAutoProps}
              name="class"
              label={t("fields.class")}
              placeholder={t("fields.class")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: any) => r.name}
              autocompleteProps={sectionAutoProps}
              name="section"
              label={t("fields.section")}
              placeholder={t("fields.section")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6} mt={2}>
            <CSNumber
              fullWidth
              name="row"
              label={t("fields.row")}
              required
              onChange={(e: any) => {
                setValue("row", parseInt(e.target.value))
              }}
              min={1}
              control={control}
              errors={errors}
              type="number"
            />
          </Grid>
          <Grid size={6} mt={2}>
            <CSNumber
              fullWidth
              name="column"
              label={t("fields.column")}
              required
              onChange={(e: any) => {
                setValue("column", parseInt(e.target.value))
              }}
              min={1}
              control={control}
              errors={errors}
              type="number"
            />
          </Grid>
          {/* <Grid size={12} mt={2}>
            <FormControlLabel control={<Switch checked={showGrid} onClick={() => setShowGrid(p => !p)} />} label={(showGrid ? "Hide" : "Show") + " Grid"} />
            {showGrid && (
              <RoomSize control={control} length={rowVal ?? 0} breath={columnVal ?? 0} />
            )}
          </Grid> */}
          <Grid size={12} mt={2}>
            <Divider />
            <Stack
              direction={"row"}
              gap={5}
              mt={2}
              justifyContent="flex-end"
            >
              <Button onClick={props.onClose}>{t("@buttons.cancel", { ns: LANG_COMMON })}</Button>
              <Button {...saveButtonProps} variant="contained">
                {t("@buttons.save", { ns: LANG_COMMON })}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box >
  );
};
