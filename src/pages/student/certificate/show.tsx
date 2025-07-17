import { IconButton } from "@mui/material";
import { LANG_STUDENT } from "@common/constant";
import { RefineCreateView } from "@components/view/create";
import { useNav } from "@hooks/useNavlHook";
import { useTranslate } from "@hooks/useTranslate";
import { MdArrowBack } from "react-icons/md";
import { CertificateView } from "@student/certificate/show";
export default () => {
  const { close } = useNav("list");
  const t = useTranslate(LANG_STUDENT, "certificate");

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
      <CertificateView />
    </RefineCreateView>
  );
};
