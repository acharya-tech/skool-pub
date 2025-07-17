import { SaveOutlined } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { Button, Grid2 as Grid, Stack } from "@mui/material";
import { LANG_DATAVALUE } from "@common/constant";
import { BasicModal } from "@components/modal/basic.modal";
import { useTranslate } from "@hooks/useTranslate";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LabelEdit, LabelExtraEdit } from "./editItem/label.edit";
import { CommonEdit } from "./editItem/common.edit";
import { EditorEdit } from "./editItem/editor.edit";
import { convertHTMLToSVG } from "../utils";
import { SubjectTableEdit } from "./editItem/subject.table.edit";

type EditModalProps = {
    open: boolean;
    selectedElement: any;
    onClose: () => void;
    onConfirm: (id: string, updatedElement: any) => void;
    paperHeight: number;
    paperWidth: number
}
export const EditModal = ({ open, selectedElement, paperHeight, paperWidth, onClose, onConfirm }: EditModalProps) => {
    const t = useTranslate(LANG_DATAVALUE, "editor")
    const { control, formState: { errors }, handleSubmit, reset, setValue } = useForm({
        defaultValues: { ...selectedElement }
    })
    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        if (!open) return
        reset({ ...selectedElement })
    }, [open])
    if (!selectedElement) return null
    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title={`Edit ${selectedElement.name}`}
            footer={
                <Stack direction={"row"} gap={2}>
                    <Button variant="text" onClick={() => setShowMore(!showMore)}>
                        {t(`@buttons.${showMore ? "showLess" : "showMore"}`)}
                    </Button>
                    <Button
                        startIcon={<SaveOutlined />}
                        color="secondary"
                        size="small"
                        variant="outlined"
                        onClick={handleSubmit((data) => {
                            if (selectedElement.type === "editor") {
                                const quill = document.querySelector(".ql-editor")!
                                // console.log(data, "quill")
                                const contentHeight = Math.min(quill.scrollHeight, paperHeight) + 50; // Exact height of all content
                                const contentWidth = Math.min(quill.scrollWidth, paperWidth);
                                const uri = convertHTMLToSVG(quill.innerHTML, contentWidth, contentHeight)
                                onConfirm(selectedElement.id, { ...data, height: contentHeight, width: contentWidth, uri })
                                onClose()
                            }
                            else {
                                onConfirm(selectedElement.id, data)
                                onClose()
                            }
                        })}
                    >{t("@buttons.save")}</Button>
                    <Button color="error" onClick={onClose}>{t("@buttons.cancel")}</Button>
                </Stack>
            }
        >
            <Grid container spacing={2}>
                {selectedElement.type === "editor" && (
                    <EditorEdit
                        editable={selectedElement.editable}
                        width={paperWidth}
                        setEditable={(value: string) => {
                            setValue("editable", value)
                        }}
                    />
                )}
                {(selectedElement.type === "text") && (
                    <LabelEdit category={selectedElement.category} control={control} errors={errors} t={t} />
                )}
                {(selectedElement.type === "subjectTable" || selectedElement.type === "ledgerTable") && (
                    <SubjectTableEdit control={control} errors={errors} t={t} />
                )}
            </Grid>
            <Grid container spacing={2} mt={2}>
                {showMore && (<>
                    <Divider />
                    {selectedElement.type !== "text" && (
                        <LabelExtraEdit category={selectedElement.category} control={control} errors={errors} t={t} />
                    )}
                    <CommonEdit type={selectedElement.type} control={control} errors={errors} t={t} />
                </>)}
            </Grid>
        </BasicModal>
    );
}