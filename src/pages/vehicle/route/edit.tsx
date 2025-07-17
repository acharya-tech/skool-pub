import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { RouteForm } from "@vehicle/route";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <RouteForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
