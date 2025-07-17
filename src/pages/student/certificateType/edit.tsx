import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { TypeForm } from "@exam/setting/type";
import { CertificateTypeForm } from "@student/certificateType";

export default () => {
  const { close } = useNav("list")
  return (
    <FormModal
      onClose={close}
    >
      <CertificateTypeForm
        onClose={close}
        action="edit"
      />
    </FormModal>
  );
};
