import { HttpError } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Chip,
    Divider,
    FormControl,
    FormHelperText,
    Grid2 as Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {
    CSAutoComplete,
    CSInput,
    CSDateTimePicker,
    CSHiddenInput,
    CSCheckboxList,
} from "@components/input";
import { LANG_NOTICE } from "@common/constant";
import { INoticeAudience, INoticeAudienceTemp, INoticeCreate, INoticeTemplate, NoticePreconditionListTypes } from "../interface";
import { NOTICE_CREATE_URL, NOTICE_TEMPLATE_URL } from "../constant/server.urls";
import { useAutocomplete } from "@refinedev/mui";
import { AudianceFilter } from "../component/audinaceFilter";
import { useEffect, useRef, useState } from "react";
import { YesNoEnum } from "@common/all.enum";
import { MdOutlineGroupAdd } from "react-icons/md";
import { BasicModal } from "@components/modal/basic.modal";
import { NoticeTemplateType, NoticeTypeEnum, NoticeUserTypeEnum } from "../constant/enum";
import { OutlinedInput } from "@mui/material";
import { ListItemText } from "@mui/material";
import NoDataLabel from "@components/other/no.data";
import { StudentStateEnum } from "@student/constant";
import { getNoticeTemplateVariables } from "../utils/common";
import { useRefineForm } from "@hooks/useForm";
const initialPrecondition = Object.keys(NoticeUserTypeEnum).reduce((acc: NoticePreconditionListTypes, e) => {
    acc[e as NoticeUserTypeEnum] = {
        parents: YesNoEnum.Yes,
        studentState: [],
        students: YesNoEnum.Yes,
        markAll: YesNoEnum.No
    };
    return acc;
}, {} as NoticePreconditionListTypes);

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
        },
    },
};

export const SMSForm = (props: ATFormProps) => {
    const t = useTranslate(LANG_NOTICE, "sms");
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [audiance, setAudianceList] = useState<INoticeAudienceTemp[]>([]);
    const [preconditions, setPreconditions] = useState<NoticePreconditionListTypes>(initialPrecondition);
    const [searchAudiance, setSearchAudiance] = useState<string>("");
    const [selectAudiance, setSelectAudiance] = useState<NoticeUserTypeEnum[]>([]);
    const templateInputRef = useRef<HTMLTextAreaElement | null>(null);
    const { autocompleteProps: templateAutoProps } = useAutocomplete<INoticeTemplate>({
        resource: NOTICE_TEMPLATE_URL,
        meta: {
            customQuery: {
                type: NoticeTemplateType.Sms
            }
        },
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
        formState: { errors },
        refineCore: { onFinish },
        setValue,
        saveButtonProps,
    } = useRefineForm<INoticeCreate, HttpError>({
        refineCoreProps: {
            resource: NOTICE_CREATE_URL,
            redirect: false,
            id: props.id,
            action: "create",
            // onMutationSuccess: props.onClose
        },
    });

    useEffect(() => {
        setValue("audiances", audiance.length > 0 ? convertToAudience(audiance, preconditions) : undefined);
    }, [audiance])

    const handleDeleteAudiance = (uid: string) => {
        setAudianceList(audiance.filter((item) => item.uid !== uid));
    };

    const handleAddAudinance = (
        data: INoticeAudienceTemp[],
        preconditions: NoticePreconditionListTypes
    ) => {
        setAudianceList((prev) => {
            const map = new Map<string, INoticeAudienceTemp>();

            // 1. Identify groups where markAll is Yes
            const markAllGroups = new Set<NoticeUserTypeEnum>();
            for (const group in preconditions) {
                if (preconditions[group as NoticeUserTypeEnum]?.markAll === YesNoEnum.Yes) {
                    markAllGroups.add(group as NoticeUserTypeEnum);
                }
            }

            // 2. Keep only previous data not in markAll groups
            for (const item of prev) {
                if (!markAllGroups.has(item.group)) {
                    map.set(`${item.group}_${item.id}`, item);
                }
            }

            // 3. Add or override with new data
            for (const item of data) {
                map.set(`${item.group}_${item.id}`, item);
            }

            return Array.from(map.values());
        });
        setPreconditions((prev) => ({
            ...prev,
            ...preconditions, // overrides or adds new ones
        }));
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
        setValue("message", newValue, { shouldValidate: true });
    };
    const uniqueGroups: NoticeUserTypeEnum[] = [
        ...new Set(audiance.map((item) => item.group)),
    ];
    const templateVariable = getNoticeTemplateVariables(uniqueGroups)

    return (
        <Box width={"100%"} padding={2}>
            <form
                onSubmit={handleSubmit((data) => {
                    onFinish(data);
                })}
            >
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Card>
                            <CardHeader
                                title={t("titles.create")}
                                action={
                                    <CSCheckboxList
                                        fullWidth
                                        items={[NoticeTypeEnum.Notice]}
                                        label={t("labels.notice")}
                                        control={control}
                                        name="noticeTypes"
                                    />
                                }
                            />
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid size={12} >
                                        <CSInput
                                            fullWidth
                                            name="title"
                                            label={t("fields.title")}
                                            required
                                            control={control}
                                            errors={errors}
                                        />
                                    </Grid>
                                    <Grid size={12} >
                                        <CSAutoComplete
                                            fullWidth
                                            getOptionLabel={(r: any) => r.name}
                                            autocompleteProps={templateAutoProps}
                                            name="template"
                                            label={t("fields.template")}
                                            onChange={(value: INoticeTemplate, field: any) => {
                                                setValue("message", value.template);
                                                field.onChange(value)
                                            }}
                                            control={control}
                                            errors={errors}
                                        />
                                    </Grid>
                                    <Grid size={12} >
                                        <CSDateTimePicker
                                            fullWidth
                                            name="schedule"
                                            label={t("fields.schedule")}
                                            control={control}
                                            errors={errors}
                                        />
                                    </Grid>
                                    <Grid size={12} >
                                        <CSInput
                                            inputRef={templateInputRef}
                                            fullWidth
                                            required
                                            multiline={4}
                                            name="message"
                                            label={t("fields.message")}
                                            control={control}
                                            errors={errors}
                                        />
                                        <CSHiddenInput name="noticeTypes.0" control={control} defaultValue={NoticeTypeEnum.Sms} />
                                        <CSHiddenInput name="audiances" required label={t("fields.audiance")} control={control} />
                                    </Grid>
                                    <Grid size={12}>
                                        <Box gap={1} display="flex" flexWrap="wrap">
                                            {templateVariable.map((e) => {
                                                return <Chip
                                                    label={e}
                                                    key={e}
                                                    onClick={() => handleInsertVariable(e)}
                                                />
                                            })}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Grid size={12} mt={2}>
                                <Stack direction={"row"} p={2} spacing={2} justifyContent="flex-end">
                                    <Button onClick={props.onClose}>{t("@buttons.cancel")}</Button>
                                    <Button {...saveButtonProps} variant="contained">
                                        {t("@buttons.save")}
                                    </Button>
                                </Stack>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </form>
            <Card sx={{ mt: 2, p: 2 }}>
                <Stack direction="row" spacing={2} justifyContent={"space-between"} alignItems="center">
                    <Typography variant="h6">{t("titles.audiance")} - ({audiance.length})</Typography>
                    <Stack direction="row" spacing={2}>
                        <FormControl size="small">
                            <InputLabel id="demo-multiple-checkbox-label">{t("labels.selectAudiance")}</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={selectAudiance}
                                onChange={(e) => setSelectAudiance(e.target.value as NoticeUserTypeEnum[])}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                sx={{ minWidth: 200 }}
                                MenuProps={MenuProps}
                            >
                                {Object.values(NoticeUserTypeEnum).map((e: NoticeUserTypeEnum) => {
                                    return <MenuItem key={e} value={e}>
                                        <Checkbox checked={selectAudiance.includes(e)} />
                                        <ListItemText primary={e} />
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            size="small"
                            sx={{ minWidth: 200 }}
                            label={t("labels.searchAudiance")}
                            onChange={(e) => setSearchAudiance(e.target.value)}
                        />
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => setOpenFilter(true)}
                            startIcon={<MdOutlineGroupAdd />}
                        >
                            {t("actions.addAudiance")}
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => setAudianceList([])}>
                            {t("actions.clearAudiance")}
                        </Button>
                    </Stack>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Box gap={5} minHeight={100}>
                    {audiance
                        .filter((item) => selectAudiance.includes(item.group) || selectAudiance.length === 0)
                        .filter((item) => item.name.toLowerCase().includes(searchAudiance.toLowerCase()) || searchAudiance.length === 0)
                        .map((item, index) => {
                            return (<Chip onDelete={() => handleDeleteAudiance(item.uid)} key={item.uid} sx={{ m: 0.4 }} label={`${item.group} : ${item.name}`} />)
                        })}

                    {audiance.length === 0 && <NoDataLabel height={100} />}
                </Box>
                {errors.audiances?.message && <FormHelperText error>{errors.audiances?.message as string}</FormHelperText>}
            </Card>
            <BasicModal
                title={t("titles.audiance")}
                onClose={() => setOpenFilter(false)}
                open={openFilter}
                size="xl"
            >
                <AudianceFilter handleDeleteAudiance={handleDeleteAudiance} audiances={audiance} setAudiance={handleAddAudinance} initialPrecondition={initialPrecondition} />
            </BasicModal>
        </Box>
    );
};


const convertToAudience = (
    tempList: INoticeAudienceTemp[],
    preconditions: NoticePreconditionListTypes
): INoticeAudience[] => {
    const grouped = new Map<NoticeUserTypeEnum, Set<string>>();

    // Group ids by group
    for (const item of tempList) {
        if (!grouped.has(item.group)) {
            grouped.set(item.group, new Set<string>());
        }
        grouped.get(item.group)!.add(item.id);
    }

    // Build the final INoticeAudience[]
    const result: INoticeAudience[] = [];

    for (const [group, idsSet] of grouped.entries()) {
        const pre = preconditions[group];

        result.push({
            group,
            ids: Array.from(idsSet),
            precondition: {
                students: pre?.students ?? YesNoEnum.Yes,
                parents: pre?.parents ?? YesNoEnum.Yes,
                markAll: pre?.markAll ?? YesNoEnum.No,
                studentState: pre?.studentState ?? [StudentStateEnum.Current]
            }
        });
    }

    return result;
};
