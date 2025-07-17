import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { EsubjectForm } from "@exam/setting/esubject";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <EsubjectForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
