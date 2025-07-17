import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { FeeStudentForm } from "@billing/feeToStudent";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <FeeStudentForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
