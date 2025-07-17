import { IconButton } from "@mui/material";
import { LANG_INVENTORY } from "@common/constant";
import { RefineCreateView } from "@components/view/create";
import { useNav } from "@hooks/useNavlHook";
import { useTranslate } from "@hooks/useTranslate";
import { ProcurementForm } from "@inventory/procurements";
import { MdArrowBack } from "react-icons/md";

export default () => {
  const { close } = useNav("list");
  const t = useTranslate(LANG_INVENTORY, "procurement");

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
      <ProcurementForm onClose={close} action="create" />
    </RefineCreateView>
  );
};
