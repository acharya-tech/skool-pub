import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { DepartmentForm } from "@employee/department";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <DepartmentForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
