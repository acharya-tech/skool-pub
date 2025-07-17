
import { Alert, Box, Button, Card, Divider, Grid2 as Grid, Paper, Typography } from "@mui/material";
import { IBatch, IClass, ISection } from "@academic/interface";
import { ACADEMIC_BATCH_LIST, ACADEMIC_CLASS_LIST, ACADEMIC_SECTION_LIST } from "@academic/constant/urls";
import { LANG_STUDENT } from "@common/constant";
import { useTranslate } from "@hooks/useTranslate";
import { CSAutoComplete } from "@components/input";
import { useState } from "react";
import { useAutocomplete } from "@refinedev/mui";
import { useParams } from "react-router-dom";
import { BiTransfer } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useCreate, useList } from "@refinedev/core";
import { STUDENT_CURRENT_URL, STUDENT_TRANSFER_URL } from "../constant";
import TransferList from "../components/transfer";
import { ITransferForm } from "../interface/types";
import { useConfirm } from "@hooks/confirm.hook";
import { IStudentInfo } from "../interface";

export const TransferForm = () => {
  const t = useTranslate(LANG_STUDENT, "transfer");
  const { id } = useParams()
  const [transferValues, setTransfer] = useState<ITransferForm>({ students: [] })
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { autocompleteProps: batchAutoProps } = useAutocomplete<IBatch>({
    resource: ACADEMIC_BATCH_LIST,
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
    meta: { customQuery: { program: true, program_id: id } },
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

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data, refetch } = useList<IStudentInfo>({
    pagination: {
      pageSize: 1000,
    },
    meta: {
      customQuery: {
        select: JSON.stringify({
          cls: true,
          simg: true,
          sec: true,
        }),
        filter: JSON.stringify({
          class_id: transferValues?.fromClass?.id,
          section_id: transferValues?.fromSection?.id,
          batch_id: transferValues?.fromBatch?.id
        })
      }
    },
    resource: STUDENT_CURRENT_URL,
  });

  const { isLoading, mutate } = useCreate({
    resource: STUDENT_TRANSFER_URL,
  })

  const [setOpen, ConfirmEle] = useConfirm({
    onConfirm: (data) => {
      mutate({ values: transferValues }, {
        onSuccess: () => {
          refetch()
        }
      })
    },
  })

  const fromClass = watch("fromClass");
  const fromBatch = watch("fromBatch");
  const toBatch = watch("toBatch");

  return (
    <>
      <Alert severity="info">
        <Typography>{t('@labels.note')}{" : "}{t('alert.notice')}</Typography>
      </Alert>
      {!isCollapsed ? (
        <>
          <form
            onSubmit={handleSubmit((data: any) => {
              setIsCollapsed(true);
            })}
          >
            <Card sx={{ pb: 4 }}>
              <Grid container spacing={2}>
                <Grid size={5}>
                  <Paper
                    sx={{ p: 2, m: 2 }}
                    elevation={2}>
                    <Typography variant="subtitle2" >{t('labels.transferFrom')}</Typography>
                    <Grid container spacing={2} >
                      <Grid size={12}>
                        <CSAutoComplete
                          fullWidth
                          required
                          getOptionLabel={(r: any) => r.name}
                          autocompleteProps={batchAutoProps}
                          onChange={(val: any, field: any) => {
                            field.onChange(val)
                            setTransfer({ ...transferValues, fromBatch: val })
                          }}
                          name="fromBatch"
                          label={t("fields.batch")}
                          control={control}
                          errors={errors}
                        />
                      </Grid>
                      <Grid size={6}>
                        <CSAutoComplete
                          fullWidth
                          required
                          groupBy={(option: IClass) => option.program.name}
                          getOptionLabel={(r: any) => r.name}
                          autocompleteProps={classAutoProps}
                          onChange={(val: any, field: any) => {
                            field.onChange(val)
                            setTransfer({ ...transferValues, fromClass: val })
                          }}
                          name="fromClass"
                          label={t("fields.class")}
                          control={control}
                          errors={errors}
                        />
                      </Grid>
                      <Grid size={6}>
                        <CSAutoComplete
                          fullWidth
                          getOptionLabel={(r: any) => r.name}
                          autocompleteProps={sectionAutoProps}
                          name="fromSection"
                          onChange={(val: any, field: any) => {
                            field.onChange(val)
                            setTransfer({ ...transferValues, fromSection: val })
                          }}
                          label={t("fields.section")}
                          control={control}
                          errors={errors}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid size={2}
                  sx={{
                    alignContent: "center",
                    textAlign: 'center'
                  }}>
                  <Button variant="contained" size="large" aria-label={t('labels.switchTransfer')}><BiTransfer /></Button>
                </Grid>
                <Grid size={5}>
                  <Paper
                    sx={{ p: 2, m: 2 }}
                    elevation={2}>
                    <Typography variant="subtitle2" >{t('labels.transferTo')}</Typography>
                    <Grid container spacing={2} >
                      <Grid size={12}>
                        <CSAutoComplete
                          fullWidth
                          required
                          getOptionLabel={(r: any) => r.name}
                          autocompleteProps={batchAutoProps}
                          name="toBatch"
                          onChange={(val: any, field: any) => {
                            field.onChange(val)
                            setTransfer({ ...transferValues, toBatch: val })
                          }}
                          label={t("fields.batch")}
                          control={control}
                          errors={errors}
                        />
                      </Grid>
                      <Grid size={6}>
                        <CSAutoComplete
                          fullWidth
                          required
                          groupBy={(option: IClass) => option.program.name}
                          getOptionLabel={(r: any) => r.name}
                          autocompleteProps={classAutoProps}
                          name="toClass"
                          onChange={(val: any, field: any) => {
                            field.onChange(val)
                            setTransfer({ ...transferValues, toClass: val })
                          }}
                          rules={{
                            validate: (value: IClass, field: any) => {
                              return (toBatch.id === fromBatch.id && value.id === fromClass.id) ? t('validation.toClass') : undefined
                            }
                          }}
                          label={t("fields.class")}
                          control={control}
                          errors={errors}
                        />
                      </Grid>
                      <Grid size={6}>
                        <CSAutoComplete
                          fullWidth
                          getOptionLabel={(r: any) => r.name}
                          autocompleteProps={sectionAutoProps}
                          name="toSection"
                          defaultValue={transferValues?.toSection}
                          onChange={(val: any, field: any) => {
                            field.onChange(val)
                            setTransfer({ ...transferValues, toSection: val })
                          }}
                          label={t("fields.section")}
                          control={control}
                          errors={errors}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid size={12}
                  sx={{
                    alignContent: "center",
                    textAlign: 'center'
                  }}>
                  <Button color="secondary" type="submit" variant="contained">{t("actions.check")}</Button>
                </Grid>
              </Grid>
            </Card>
          </form>
        </>
      ) : (
        <>
          <Card >
            <Box sx={{ display: "flex", alignItems: 'center', justifyContent: "space-evenly", p: 2 }}>
              <Typography variant="subtitle2">
                {transferValues?.fromBatch?.name} / {transferValues?.fromClass?.name}{transferValues?.fromSection?.name ? ' / ' + transferValues?.fromSection?.name : ''}
              </Typography>
              <Button color="secondary" variant="contained" onClick={() => setIsCollapsed(false)}>
                {t("actions.check")}
              </Button>
              <Typography variant="subtitle2">
                {transferValues?.toBatch?.name} / {transferValues?.toClass?.name}{transferValues?.toSection?.name ? ' / ' + transferValues?.toSection?.name : ''}
              </Typography>
            </Box>
          </Card>
          <Divider sx={{ my: 2 }} />
          <TransferList
            disabled={isLoading}
            studentList={data?.data}
            transferValue={transferValues} onSave={(students: string[]) => {
              setTransfer(p => ({ ...p, students }))
              setOpen()
            }} />
        </>
      )}
      {ConfirmEle}
    </>
  );

};

