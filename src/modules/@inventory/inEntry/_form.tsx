import { HttpError } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import {
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  IconButton,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  CSAutoComplete,
  CSDatePicker,
  CSInput,
  CSNumber,
} from "@components/input";
import { LANG_INVENTORY } from "@common/constant";
import { IStoreInEntryCreate, IStoreItem, IStoreProcurement, IStoreProduct, IStoreVendor } from "../interface";
import {
  INVENTORY_INENTRY_LIST,
  INVENTORY_PROCUREMENT_LIST,
  INVENTORY_PRODUCT_LIST,
  INVENTORY_VENDOR_LIST,
} from "../constant";
import { useAutocomplete } from "@refinedev/mui";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { useFieldArray } from "react-hook-form";
import { useRefineForm } from "@hooks/useForm";

export const InEntryForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_INVENTORY, "inEntry");
  const { autocompleteProps: vendorAutoProps } = useAutocomplete<IStoreVendor>({
    resource: INVENTORY_VENDOR_LIST,
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value,
        },
      ];
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
  } = useRefineForm<IStoreInEntryCreate, HttpError, Nullable<IStoreInEntryCreate>>({
    refineCoreProps: {
      meta: { customQuery: { house: true, vendor: true, procument: true } },
      resource: INVENTORY_INENTRY_LIST,
      redirect: false,
      action: props.action,
      onMutationSuccess: props.onClose,
    },
    shouldUnregister: false,
    defaultValues: {
      entry_date: new Date(),
    },
  });

  const { autocompleteProps: procurementAutoProps } =
    useAutocomplete<IStoreProcurement>({
      resource: INVENTORY_PROCUREMENT_LIST,
      onSearch: (value: string) => {
        return [
          {
            field: "name",
            operator: "eq",
            value,
          },
        ];
      },
    });

  const { autocompleteProps: productAutoProps } = useAutocomplete<IStoreProduct>({
    resource: INVENTORY_PRODUCT_LIST,
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value,
        },
      ];
    },
  });

  const items = 'items'
  const { fields, append, remove } = useFieldArray({
    control,
    name: items
  });
  const [itemsFields, vatRate, discountAmount] = watch([items, 'vat_rate', 'dis_amt'])

  const getRowTotal = (index: number) => {
    const item = itemsFields ? itemsFields[index] : {
      amount: 0,
      qty: 0
    }
    return (item.amount ?? 0) * (item.qty ?? 0)
  };

  const calculateSubtotal = itemsFields?.reduce((sum, item) => sum + ((item.amount ?? 0) * (item.qty ?? 0)), 0) ?? 0;

  const calculateTax = (calculateSubtotal - (discountAmount ?? 0)) * ((vatRate ?? 0) / 100);

  const calculateTotal = calculateSubtotal + calculateTax;

  const selectedItems = itemsFields?.map((item) => item.product?.id) ?? []

  return (
    <Box p={2}>
      <form
        onSubmit={handleSubmit((data) => {
          onFinish({ ...data });
        })}
      >
        <Grid container spacing={3}>
          {/* Existing fields */}
          <Grid size={4}>
            <CSInput
              fullWidth
              name="title"
              label={t("fields.title")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            {/* procurementAutoProps */}
            <CSAutoComplete
              fullWidth
              required
              defaultValue={query?.data?.data?.procument}
              getOptionLabel={(r: any) => r.name}
              autocompleteProps={procurementAutoProps}
              name="procument"
              label={t("fields.procument")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSDatePicker
              fullWidth
              name="entry_date"
              label={t("fields.entry_date")}
              control={control}
              errors={errors}
            />
          </Grid>
        </Grid>
        {/* added component new */}
        <Grid size={12}>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={"30%"}>{t("fields.product_name")}</TableCell>
                  <TableCell width={"20%"}>{t("fields.vendor")}</TableCell>
                  <TableCell align="right">{t("fields.quantity")}</TableCell>
                  <TableCell align="right">{t("fields.unit_price")}</TableCell>
                  <TableCell width={"10%"} align="right">{t("fields.total_amount")}</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((field: any, index) => (
                  <TableRow key={field.id}>
                    <TableCell>
                      <CSAutoComplete
                        fullWidth
                        required
                        getOptionLabel={(r: any) => r.name}
                        autocompleteProps={productAutoProps}
                        getOptionDisabled={(option: IStoreItem) => selectedItems.includes(option.id)}
                        name={`items.${index}.product`}
                        error={errors[items]?.[index]?.['product'] ?? undefined}
                        label={t("fields.product_name")}
                        control={control}
                      />
                    </TableCell>
                    <TableCell>
                      <CSAutoComplete
                        fullWidth
                        required
                        getOptionLabel={(r: any) => r.name}
                        autocompleteProps={vendorAutoProps}
                        name={`items.${index}.vendor`}
                        error={errors[items]?.[index]?.['vendor'] ?? undefined}
                        label={t("fields.vendor")}
                        control={control}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <CSNumber
                        fullWidth
                        textAlign="right"
                        name={`items.${index}.qty`}
                        error={errors[items]?.[index]?.['qty'] ?? undefined}
                        label={t("fields.quantity")}
                        control={control}
                        errors={errors}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <CSNumber
                        fullWidth
                        textAlign="right"
                        name={`items.${index}.amount`}
                        error={errors[items]?.[index]?.['amount'] ?? undefined}
                        label={t("fields.unit_price")}
                        control={control}
                      />
                    </TableCell>
                    <TableCell align="right"><Typography variant="subtitle1">{getRowTotal(index).toFixed(2)}</Typography></TableCell>
                    <TableCell width={"10px"} align="right">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => remove(index)}
                      >
                        <FaTrash fontSize={"small"} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            fullWidth
            startIcon={<FaPlus />}
            variant="outlined"
            color="primary"
            onClick={() => append({
              product: undefined,
              qty: undefined,
              amount: undefined
            })}
            sx={{ mt: 2 }}
          >
            {t("actions.addItem")}
          </Button>
          <Grid size={12} >
            <Divider sx={{ my: 2 }} />
          </Grid>
          <Grid size={12} >
            <Grid container spacing={2}>
              <Grid size={12} >
                <CSInput
                  fullWidth
                  multiline={3}
                  name="remark"
                  label={t("fields.remark")}
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={12} >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>{t("labels.sub_total")}:</Typography>
                  <Typography>${calculateSubtotal.toFixed(2)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>{t("labels.discount")}:</Typography>
                  <CSInput
                    key="dis_amt"
                    textAlign="right"
                    type="number"
                    label={t('fields.dis_amt')}
                    name="dis_amt"
                    control={control}
                    errors={errors} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>{t("labels.vatRate")}:</Typography>
                  <CSInput
                    key="vat_rate"
                    type="number"
                    textAlign="right"
                    label={t('fields.vat_rate')}
                    name="vat_rate"
                    control={control}
                    errors={errors} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>{t('labels.vatAmount')}:</Typography>
                  <Typography>${calculateTax.toFixed(2)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Typography variant="h6">{t('labels.total')}:</Typography>
                  <Typography variant="h6">
                    ${calculateTotal.toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

        </Grid>

        <Stack direction={"row"} gap={2} mt={4} justifyContent="flex-end">
          <Button onClick={props.onClose}>{t("@buttons.cancel")}</Button>
          <Button {...saveButtonProps} variant="contained">
            {t("@buttons.save")}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
