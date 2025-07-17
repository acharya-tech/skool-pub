import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { HostelForm } from "@academic/hostel";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <HostelForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
