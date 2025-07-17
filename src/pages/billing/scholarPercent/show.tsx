import { IconButton } from "@mui/material";
import { LANG_BILLING } from "@common/constant";
import { RefineShowView } from "@components/index";
import { useTranslate } from "@hooks/useTranslate";
import { BILLING_SCHOLAR_PERCENT_LIST } from "@billing/constant";
import { ScholarPercentView } from "@billing/scholarPercent/show";
import { PropsWithChildren } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_BILLING, "scholarPercent");
  const title = t("titles.show");
  return (
    <>
      <RefineShowView
        title={title}
        goBack={<Link to={'/' + BILLING_SCHOLAR_PERCENT_LIST}><IconButton><IoMdArrowBack /></IconButton></Link>}
        headerButtons={() => (
          <></>
        )}
        footerButtons={() => (
          <></>
        )}
      >
        <ScholarPercentView />
      </RefineShowView>
      {children}
    </>
  );
};
