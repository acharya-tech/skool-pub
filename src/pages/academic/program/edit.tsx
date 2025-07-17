import { ProgramForm } from "@academic/program";
import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <ProgramForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
