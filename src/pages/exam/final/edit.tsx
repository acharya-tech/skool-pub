import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { FinalFormEdit } from "@exam/final/_edit";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <FinalFormEdit
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
