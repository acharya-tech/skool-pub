import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { SectionForm } from "@academic/section";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <SectionForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
