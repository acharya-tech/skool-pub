import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { PostForm } from "@employee/post";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <PostForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
