import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { ScholarItemForm } from "@billing/scholarItem";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <ScholarItemForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
