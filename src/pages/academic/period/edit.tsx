import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { PeriodForm } from "@academic/period";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <PeriodForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
