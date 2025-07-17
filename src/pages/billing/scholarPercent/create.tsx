import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { ScholarPercentForm } from "@billing/scholarPercent";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <ScholarPercentForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
