import { Box, Button, Grid2 as Grid, Typography } from "@mui/material"
import { EbookForm } from "./_ebook_form"
import { ATFormProps, IFileResponse, Nullable } from "src/interfaces"
import { BookFileTypeEnum, LIBRARY_EBOOK_URL } from "../constant"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useFieldArray } from "react-hook-form";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_LIBRARY } from "@common/constant";
import { ILibEBookCreate } from "../interface";
import { HttpError } from "@refinedev/core";
import { CSHiddenInput } from "@components/input";
import { useRefineForm } from "@hooks/useForm";

export const AddEbook = (props: ATFormProps) => {
    const t = useTranslate(LANG_LIBRARY, "book");
    const {
        control,
        handleSubmit,
        formState: { errors },
        refineCore: { onFinish, query },
        setValue,
        saveButtonProps,
    } = useRefineForm<ILibEBookCreate, HttpError, Nullable<ILibEBookCreate>>({
        refineCoreProps: {
            redirect: false,
            resource: LIBRARY_EBOOK_URL,
            action: "create",
            onMutationSuccess: props.onClose
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ebooks",
    });
    return (
        <Box width={"100%"}>
            <form
                onSubmit={handleSubmit((data) => {
                    onFinish(data);
                })}
            >
                <CSHiddenInput name="book_id" defaultValue={props.id} control={control} />
                <Grid container spacing={2}>
                    <Grid size={12} >
                        {fields.map((field: any, index) => (
                            <EbookForm name="ebooks" setValue={setValue} key={field.id} remove={remove} field={field} index={index} control={control} errors={errors} />
                        ))}
                    </Grid>
                    <Grid size={12} >
                        <Button
                            variant="outlined"
                            onClick={() =>
                                append({ files: [] as IFileResponse[], remark: "", type: BookFileTypeEnum.PDF })
                            }
                            fullWidth
                            startIcon={<AddCircleOutlineIcon />}
                            sx={{ mb: 2 }}
                        >
                            {t("actions.addEbook")}
                        </Button>
                    </Grid>
                    <Grid size={12} justifyItems={"end"}>
                        <Button
                            variant="contained"
                            color="primary"
                            {...saveButtonProps}
                        >
                            {t("@buttons.save")}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}