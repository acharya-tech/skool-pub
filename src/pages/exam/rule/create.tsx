import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { RuleForm } from "@exam/setting/rule";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <RuleForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
