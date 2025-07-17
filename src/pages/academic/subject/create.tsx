import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { SubjectForm } from "@academic/subject";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <SubjectForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
