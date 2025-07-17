import { useNav } from "@hooks/useNavlHook";
import { LANG_BILLING } from "@common/constant";
import { RefineCreateView } from "@components/view/create";
import { useTranslate } from "@hooks/useTranslate";
import { EntranceForm } from "@billing/entrance/_form";

export default () => {
  const { close } = useNav("list")
  const t = useTranslate(LANG_BILLING, "entrance");
  const title = t("titles.create");
  return (
    <RefineCreateView
      title={title}
      goBack={false}
      footerButtons={() => (
        <></>
      )}
    >
      <EntranceForm
        onClose={close}
        action="create"
      />
    </RefineCreateView>
  );
};
