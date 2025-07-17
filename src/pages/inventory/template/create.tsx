import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { TemplateForm } from "@inventory/template";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <TemplateForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
