import { IconButton } from "@mui/material";
import { LANG_NOTICE } from "@common/constant";
import { RefineShowView } from "@components/index";
import { useTranslate } from "@hooks/useTranslate";
import { NOTICE_NOTICE_LIST } from "@notice/constant/local.urls";
import { NoticeMetaView } from "@notice/message/show";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default () => {
  const t = useTranslate(LANG_NOTICE, "notice");
  const title = t("titles.show");
  return (
    <RefineShowView
      title={title}
      goBack={<Link to={'/' + NOTICE_NOTICE_LIST}><IconButton><IoMdArrowBack /></IconButton></Link>}
      headerButtons={() => (
        <></>
      )}
      footerButtons={() => (
        <></>
      )}
    >
      <NoticeMetaView />
    </RefineShowView>
  );
};
