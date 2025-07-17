import { useEffect, useState } from "react";
import { useList, useShow } from "@refinedev/core";
import { IStoreBilling } from "../interface";
import { BillingQuickView } from "./quickshow";
import { DATAVALUE_URL } from "@datavalue/constant/server.url";
import { IDataValue } from "@datavalue/interface";
import { DataKeyTemplateEnum } from "@datavalue/constant/enum";
import { ITemplateData } from "src/editor/interface";
import LoadingWrapper from "@components/other/loading";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import { useNav } from "@hooks/useNavlHook";
import { INVENTORY_BILLING_LIST, INVENTORY_BILLING_URL } from "../constant";
import { useRefineShow } from "@hooks/useShow";

export const BillingView = () => {
  const { close } = useNav(INVENTORY_BILLING_LIST);
  const [template, setTemplate] = useState<ITemplateData>()
  const {
    query: { data },
  } = useRefineShow<IStoreBilling>({
    resource: INVENTORY_BILLING_URL,
    meta: { customQuery: { year: true, user: true, items: true } }
  });

  const { data: templateQuery, isLoading: templateLoading } = useList<IDataValue>({
    resource: DATAVALUE_URL,
    meta: {
      customQuery: {
        data_key: DataKeyTemplateEnum.STORE_BILL_DESIGN,
        // TODO: use dynamic module id
        module_id: 1
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
        <BillingQuickView bill={data?.data!} template={template!} close={close} />
      </LoadingWrapper>
    </Paper>
  </Box>
};
