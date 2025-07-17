import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { ImportStudent } from "@student/admission/import.student";

export default () => {
    const { close } = useNav("list")
    return (
        <FormModal
            onClose={close}
            size="xl"
        >
            <ImportStudent
                onClose={close}
                action="create"
            />
        </FormModal>
    );
};
