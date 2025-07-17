import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { FeeItemForm } from "@billing/feeItem";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <FeeItemForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
