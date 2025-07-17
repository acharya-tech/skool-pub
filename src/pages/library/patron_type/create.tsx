import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { PatronTypeForm } from "@library/patron_type/_from";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <PatronTypeForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
