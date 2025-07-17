import { ClassForm } from "@academic/class";
import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <ClassForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
