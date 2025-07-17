import { useTranslate } from "@hooks/useTranslate";
import { LANG_BILLING } from "@common/constant";
import { Box, Button, Grid2 as Grid, Paper, Stack, Typography } from "@mui/material";
import { UCSAutoComplete } from "@components/input/uc.input";
import { STUDENT_INFO_URL } from "@student/constant";
import { useAutocomplete } from "@refinedev/mui";
import { IStudentInfo } from "@student/interface";
import { useState } from "react";
import { FeeLedger } from "./components/fee.ledger";
import StudentDetails from "./components/student.detail";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoMdCheckboxOutline } from "react-icons/io";
import { CiDiscount1 } from "react-icons/ci";
import { BasicModal } from "@components/modal/basic.modal";
import { FeeReleaseStudent } from "../feeRelease/create";
import { useInvalidate, useOne } from "@refinedev/core";
import { BILLING_FEE_RELEASE_META_URL } from "../constant";
import { ScholarReleaseStudent } from "./scholar.release";
import { FeeReceive } from "./components/fee.receive";
import { IAccountYear } from "@account/interface";
import { ACCOUNT_YEAR_URL } from "@account/constant/server.urls";
import { ACCOUNT_CURRENT_YEAR_ID } from "@account/constant/constant";
import { IBillInvoice } from "../interface";
import { IconButton } from "@mui/material";
import { CloseOutlined, RefreshOutlined } from "@mui/icons-material";
import { InvoiceView } from "./components/invoice.view";
export const FeeReceiveView = () => {
  const t = useTranslate(LANG_BILLING, "feeReceive");
  const [openRelease, setOpenRelease] = useState(false);
  const [openScholar, setOpenScholar] = useState(false);
  const [openReceive, setOpenReceive] = useState(false);
  const [studentData, setStudentData] = useState<IStudentInfo | null>(null);
  const { autocompleteProps: classAutoProps } = useAutocomplete<IStudentInfo>({
    resource: STUDENT_INFO_URL,
    meta: { customQuery: { program: true, class: true, section: true } },
    onSearch: (value: string) => {
      return [
        {
          field: "full_name",
          operator: "eq",
          value,
        },
        {
          field: "regid",
          operator: "eq",
          value,
        },
      ];
    },
  });
  const { data } = useOne<IAccountYear>({
    resource: ACCOUNT_YEAR_URL,
    id: ACCOUNT_CURRENT_YEAR_ID
  })
  const [invoiceData, setInvoiceData] = useState<IBillInvoice | string>("initial")
  const currentYear = data?.data
  const invalidate = useInvalidate()
  return (
    <Box>
      <Paper>
        <Box px={5} py={3}>
          <UCSAutoComplete
            onChange={(e: any) => {
              setStudentData(e)
            }}
            getOptionLabel={(r: IStudentInfo) => `${r.regid} | ${r.full_name} | ${r.class?.name} | ${r.section?.name}`}
            renderLabel={(r: IStudentInfo) => `${r.regid} | ${r.full_name} | ${r.class?.name} | ${r.section?.name}`}
            value={studentData}
            fullWidth
            autocompleteProps={classAutoProps}
            label={t("labels.student")}
          />
        </Box>
      </Paper>
      <Box mt={3}>
        {studentData && (
          <Grid container spacing={2}>
            <Grid size={9}>
              <Box justifyItems={"end"}>
                <Stack direction={"row"} gap={2}>
                  <Button
                    onClick={() => setOpenScholar(true)}
                    size="small"
                    startIcon={<CiDiscount1 />}
                    variant="outlined"
                    color="info">
                    {t("actions.scholar")}
                  </Button>
                  <Button
                    onClick={() => setOpenRelease(true)}
                    size="small"
                    startIcon={<IoMdCheckboxOutline />}
                    variant="outlined"
                    color="success">
                    {t("actions.release")}
                  </Button>
                  <Button
                    onClick={() => setOpenReceive(true)}
                    size="small"
                    startIcon={<LiaFileInvoiceDollarSolid />}
                    variant="outlined"
                    color="primary">
                    {t("actions.receive")}
                  </Button>
                </Stack>
              </Box>
              <FeeLedger student_id={studentData?.id} />
            </Grid>
            <Grid size={3}>
              <StudentDetails student_id={studentData?.id} />
            </Grid>
          </Grid>
        )}
      </Box>
      <BasicModal
        onClose={() => setOpenRelease(false)}
        open={openRelease}
      >
        <FeeReleaseStudent
          onClose={() => {
            invalidate({
              resource: BILLING_FEE_RELEASE_META_URL,
              invalidates: ['list'],
            })
            setOpenRelease(false)
          }}
          student={studentData!}
          action="create"
        />
      </BasicModal>
      <BasicModal
        onClose={() => setOpenScholar(false)}
        open={openScholar}
      >
        <ScholarReleaseStudent
          onClose={() => {
            invalidate({
              resource: BILLING_FEE_RELEASE_META_URL,
              invalidates: ['list'],
            })
            setOpenScholar(false)
          }}
          student={studentData!}
          action="create"
        />
      </BasicModal>
      <BasicModal
        onClose={() => setOpenReceive(false)}
        open={openReceive}
        size={"xl"}
        sx={{

          "& .MuiDialog-paper": {
            width: "100%",
            height: "100%",
            margin: 0,
            maxHeight: "100vh",
            maxWidth: "100vw",
            borderRadius: 0,
            backgroundColor: "#eee",
          },
          "& .MuiDialogContent-root": {
            p: 0
          },
          "& .MuiDialog-container": {
            alignItems: "flex-start",
          }
        }}
      >
        <Box>
          <Stack sx={{ backgroundColor: "#fff", p: 1 }} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="h6" color={"blue"}>{t("feeReceive")}</Typography>
            <Stack direction={"row"}>
              <IconButton size="small" onClick={() => {
                setInvoiceData(`_${Math.floor(Math.random() * 1000)}_`)
              }}><RefreshOutlined /></IconButton>
              <IconButton size="small" onClick={() => {
                invalidate({
                  resource: BILLING_FEE_RELEASE_META_URL,
                  invalidates: ['list'],
                })
                setOpenReceive(false)
                setInvoiceData("initial")
              }}><CloseOutlined /></IconButton>
            </Stack>
          </Stack>
          {typeof invoiceData === "string" ? (
            <FeeReceive
              key={typeof invoiceData === "string" ? invoiceData : "initial"}
              onClose={() => {
                invalidate({
                  resource: BILLING_FEE_RELEASE_META_URL,
                  invalidates: ['list'],
                })
                setOpenReceive(false)
                setInvoiceData("initial")
              }}
              onSuccess={(data) => {
                invalidate({
                  resource: BILLING_FEE_RELEASE_META_URL,
                  invalidates: ['list'],
                })
                console.log(data, "data")
                setInvoiceData(data.data)
              }}
              student={studentData!}
              currentYear={currentYear!}
            />
          ) : (
            <InvoiceView invoiceId={invoiceData.id} />
          )}
        </Box>
      </BasicModal>
    </Box>
  );

};