import { useNav } from "@hooks/useNavlHook";
import { FormModal } from "@components/modal/form.modal";
import { PatronForm } from "@library/patron";

export default () => {
	const { close } = useNav("list")
	return (
		<FormModal
			onClose={close}
		>
			<PatronForm
				onClose={close}
				action="edit"
			/>
		</FormModal>
	);
};
