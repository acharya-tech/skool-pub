import { IconButton } from "@mui/material";
import { LANG_INVENTORY } from "@common/constant";
import { RefineCreateView } from "@components/view/create";
import { useNav } from "@hooks/useNavlHook";
import { useTranslate } from "@hooks/useTranslate";
import { ItemCheckoutForm } from "@inventory/itemCheckout";
import { MdArrowBack } from "react-icons/md";

export default () => {
  const { close } = useNav("list");
  const t = useTranslate(LANG_INVENTORY, "itemCheckout");

  return (
    <RefineCreateView
      title={t("actions.add")}
      goBack={
        <IconButton onClick={close}>
          <MdArrowBack />
        </IconButton>
      }
      footerButtons={() => (
        <></>
      )}
    >
      <ItemCheckoutForm onClose={close} action="create" />
    </RefineCreateView>
  );
};
