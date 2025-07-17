import { HttpError } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import {
	Box,
	Button,
	Divider,
	Grid2 as Grid,
	Stack,
	Typography,
} from "@mui/material";
import {
	CSNumber,
} from "@components/input";
import { LANG_LIBRARY } from "@common/constant";
import { ILibBook } from "../interface";
import { useRefineForm } from "@hooks/useForm";

export const QuantityBookForm = (props: ATFormProps) => {
	const t = useTranslate(LANG_LIBRARY, "book");

	const {
		control,
		handleSubmit,
		formState: { errors },
		refineCore: { onFinish, query },
		saveButtonProps,
	} = useRefineForm<ILibBook, HttpError, Nullable<ILibBook>>({
		refineCoreProps: {
			redirect: false,
			id: props.id,
			action: props.action,
			onMutationSuccess: props.onClose,
		},
	});

	return (
		<Box>
			<Typography variant="h6">{t("titles.addQuantity")}</Typography>

			<Divider sx={{ my: 2 }} />
			<form
				onSubmit={handleSubmit((data) => {
					onFinish(data);
				})}
			>
				<Grid
					container
					spacing={2}
					mt={2}
					direction="column"
					justifyContent="flex-start" // Aligns the content to the left
				>
					{/* Form field: Full width on small screens, 6 columns on large screens */}
					<Grid size={6} >
						<CSNumber
							fullWidth
							name="new_book"
							label={t("fields.new_book")}
							required
							control={control}
							errors={errors}
						/>
					</Grid>

					{/* Button group: Full width on small screens, 6 columns on large screens */}
					<Grid size={12} mt={2}>
						<Stack direction={"row"} gap={2} mt={2} justifyContent="flex-end">
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
