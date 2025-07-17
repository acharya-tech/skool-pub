import { IconButton } from "@mui/material";
import { LANG_ACCOUNT } from "@common/constant";
import { RefineCreateView } from "@components/view/create";
import { useNav } from "@hooks/useNavlHook";
import { useTranslate } from "@hooks/useTranslate";
import { VoucherView } from "@account/voucher/show";
import { MdArrowBack } from "react-icons/md";

export default () => {
  const { close } = useNav("list");
  const t = useTranslate(LANG_ACCOUNT, "voucher");

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
      <VoucherView onClose={close} />
    </RefineCreateView>
  );
};
