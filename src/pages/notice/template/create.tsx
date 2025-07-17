import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { IconButton } from "@mui/material";
import { LANG_NOTICE } from "@common/constant";
import { RefineCreateView } from "@components/view/create";
import { useTranslate } from "@hooks/useTranslate";
import { TemplateForm } from "@notice/template";
import { MdArrowBack } from "react-icons/md";

export default () => {
  const { close } = useNav("list")
  const t = useTranslate(LANG_NOTICE, "template");
  const title = t("actions.add");
  return (
    <RefineCreateView
      title={title}
      goBack={<IconButton onClick={close}><MdArrowBack /></IconButton>}
      footerButtons={() => (
        <></>
      )}
    >
      <TemplateForm
        onClose={close}
        action="create"
      />
    </RefineCreateView>
  );
};
