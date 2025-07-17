import { HouseForm } from "@academic/house";
import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <HouseForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
