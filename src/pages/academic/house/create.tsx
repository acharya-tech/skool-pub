import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { HouseForm } from "@academic/house";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <HouseForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
