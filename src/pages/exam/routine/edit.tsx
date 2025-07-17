import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { RoutineForm } from "@exam/routine";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <RoutineForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
