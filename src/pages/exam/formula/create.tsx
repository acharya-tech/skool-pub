import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { FormulaForm } from "@exam/setting/formula";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <FormulaForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
