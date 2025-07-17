import { useEffect, useState } from "react";
import { useList, useOne, useShow } from "@refinedev/core";
import { DATAVALUE_URL } from "@datavalue/constant/server.url";
import { IDataValue } from "@datavalue/interface";
import { DataKeyTemplateEnum } from "@datavalue/constant/enum";
import { ITemplateData } from "src/editor/interface";
import LoadingWrapper from "@components/other/loading";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import { BILLING_INVOICE_URL } from "../../constant";
import { IBillInvoice } from "../../interface";
import { BillingQuickView } from "../../Invoice/quickshow";
type InvoiceViewProps = {
  invoiceId: string
}
export const InvoiceView = ({ invoiceId }: InvoiceViewProps) => {
  const [template, setTemplate] = useState<ITemplateData>()
  const {
    data
  } = useOne<IBillInvoice>({
    resource: BILLING_INVOICE_URL,
    id: invoiceId,
    meta: { customQuery: { accountYear: true, createdBy: true, items: true } }
  });

  const { data: templateQuery, isLoading: templateLoading } = useList<IDataValue>({
    resource: DATAVALUE_URL,
    meta: {
      customQuery: {
        data_key: DataKeyTemplateEnum.BILLING_INVOICE_DESIGN,
      }
    }
  });

  useEffect(() => {
    if (templateQuery) {
      const temp = JSON.parse(templateQuery?.data[0]?.data_value as string ?? "{}")
      setTemplate(temp)
    }
  }, [templateQuery])

  return <Box sx={{ display: "flex", justifyContent: "center" }}>
    <Paper sx={{ mx: 10, my: 2 }} elevation={2}>
      <LoadingWrapper value={(data?.data && template)} >
        <BillingQuickView bill={data?.data!} template={template} close={close} />
      </LoadingWrapper>
    </Paper>
  </Box>
};
