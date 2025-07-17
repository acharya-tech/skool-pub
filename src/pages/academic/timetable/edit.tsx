import { ClassSessionForm } from "@academic/timetable/_form";
import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <ClassSessionForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
