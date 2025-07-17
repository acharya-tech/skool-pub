import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { BillingLedgerForm } from "@billing/ledger";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <BillingLedgerForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
