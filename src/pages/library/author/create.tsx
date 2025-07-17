import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { AuthorForm } from "@library/author";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <AuthorForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
