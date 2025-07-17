import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { LedgerGroupForm } from "@account/ledgergroup";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <LedgerGroupForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
