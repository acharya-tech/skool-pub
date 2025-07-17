import { IconButton } from "@mui/material";
import { LANG_NOTICE } from "@common/constant";
import { RefineShowView } from "@components/index";
import { useTranslate } from "@hooks/useTranslate";
import { NOTICE_SMS_LIST } from "@notice/constant/local.urls";
import { SmsMetaView } from "@notice/sms/show";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default () => {
  const t = useTranslate(LANG_NOTICE, "sms");
  const title = t("titles.show");
  return (
    <RefineShowView
      title={title}
      goBack={<Link to={'/' + NOTICE_SMS_LIST}><IconButton><IoMdArrowBack /></IconButton></Link>}
      headerButtons={() => (
        <></>
      )}
      footerButtons={() => (
        <></>
      )}
    >
      <SmsMetaView />
    </RefineShowView>
  );
};
