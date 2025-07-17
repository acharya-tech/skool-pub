import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { SessionForm } from "@academic/session";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <SessionForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
