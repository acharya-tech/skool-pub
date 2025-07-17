import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { LedgerForm } from "@account/ledger";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <LedgerForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
