import { useList } from "@refinedev/core";
import { ACCOUNT_VOUCHER_URL } from "../constant/server.urls";
import { Box, Card, CardContent, CardHeader, List, ListItem } from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_ACCOUNT } from "@common/constant";
import NoDataLabel from "@components/other/no.data";
import LoadingWrapper from "@components/other/loading";
import { IAccountVoucher } from "../interface";

export const VoucherHistory = () => {
    const t = useTranslate(LANG_ACCOUNT, "entry")
    const { data, isLoading } = useList<IAccountVoucher>({
        resource: ACCOUNT_VOUCHER_URL
    })
    const vouchers = data?.data ?? []
    return <Card>
        <CardHeader title={t("titles.history")} />
        <CardContent>
            <LoadingWrapper value={data} >
                <List>
                    {vouchers.map(voucher => {
                        return <ListItem>{voucher.voucher_no}</ListItem>
                    })}
                    {vouchers.length === 0 && !isLoading && <NoDataLabel />}
                </List>
            </LoadingWrapper>
        </CardContent>
    </Card>;
};