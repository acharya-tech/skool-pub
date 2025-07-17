import { Grid2 as Grid, MenuItem } from "@mui/material";
import { CSCheckbox, CSColor, CSInput, CSNumber, CSSelect } from "@components/input";
import { ItemTypes } from "src/editor/interface";

type CommonEditProps = {
    control: any;
    errors: any;
    type: ItemTypes
    t: any;
};
export function CommonEdit({ type, control, errors, t }: CommonEditProps) {
    return (
        <>
            {["image", "text", "editor", "subjectTable","ledgerTable"].includes(type) &&
                <Grid size={4}>
                    <CSInput
                        fullWidth
                        label={t("fields.name")}
                        control={control}
                        errors={errors}
                        name="name"
                    />
                </Grid>
            }
            <Grid size={4}>
                <CSNumber
                    fullWidth
                    label={t("fields.rotation")}
                    control={control}
                    errors={errors}
                    name="rotation"
                />
            </Grid>
            <Grid size={4}>
                <CSNumber
                    fullWidth
                    label={t("fields.opacity")}
                    max={1}
                    min={0}
                    step={0.1}
                    control={control}
                    errors={errors}
                    name="opacity"
                />
            </Grid>
        </>
    );
};