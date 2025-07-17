import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { InfoForm } from "@vehicle/info";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <InfoForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
