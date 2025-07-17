import { useEffect, useState } from "react";
import { useList, useOne, useShow } from "@refinedev/core";
import { DATAVALUE_URL } from "@datavalue/constant/server.url";
import { IDataValue } from "@datavalue/interface";
import { DataKeyTemplateEnum } from "@datavalue/constant/enum";
import { ITemplateData } from "src/editor/interface";
import LoadingWrapper from "@components/other/loading";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import { ACCOUNT_REPORT_URL } from "../constant/server.urls";
import { TableListProp } from "src/interfaces";
import { ACCOUNT_REPORT_BALANCE_SHEET_ID } from "../constant/constant";
import { FinalReportTemplate } from "./component/final.report.template";
import { IFinalReportRes } from "../interface";

type BSReportViewProps = {
    dateRange: {
        startDate: Date;
        endDate: Date;
    }
} & TableListProp;
export const BSReportView = ({ dateRange }: BSReportViewProps) => {
    const [template, setTemplate] = useState<ITemplateData>()
    const { data: bsReportData } = useOne<IFinalReportRes>({
        resource: ACCOUNT_REPORT_URL,
        id: ACCOUNT_REPORT_BALANCE_SHEET_ID,
        meta: {
            customQuery: {
                from_date: dateRange.startDate.toISOString(),
                to_date: dateRange.endDate.toISOString()
            },
        },
        queryOptions: {
            enabled: Boolean(dateRange.startDate && dateRange.endDate),
        },
    });

    const { data: templateQuery, isLoading: templateLoading } = useList<IDataValue>({
        resource: DATAVALUE_URL,
        meta: {
            customQuery: {
                data_key: DataKeyTemplateEnum.ACCOUNT_BALANCE_SHEET,
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
            <LoadingWrapper value={(bsReportData?.data && template)} >
                <FinalReportTemplate type="balancesheet" data={bsReportData?.data!} template={template} />
            </LoadingWrapper>
        </Paper>
    </Box>
};
