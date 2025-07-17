import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { FeeReleaseStudent } from "@billing/feeRelease/create";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <FeeReleaseStudent
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
