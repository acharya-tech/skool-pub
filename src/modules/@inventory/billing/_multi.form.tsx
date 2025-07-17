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
  CSHiddenInput
} from "@components/input";
import { LANG_INVENTORY } from "@common/constant";
import {
  IStoreBillingCreate,
  IStoreItem,
  IStoreProduct,
} from "../interface";
import {
  INVENTORY_PRODUCT_LIST,
  InventoryBillUserTypeEnum,
  INVENTORY_BILLING_CREATE_MANY,
} from "../constant";
import { useAutocomplete } from "@refinedev/mui";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { useFieldArray } from "react-hook-form";
import { IClass, ISection } from "@academic/interface";
import { ACADEMIC_CLASS_LIST, ACADEMIC_SECTION_LIST } from "@academic/constant/urls";
import { GroupStudentList } from "./group.student.list";
import { GroupEmpList } from "./group.emp.list";
import { useState, useEffect } from "react";
import { NepaliMonthEnum } from "@common/all.enum";
import { useRefineForm } from "@hooks/useForm";

export const MultiBillingForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_INVENTORY, "billing");
  const [selectedRows, setSelectedRows] = useState<any>([])
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    refineCore: { onFinish, query },
    setValue,
    saveButtonProps,
  } = useRefineForm<IStoreBillingCreate, HttpError>({
    refineCoreProps: {
      meta: { customQuery: { house: true, vendor: true, procument: true } },
      resource: INVENTORY_BILLING_CREATE_MANY,
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

  useEffect(() => {
    setValue('student_ids', selectedRows)
  }, [selectedRows])

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

  const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
    meta: { customQuery: { program: true } },
    resource: ACADEMIC_CLASS_LIST,
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value
        }
      ]
    }
  });

  const { autocompleteProps: sectionAutoProps } = useAutocomplete<ISection>({
    resource: ACADEMIC_SECTION_LIST,
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value
        }
      ]
    }
  });

  const items = 'items'
  const { fields, append, remove } = useFieldArray({
    control,
    name: items,
    rules: {
      validate: (items) => items.length > 0 || "At least one item is required",
    }
  });
  const [itemsFields, vatRate, discountAmount, userType = InventoryBillUserTypeEnum.Student, sclass, sections, department] = watch([items, 'vat_rate', 'dis_amt', 'user_type', 'class', 'sections', 'department'])

  const getRowTotal = (index: number) => {
    const item = itemsFields ? itemsFields[index] : {
      amount: 0,
      qty: 0
    }
    return (item.amount ?? 0) * (item.qty ?? 0)
  };

  const calculateSubtotal = itemsFields?.reduce((sum: number, item: any) => sum + ((item.amount ?? 0) * (item.qty ?? 0)), 0) ?? 0;

  const calculateTax = (calculateSubtotal - (discountAmount ?? 0)) * ((vatRate ?? 0) / 100);

  const calculateTotal = calculateSubtotal + calculateTax;

  const selectedItems = itemsFields?.map((item: any) => item.product?.id) ?? []

  const error: any = errors[items]

  return (
    <Box p={2}>
      <form
        onSubmit={handleSubmit((data) => {
          onFinish({ ...data });
        })}
      >
        <Stack direction={"row"} gap={2} mb={4} justifyContent="flex-end">
          <Button onClick={props.onClose}>{t("@buttons.cancel")}</Button>
          <Button {...saveButtonProps} disabled={saveButtonProps?.disabled || selectedRows.length === 0 || selectedItems.length === 0} variant="contained">
            {t("@buttons.save")}
          </Button>
        </Stack>
        <Grid container spacing={3}>
          {(userType === InventoryBillUserTypeEnum.Scholar || userType === InventoryBillUserTypeEnum.Student) && (
            <>
              <Grid size={3}>
                <CSAutoComplete
                  fullWidth
                  required
                  groupBy={(option: IClass) => option.program.name}
                  getOptionLabel={(r: any) => r.name}
                  autocompleteProps={classAutoProps}
                  name="class"
                  label={t("fields.class")}
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={3}>
                <CSAutoComplete
                  fullWidth
                  multiple
                  getOptionLabel={(r: any) => r.name}
                  autocompleteProps={sectionAutoProps}
                  name="sections"
                  label={t("fields.section")}
                  control={control}
                  errors={errors}
                />
              </Grid>
            </>
          )}
          {/* TODO: Add employee field */}
          <Grid size={2}>
            <CSSelect
              fullWidth
              name="user_type"
              label={t("fields.user_type")}
              required
              control={control}
              errors={errors}
            >
              <MenuItem key={InventoryBillUserTypeEnum.Student} value={InventoryBillUserTypeEnum.Student}>
                {InventoryBillUserTypeEnum.Student}
              </MenuItem>
              <MenuItem key={InventoryBillUserTypeEnum.Scholar} value={InventoryBillUserTypeEnum.Scholar}>
                {InventoryBillUserTypeEnum.Scholar}
              </MenuItem>
              <MenuItem key={InventoryBillUserTypeEnum.Staff} value={InventoryBillUserTypeEnum.Staff}>
                {InventoryBillUserTypeEnum.Staff}
              </MenuItem>
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
                        error={(error?.[index]?.['product'] ?? undefined)}
                        label={t("fields.product_name")}
                        control={control}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <CSNumber
                        fullWidth
                        textAlign="right"
                        name={`items.${index}.qty`}
                        error={error?.[index]?.['qty'] ?? undefined}
                        label={t("fields.quantity")}
                        control={control}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {/* TODO: auto populate unit price from product  */}
                      <CSNumber
                        fullWidth
                        textAlign="right"
                        name={`items.${index}.amount`}
                        error={error?.[index]?.['amount'] ?? undefined}
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
          {errors.items && <Typography color="error">{error?.root?.message}</Typography>}
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
      <Divider sx={{ my: 2 }} />
      {errors.student_ids && <Typography color="error">{errors.student_ids?.message as any}</Typography>}
      <CSHiddenInput name="student_ids" control={control} defaultValue={selectedRows} />
      {userType !== InventoryBillUserTypeEnum.Staff &&
        <GroupStudentList class={sclass} sections={sections} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
      }
      {userType === InventoryBillUserTypeEnum.Staff &&
        <GroupEmpList department={department} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
      }
    </Box>
  );
};
