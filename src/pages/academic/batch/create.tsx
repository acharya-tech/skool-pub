import { BatchForm } from "@academic/batch";
import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <BatchForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
