import { LocationForm } from "@vehicle/location";
import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <LocationForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
