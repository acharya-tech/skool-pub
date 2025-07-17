import { useEffect, useState } from "react";
import { useList } from "@refinedev/core";
import { VoucherQuickView } from "./quickshow";
import { DATAVALUE_URL } from "@datavalue/constant/server.url";
import { IDataValue } from "@datavalue/interface";
import { DataKeyTemplateEnum } from "@datavalue/constant/enum";
import { ITemplateData } from "src/editor/interface";
import LoadingWrapper from "@components/other/loading";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import { useNav } from "@hooks/useNavlHook";
import { ACCOUNT_VOUCHER_LIST } from "../constant/urls";
import { IAccountVoucher } from "../interface";
import { ACCOUNT_VOUCHER_URL } from "../constant/server.urls";
import { useRefineShow } from "@hooks/useShow";

type VoucherViewProps = {
  id?: string
  onClose: () => void
}
export const VoucherView = (props: VoucherViewProps) => {
  const { close } = useNav(ACCOUNT_VOUCHER_LIST);
  const [template, setTemplate] = useState<ITemplateData>()
  const {
    query: { data, isLoading },
  } = useRefineShow<IAccountVoucher>({
    resource: ACCOUNT_VOUCHER_URL,
    id: props.id,
    meta: { customQuery: { accountYear: true, items: true } }
  });

  const { data: templateQuery, isLoading: templateLoading } = useList<IDataValue>({
    resource: DATAVALUE_URL,
    meta: {
      customQuery: {
        data_key: DataKeyTemplateEnum.ACCOUNT_VOUCHER,
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
        <VoucherQuickView voucher={data?.data!} template={template} close={props.onClose ?? close} />
      </LoadingWrapper>
    </Paper>
  </Box>
};
