import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { CertificateForm } from "@student/certificate";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <CertificateForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
