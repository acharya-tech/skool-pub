import { IconButton } from "@mui/material";
import { LANG_BILLING } from "@common/constant";
import { RefineShowView } from "@components/index";
import { useNav } from "@hooks/useNavlHook";
import { useTranslate } from "@hooks/useTranslate";
import { FeeReleaseEditForm } from "@billing/feeRelease/edit";
import { MdArrowBack } from "react-icons/md";

export default () => {
  const t = useTranslate(LANG_BILLING, "feeRelease");
  const title = t("titles.edit");
  const { close } = useNav("list")
  return (
    <>
      <RefineShowView
        title={title}
        goBack={
          <IconButton onClick={close}>
            <MdArrowBack />
          </IconButton>
        } headerButtons={() => (
          <></>
        )}
        footerButtons={() => (
          <></>
        )}
      >
        <FeeReleaseEditForm />
      </RefineShowView>
    </>
  );
};
