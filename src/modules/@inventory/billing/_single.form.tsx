import { HttpError } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import {
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
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
  CSSelect,
} from "@components/input";
import { LANG_INVENTORY } from "@common/constant";
import {
  IStoreBillingCreate,
  IStoreItem,
  IStoreProduct,
} from "../interface";
import {
  INVENTORY_BILLING_LIST,
  INVENTORY_PRODUCT_LIST,
  InventoryBillUserTypeEnum,
} from "../constant";
import { useAutocomplete } from "@refinedev/mui";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { useFieldArray } from "react-hook-form";
import { STUDENT_INFO_URL, StudentStateEnum } from "@student/constant";
import { IStudentInfo } from "@student/interface";
import { IStaff } from "@employee/interface";
import { NepaliMonthEnum } from "@common/all.enum";
import { useRefineForm } from "@hooks/useForm";

export const SingleBillingFrom = (props: ATFormProps) => {
  const t = useTranslate(LANG_INVENTORY, "billing");

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IStoreBillingCreate, HttpError, Nullable<IStoreBillingCreate>>({
    refineCoreProps: {
      meta: { customQuery: { house: true, vendor: true, procument: true } },
      resource: INVENTORY_BILLING_LIST,
      redirect: false,
      action: props.action,
      onMutationSuccess: props.onClose,
    },
    shouldUnregister: false,
    defaultValues: {
      entry_date: new Date(),
      user_type: InventoryBillUserTypeEnum.Student,
      month: Object.values(NepaliMonthEnum)[new Date().getMonth()],
    },
  });

  const { autocompleteProps: studentAutoProps } = useAutocomplete<IStudentInfo>({
    resource: STUDENT_INFO_URL,
    meta: {
      customQuery: {
        state: StudentStateEnum.Current,
        class: true,
      }
    },
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

  // const { autocompleteProps: staffAutoProps } = useAutocomplete<IStaff>({
  //   resource: EMPLOYEE_STAFF_LIST,
  //   meta: {
  //     customQuery: {
  //       state: StudentStateEnum.Current,
  //       class: true,
  //     }
  //   },
  //   onSearch: (value: string) => {
  //     return [
  //       {
  //         field: "name",
  //         operator: "eq",
  //         value,
  //       },
  //     ];
  //   },
  // });

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
    name: items,
    rules: {
      validate: (items) => items.length > 0 || "At least one item is required",
    },
  });
  const [itemsFields, vatRate, discountAmount, userType] = watch([items, 'vat_rate', 'dis_amt', 'user_type'])

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
        <Stack direction={"row"} gap={2} mb={4} justifyContent="flex-end">
          <Button onClick={props.onClose}>{t("@buttons.cancel")}</Button>
          <Button {...saveButtonProps} variant="contained">
            {t("@buttons.save")}
          </Button>
        </Stack>
        <Grid container spacing={3}>
          {/* Existing fields */}
          <Grid size={6}>
            {userType === InventoryBillUserTypeEnum.Other && (
              <CSInput
                fullWidth
                name="customer_name"
                label={t("fields.customer_name")}
                required
                control={control}
                errors={errors}
              />
            )}
            {(userType === InventoryBillUserTypeEnum.Scholar || userType === InventoryBillUserTypeEnum.Student) && (
              <CSAutoComplete
                fullWidth
                getOptionLabel={(r: IStudentInfo) => (`${r.full_name} | ${r.class?.name}`)}
                renderLabel={(r: IStudentInfo) => (`${r.full_name} | ${r.class?.name}`)}
                autocompleteProps={studentAutoProps}
                name="student"
                label={t("fields.student_name")}
                required
                control={control}
                errors={errors}
              />
            )}
            {userType === InventoryBillUserTypeEnum.Staff && (
              <CSAutoComplete
                fullWidth
                getOptionLabel={(r: IStaff) => (`${r.name} | ${r.department?.name}`)}
                renderLabel={(r: IStaff) => (`${r.name} | ${r.department?.name}`)}
                autocompleteProps={studentAutoProps}
                name="staff"
                label={t("fields.staff_name")}
                required
                control={control}
                errors={errors}
              />
            )}
          </Grid>
          <Grid size={2}>
            <CSSelect
              fullWidth
              name="user_type"
              label={t("fields.user_type")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(InventoryBillUserTypeEnum).map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </CSSelect>
          </Grid>
          <Grid size={2}>
            <CSSelect
              fullWidth
              name="month"
              label={t("fields.month")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(NepaliMonthEnum).map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </CSSelect>
          </Grid>
          <Grid size={2}>
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
                      {/* TODO: auto populate unit price from product  */}
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
          {errors.items && <Typography color="error">{errors.items?.root?.message}</Typography>}
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

      </form>
    </Box>
  );
};
