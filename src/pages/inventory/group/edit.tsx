import { LANG_INVENTORY } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { useTranslate } from "@hooks/useTranslate";
import { GroupForm } from "@inventory/group/_form";
import { FormModal } from "@components/modal/form.modal";
export default () => {
  const { close } = useNav("list");
  const t = useTranslate(LANG_INVENTORY, "groups");
  return (
    <FormModal
      onClose={close}
      title={t("actions.edit")}
    >
      <GroupForm action="edit" onClose={close} />
    </FormModal>
  );
};
