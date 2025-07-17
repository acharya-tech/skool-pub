import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { PublisherForm } from "@library/publisher/_form";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <PublisherForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
