import { IconButton } from "@mui/material";
import { RefineShowView } from "@components/index";
import { XmSubjectBreadcrumbs } from "@components/breadcrumb/breadcumb.xmsubject";
import { EXAM_ROUTINE_LIST } from "@exam/constant/local.urls";
import { SubjectDetail } from "@exam/subject/show";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default () => {
  return (
    <RefineShowView
      breadcrumb={<XmSubjectBreadcrumbs />}
      goBack={<Link to={'/' + EXAM_ROUTINE_LIST}><IconButton><IoMdArrowBack /></IconButton></Link>}
      headerButtons={() => (
        <></>
      )}
      footerButtons={() => (
        <></>
      )}
    >
      <SubjectDetail />
    </RefineShowView>
  );
};
