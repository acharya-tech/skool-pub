import { IconButton } from "@mui/material";
import { RefineShowView } from "@components/index";
import { getQueryParam } from "@utils/other";
import { STUDENT_SUBJECT_LIST } from "@student/constant";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { SubjectDetail } from "@student/subject/show";
import { StudentSubjectBreadcrumbs } from "@components/breadcrumb/breadcumb.student.subject";

export default () => {
  const { programid } = useParams()
  return (
    <RefineShowView
      breadcrumb={<StudentSubjectBreadcrumbs />}
      goBack={<Link to={'/' + getQueryParam(STUDENT_SUBJECT_LIST, { programid })}><IconButton><IoMdArrowBack /></IconButton></Link>}
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
