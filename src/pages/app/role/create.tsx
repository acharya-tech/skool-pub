import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { RoleForm } from "@app/role";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <RoleForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
