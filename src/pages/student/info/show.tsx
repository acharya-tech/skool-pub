import { IconButton } from "@mui/material";
import { RefineShowView } from "@components/index";
import { getQueryParam } from "@utils/other";
import { STUDENT_CURRENT_LIST } from "@student/constant";
import { StudentShow } from "@student/info/show";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { StudentBreadcrumbs } from "@components/breadcrumb/breadcumb.student";

export default () => {
  const { programid } = useParams()
  return (
    <RefineShowView
      breadcrumb={<StudentBreadcrumbs />}
      goBack={<Link to={'/' + getQueryParam(STUDENT_CURRENT_LIST, { programid })}><IconButton><IoMdArrowBack /></IconButton></Link>}
      headerButtons={() => (
        <></>
      )}
      footerButtons={() => (
        <></>
      )}
    >
      <StudentShow />
    </RefineShowView>
  );
};
