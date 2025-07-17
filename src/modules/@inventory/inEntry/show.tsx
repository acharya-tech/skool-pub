import { HttpError, useList, useShow } from "@refinedev/core";
import {
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Card,
  CardContent,
} from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_INVENTORY } from "@common/constant";
import {
  IStoreInEntry,
  IStoreItem,
} from "@inventory/interface";
import { INVENTORY_INENTRY_URL, INVENTORY_ITEMS_URL } from "../constant";
import { CsLabel } from "@components/label";
import { TextLabel } from "@components/other/text.label";
import { DateTimeLabel } from "@components/label/date.label";
import { ActiveStatusChip } from "@components/label/status.label";
import { useRefineShow } from "@hooks/useShow";

export const InEntryShowModule = () => {
  const t = useTranslate(LANG_INVENTORY, "inEntry");
  const {
    query: { data, isLoading },
  } = useRefineShow<IStoreInEntry>({
    resource: INVENTORY_INENTRY_URL,
    meta: { customQuery: { procument: true, user: true } },
  });

  const record = data?.data;

  const { data: itemData } = useList<IStoreItem, HttpError>({
    resource: INVENTORY_ITEMS_URL,
    meta: {
      customQuery: { purchase_id: record?.id, vendor: true },
    },
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <>
      <Card>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell><CsLabel text={t("fields.title")} /></TableCell>
                  <TableCell><TextLabel text={record?.title} isLoading={isLoading} /></TableCell>
                  <TableCell><CsLabel text={t("fields.procument")} /></TableCell>
                  <TableCell><TextLabel text={record?.procument?.proc_regid} isLoading={isLoading} /></TableCell>
                  <TableCell><CsLabel text={t("fields.entry_date")} /></TableCell>
                  <TableCell><TextLabel text={<DateTimeLabel date={record?.entry_date} />} isLoading={isLoading} /></TableCell>
                  <TableCell><CsLabel text={t("fields.user")} /></TableCell>
                  <TableCell><TextLabel text={record?.user?.name} isLoading={isLoading} /></TableCell>
                  <TableCell><CsLabel text={t("fields.status")} /></TableCell>
                  <TableCell><ActiveStatusChip status={record?.status} /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><CsLabel text={t("fields.remark")} /></TableCell>
                  <TableCell colSpan={9}><TextLabel text={record?.remark} isLoading={isLoading} /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ p: 1 }}>{t("fields.product_name")}</TableCell>
                  <TableCell sx={{ p: 1 }}>{t("fields.vendor")}</TableCell>
                  <TableCell width={200} align="right" sx={{ p: 1 }}>{t("fields.quantity")}</TableCell>
                  <TableCell width={200} align="right" sx={{ p: 1 }}>{t("fields.amount")}</TableCell>
                  <TableCell width={200} align="right" sx={{ p: 1 }}>{t("fields.total_amount")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemData?.data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{item.product_name}</TableCell>
                    <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{item.vendor?.name}</TableCell>
                    <TableCell align="right" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{item.qty}</TableCell>
                    <TableCell align="right" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{item.amount}</TableCell>
                    <TableCell align="right" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{Number(item.amount) * Number(item.qty)}</TableCell>
                  </TableRow>
                ))}
                <TableRow key={'amount'} sx={{ backgroundColor: '#eee' }}>
                  <TableCell colSpan={4} align="right" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{t("labels.sub_total")}</TableCell>
                  <TableCell align="right" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{record?.amount}</TableCell>
                </TableRow>
                <TableRow key={'discount'} sx={{ backgroundColor: '#eee' }}>
                  <TableCell colSpan={4} align="right" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{t("labels.discount")}</TableCell>
                  <TableCell align="right" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{record?.dis_amt}</TableCell>
                </TableRow>
                <TableRow key={'vatAmount'} sx={{ backgroundColor: '#eee' }}>
                  <TableCell colSpan={4} align="right" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{t("labels.vatAmount")}({record?.vat_rate}%)</TableCell>
                  <TableCell align="right" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{record?.vat_amt}</TableCell>
                </TableRow>
                <TableRow key={'total'} sx={{ backgroundColor: '#ccc' }}>
                  <TableCell colSpan={4} align="right" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{t("labels.total")}</TableCell>
                  <TableCell align="right" sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{record?.total_amount}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};
