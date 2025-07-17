import { IconButton } from "@mui/material";
import { LANG_INVENTORY } from "@common/constant";
import { RefineCreateView } from "@components/view/create";
import { useNav } from "@hooks/useNavlHook";
import { useTranslate } from "@hooks/useTranslate";
import { MdArrowBack } from "react-icons/md";
import { BillingView } from "@inventory/billing/show";
export default () => {
  const { close } = useNav("list");
  const t = useTranslate(LANG_INVENTORY, "billing");
  
  return (
    <RefineCreateView
      title={t("titles.show")}
      noCard
      goBack={
        <IconButton onClick={close}>
          <MdArrowBack />
        </IconButton>
      }
      footerButtons={() => (
        <></>
      )}
    >
      <BillingView />
    </RefineCreateView>
  );
};
