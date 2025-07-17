import { useNav } from "@hooks/useNavlHook";
import { IconButton } from "@mui/material";
import { LANG_NOTICE } from "@common/constant";
import { RefineCreateView } from "@components/view/create";
import { useTranslate } from "@hooks/useTranslate";
import { SMSForm } from "@notice/sms/_form";
import { MdArrowBack } from "react-icons/md";

export default () => {
  const { close } = useNav("list")
  const t = useTranslate(LANG_NOTICE, "sms");
  const title = t("actions.add");
  return (
    <RefineCreateView
      title={title}
      noCard
      goBack={<IconButton onClick={close}><MdArrowBack /></IconButton>}
      footerButtons={() => (
        <></>
      )}
    >
      <SMSForm
        onClose={close}
        action="create"
      />
    </RefineCreateView>
  );
};
