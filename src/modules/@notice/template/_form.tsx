import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Chip, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSHiddenInput, CSInput, CSSelect } from "@components/input";
import { LANG_NOTICE } from "@common/constant";
import { INoticeTemplate } from "../interface";
import { QuillInput } from "@components/input/editor.input";
import React, { useEffect, useRef } from "react";
import { NoticeTemplateType, NoticeUserTypeEnum } from "../constant/enum";
import { getNoticeTemplateVariables } from "../utils/common";
import ReactQuill from "react-quill";
import { useRefineForm } from "@hooks/useForm";

export const TemplateForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_NOTICE, "template");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    setValue,
    watch,
    saveButtonProps,
  } = useRefineForm<INoticeTemplate, HttpError>({
    refineCoreProps: {
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: props.onClose,
    }
  });
  useEffect(() => {
    if (query?.data?.data) {
      setValue("template", query?.data?.data?.template)
    }
  }, [query?.data?.data])
  const templateVariable = getNoticeTemplateVariables([NoticeUserTypeEnum.Parent, NoticeUserTypeEnum.Staff, NoticeUserTypeEnum.Student])
  const templateValue = watch("template") ?? ""
  const templateType = watch("type")
  const templateInputRef = useRef<HTMLTextAreaElement | null>(null);
  const quillRef = useRef<ReactQuill | null>(null);

  const handleQuillInsert = (variable: string) => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const range = editor.getSelection(true);
      if (range) {
        editor.insertText(range.index, `{{${variable}}}`, 'user');
        editor.setSelection(range.index, `{{${variable}}}`.length);
      }
    }
  };
  const handleInsertVariable = (variable: string) => {
    const input = templateInputRef.current;
    if (!input) return;

    const { selectionStart, selectionEnd } = input;
    const currentValue = input.value;

    const insertion = `{{${variable}}}`;

    const newValue =
      currentValue.substring(0, selectionStart) +
      insertion +
      currentValue.substring(selectionEnd);

    // Update input value manually and also through react-hook-form
    input.value = newValue;
    input.focus();

    // Move cursor after the inserted value
    const newCursorPosition = selectionStart + insertion.length;
    input.setSelectionRange(newCursorPosition, newCursorPosition);

    // Update form state
    setValue("template", newValue, { shouldValidate: true });
  };

  return (
    <Box p={4}>
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data);
        })}
      >
        <Grid container spacing={2}>
          <Grid size={8}>
            <CSInput
              fullWidth
              name="name"
              label={t("fields.name")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSSelect
              fullWidth
              name="type"
              label={t("fields.type")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(NoticeTemplateType).map((e: NoticeTemplateType) => {
                return <MenuItem value={e} key={e}>{e}</MenuItem>
              })}
            </CSSelect>
          </Grid>
          <Grid size={12}>
            {templateType === NoticeTemplateType.Sms && (
              <CSInput
                inputRef={templateInputRef}
                fullWidth
                multiline={5}
                name="template"
                label={t("fields.template")}
                required
                control={control}
                errors={errors}
              />
            )}
            {templateType === NoticeTemplateType.Email && (
              <>
                <CSHiddenInput
                  name="template"
                  label={t("fields.template")}
                  required
                  control={control}
                />
                <QuillInput
                  quillRef={quillRef}
                  editable={templateValue}
                  width="100%"
                  setEditable={(value: string) => { setValue("template", value) }}
                />
                {errors.template && (
                  <Typography color="error">{errors?.template?.message?.toString()}</Typography>
                )}
              </>
            )}
          </Grid>
          {templateType && (
            <Grid size={12}>
              <Box gap={1} display="flex" flexWrap="wrap">
                {templateVariable.map((e) => {
                  return <Chip
                    label={e}
                    key={e}
                    onClick={() => templateType === NoticeTemplateType.Email ? handleQuillInsert(e) : handleInsertVariable(e)}
                  />
                })}
              </Box>
            </Grid>
          )}
          <Grid size={12} mt={2}>
            <Divider />
            <Stack
              direction={"row"}
              gap={5}
              mt={2}
              justifyContent="flex-end"
            >
              <Button onClick={props.onClose}>{t("@buttons.cancel")}</Button>
              <Button {...saveButtonProps} variant="contained">
                {t("@buttons.save")}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
