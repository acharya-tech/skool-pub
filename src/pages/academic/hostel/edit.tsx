import { HostelForm } from "@academic/hostel";
import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <HostelForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
