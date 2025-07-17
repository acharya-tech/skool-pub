import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { PayrollSettingForm } from "@account/payrollSetting";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <PayrollSettingForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
