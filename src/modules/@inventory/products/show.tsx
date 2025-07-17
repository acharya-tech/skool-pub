import { useShow } from "@refinedev/core";
import {
  Grid2 as Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Card,
  CardContent,
  Box,
  TableContainer,
  TableHead,
} from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_INVENTORY } from "@common/constant";
import { IStoreProduct } from "../interface";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { CsLabel } from "@components/label";
import { TextLabel } from "@components/other/text.label";
import { INVENTORY_PRODUCT_URL } from "@inventory/constant";
import { useRefineShow } from "@hooks/useShow";

export const ProductShowModule = () => {
  const t = useTranslate(LANG_INVENTORY, "product");
  const [search, setSearch] = useState<string>("");
  const {
    query: { data, isLoading },
  } = useRefineShow<IStoreProduct>({
    resource: INVENTORY_PRODUCT_URL,
  });
  const record = data?.data;

  return (
    <>
      <Card>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell><CsLabel text={t("fields.code")} /></TableCell>
                  <TableCell><TextLabel text={record?.code} isLoading={isLoading} /></TableCell>
                  <TableCell><CsLabel text={t("fields.name")} /></TableCell>
                  <TableCell><TextLabel text={record?.name} isLoading={isLoading} /></TableCell>
                  <TableCell><CsLabel text={t("fields.life_expn")} /></TableCell>
                  <TableCell><TextLabel text={record?.life_expn} isLoading={isLoading} /></TableCell>
                  <TableCell><CsLabel text={t("fields.min_qty")} /></TableCell>
                  <TableCell><TextLabel text={record?.min_qty} isLoading={isLoading} /></TableCell>
                  <TableCell><CsLabel text={t("fields.category")} /></TableCell>
                  <TableCell><TextLabel text={record?.category} isLoading={isLoading} /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><CsLabel text={t("fields.description")} /></TableCell>
                  <TableCell colSpan={9}><TextLabel text={record?.description} isLoading={isLoading} /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6" gutterBottom>
              {t("titles.history")}
            </Typography>
            <CSSearch
              value={search}
              onChange={setSearch}
              placeholder={t("@buttons.search")}
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
