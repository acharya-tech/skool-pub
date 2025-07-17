import { TypeForm } from "@exam/setting/type";
import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <TypeForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
