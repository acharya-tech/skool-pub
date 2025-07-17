import { LANG_EMPLOYEE } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { useTranslate } from "@hooks/useTranslate";
import { GroupForm } from "@employee/group/_form";
import { FormModal } from "@components/modal/form.modal";
export default () => {
  const { close } = useNav("list");
  const t = useTranslate(LANG_EMPLOYEE, "groups");
  return (
    <FormModal
      onClose={close}
      title={t("actions.edit")}
    >
      <GroupForm action="edit" onClose={close} />
    </FormModal>
  );
};
