import { IconButton } from "@mui/material";
import { LANG_INVENTORY } from "@common/constant";
import { RefineCreateView } from "@components/view/create";
import { useNav } from "@hooks/useNavlHook";
import { useTranslate } from "@hooks/useTranslate";
import { ProductForm } from "@inventory/products/_form";
import { MdArrowBack } from "react-icons/md";

export default () => {
  const { close } = useNav("list")
  const t = useTranslate(LANG_INVENTORY, "product");

  return (
    <RefineCreateView
    title={t("actions.edit")}
    goBack={<IconButton onClick={close}><MdArrowBack /></IconButton>}
    footerButtons={() => (
      <></>
    )}
  >
    <ProductForm
      onClose={close}
      action="edit"
    />
  </RefineCreateView>
  );
};
