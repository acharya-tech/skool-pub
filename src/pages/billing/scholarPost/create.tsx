import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { ScholarPostForm } from "@billing/scholarPost";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <ScholarPostForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
