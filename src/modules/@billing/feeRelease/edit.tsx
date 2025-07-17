import { useTranslate } from "@hooks/useTranslate";
import { Box, Card, CardActions, CardContent, CardHeader, MenuItem, Stack } from "@mui/material";
import { LANG_BILLING } from "@common/constant";
import { IClass } from "@academic/interface";
import { ACADEMIC_CLASS_URL } from "@academic/constant/server.url";
import { useEffect, useState } from "react";
import { ReleaseFeeList } from "./components/fee.list";
import { FeeReleaseTypeList } from "../interface";
import { UCSAutoComplete, UCSDatePicker, UCSSelect } from "@components/input/uc.input";
import { NepaliMonthEnum } from "@common/all.enum";
import LoadingButton from "@mui/lab/LoadingButton";
import { ReleaseTab } from "./components/release.tab";
import { useAutocomplete } from "@refinedev/mui";
export const FeeReleaseEditForm = () => {
  const t = useTranslate(LANG_BILLING, "feeRelease");

  const [releaseMonth, setReleaseMonth] = useState<NepaliMonthEnum>(NepaliMonthEnum.Baishak)
  const [releaseDate, setReleaseDate] = useState<string>(new Date().toISOString())
  const [feeRelease, setFeeRelease] = useState<FeeReleaseTypeList>({})
  const [getFee, setGetFee] = useState<boolean>(false)
  const [classData, setClassData] = useState<IClass | null>(null)

  const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
    resource: ACADEMIC_CLASS_URL,
    meta: { customQuery: { program: true, } },
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value,
        },
      ];
    },
  });

  useEffect(() => {
    setGetFee(false)
  }, [classData])

  return (
    <Box>
      <Card>
        <CardHeader
          title={t("labels.selectClass")}
          sx={{ py: 3 }}
          action={
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <UCSAutoComplete
                onChange={(e: any) => {
                  setClassData(e)
                }}
                value={classData}
                fullWidth
                width={200}
                getOptionLabel={(r: any) => r.name}
                autocompleteProps={classAutoProps}
                label={t("fields.class")}
              />
              <UCSDatePicker
                value={releaseDate}
                label={t("fields.release_date")}
                onChange={setReleaseDate}
              />
              <UCSSelect
                onChange={(e: any) => {
                  setReleaseMonth(e.target.value)
                }}
                value={releaseMonth}
                defaultValue={NepaliMonthEnum.Baishak}
                label={t("fields.release_month")}
              >
                {Object.values(NepaliMonthEnum).map((e: NepaliMonthEnum) => {
                  return <MenuItem key={e} value={e}>{e}</MenuItem>
                })}
              </UCSSelect>
            </Stack>
          }
        />
        {classData && (
          <>
            {!getFee && (
              <CardContent>
                <ReleaseFeeList aclass={classData} feeRelease={feeRelease} setFeeRelease={setFeeRelease} />
              </CardContent>
            )}
            <CardActions >
              <LoadingButton
                disabled={!releaseDate || !releaseMonth || Object.keys(feeRelease).length === 0}
                variant="contained"
                fullWidth
                color={getFee ? "success" : "primary"}
                size="small"
                onClick={() => {
                  setGetFee(!getFee)
                }}
              >
                {getFee ? t("actions.editFee") : t("actions.getReleaseData")}
              </LoadingButton>
            </CardActions>
          </>
        )}
      </Card>
      {classData && getFee && (
        <Card sx={{ mt: 2 }}>
          <ReleaseTab month={releaseMonth!} releaseTypes={feeRelease} postDate={releaseDate} />
        </Card>
      )}
    </Box>
  );
};
