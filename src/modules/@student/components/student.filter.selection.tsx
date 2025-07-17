import { useTranslate } from "@hooks/useTranslate";
import { Button, Divider, Grid2 as Grid, Stack } from "@mui/material";
import {
    CSCheckbox,
} from "@components/input";

import { IStudentFilter, IStudentSelection } from "../interface";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { LANG_STUDENT } from "@common/constant";

type StudentFilterSelectionFormProps = {
    setSelect: (filter: IStudentSelection | undefined) => void
    onClose: () => void,
    isLoading: boolean,
    defaultValues?: IStudentSelection
}

type SelectionType = [string, string, boolean]
type SelectionObject = {
    [key: string]: SelectionType;
};

const studentSelection: SelectionObject = {
    simg: ["simg", "image", false],
    rid: ["rid", "regid", true],
    fln: ["fln", "full_name", true],
    fn: ["fn", "first_name", false],
    ln: ["ln", "last_name", false],
    rn: ["rn", "roll_no", true],
    sym: ["sym", "symbol", false],
    urg: ["urg", "uni_reg", false],
    cls: ["cls", "class", true],
    sec: ["sec", "section", true],
    hus: ['hus', 'house', true],
    hst: ['hst', 'hostel', true],
    ph: ["ph", "phone", false],
    em: ["em", "email", false],
    g: ["g", "gender", false],
    add1: ["add1", "address1", false],
    add2: ["add2", "address2", false],
    dob_np: ["dob_np", "dob_np", false],
    dob_en: ["dob_en", "dob_en", false],
    bg: ["bg", "blood_group", false],
    nty: ["nty", "nationality", false],
    rlg: ["rlg", "religion", false],
    cst: ["cst", "caste", false],
    bt: ["bt", "batch", false],
    eth: ["eth", "ethnic", false],
    dsty: ["dsty", "disability", false],
    st: ["st", "state", false],
    action: ['action', 'action', true],
}

export const StudentFilterSelectionForm = ({ defaultValues, setSelect, isLoading, onClose }: StudentFilterSelectionFormProps) => {
    const t = useTranslate(LANG_STUDENT, "info");
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<IStudentSelection>({
        disabled: isLoading,
        defaultValues: { ...defaultValues, sid: true }
    });

    return (
        <form
            onSubmit={handleSubmit((data: IStudentSelection) => {
                setSelect({
                    ...data,
                });
            })}
        >
            <Grid container spacing={0}>
                {Object.values(studentSelection).map((k: SelectionType) => {
                    const [name, label, value] = k
                    return <Grid size={3} key={name}>
                        <CSCheckbox
                            name={name}
                            label={t(`fields.${label}`)}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                })}
                <Grid size={12}>
                    <Divider sx={{ my: 2 }} />
                </Grid>
                <Grid size={12}>
                    <Stack direction={'row'} justifyContent={'flex-end'} gap={2}>
                        <Button
                            color="secondary"
                            disabled={isLoading}
                            variant="outlined"
                            onClick={onClose}>{t("@buttons.close")}</Button>
                        <Button
                            color="error"
                            disabled={isLoading}
                            variant="outlined"
                            onClick={() => {
                                reset();
                                setSelect(undefined)
                            }}>{t("@buttons.reset")}</Button>
                        <LoadingButton
                            loading={isLoading}
                            color="success"
                            variant="contained"
                            type="submit"
                        >{t("@buttons.filter")}</LoadingButton>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    )
}