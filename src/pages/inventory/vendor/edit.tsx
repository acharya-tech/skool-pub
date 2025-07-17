import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { VendorForm } from "@inventory/vendor";

export default () => {
  const { close } = useNav("list");
  return (
    <FormModal onClose={close}>
      <VendorForm onClose={close} action="edit" />
    </FormModal>
  );
};
