import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { FeeClassForm } from "@billing/feeClass";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <FeeClassForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
