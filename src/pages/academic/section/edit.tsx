import { SectionForm } from "@academic/section";
import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <SectionForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
