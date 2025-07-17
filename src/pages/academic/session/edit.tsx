import { SessionForm } from "@academic/session";
import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <SessionForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
