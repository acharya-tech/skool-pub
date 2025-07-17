import { useEffect, useState } from "react";
import { useList, useOne, useShow } from "@refinedev/core";
import { DATAVALUE_URL } from "@datavalue/constant/server.url";
import { IDataValue } from "@datavalue/interface";
import { DataKeyTemplateEnum } from "@datavalue/constant/enum";
import { ITemplateData } from "src/editor/interface";
import LoadingWrapper from "@components/other/loading";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import { IFinalReportRes } from "../interface";
import { ACCOUNT_REPORT_URL, ACCOUNT_VOUCHER_URL } from "../constant/server.urls";
import { TableListProp } from "src/interfaces";
import { ACCOUNT_REPORT_TRIAL_ID } from "../constant/constant";
import { FinalReportTemplate } from "./component/final.report.template";

type TrialReportViewProps = {
    dateRange: {
        startDate: Date;
        endDate: Date;
    }
} & TableListProp;
export const TrialReportView = ({ dateRange }: TrialReportViewProps) => {
    const [template, setTemplate] = useState<ITemplateData>()
    const { data: trialReportData } = useOne<IFinalReportRes>({
        resource: ACCOUNT_REPORT_URL,
        id: ACCOUNT_REPORT_TRIAL_ID,
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
                data_key: DataKeyTemplateEnum.ACCOUNT_TRIAL_BALANCE,
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
            <LoadingWrapper value={(trialReportData?.data && template)} >
                <FinalReportTemplate type="trial" data={trialReportData?.data!} template={template} />
            </LoadingWrapper>
        </Paper>
    </Box>
};
