import { IconButton } from "@mui/material";
import { RefineShowView } from "@components/index";
import { EXAM_ROUTINE_LIST } from "@exam/constant/local.urls";
import { RoutineDetail } from "@exam/routine/show";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default () => {
  return (
    <RefineShowView
      goBack={<Link to={'/' + EXAM_ROUTINE_LIST}><IconButton><IoMdArrowBack /></IconButton></Link>}
      headerButtons={() => (
        <></>
      )}
      footerButtons={() => (
        <></>
      )}
    >
      <RoutineDetail />
    </RefineShowView>
  );
};
