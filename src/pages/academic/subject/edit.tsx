import { SubjectForm } from "@academic/subject";
import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <SubjectForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
