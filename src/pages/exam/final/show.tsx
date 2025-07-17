import { IconButton } from "@mui/material";
import { RefineShowView } from "@components/index";
import { EXAM_FINAL_LIST, EXAM_ROUTINE_LIST } from "@exam/constant/local.urls";
import { FinalResultListTable } from "@exam/final/show";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default () => {
  return (
    <RefineShowView
      goBack={<Link to={'/' + EXAM_FINAL_LIST}><IconButton><IoMdArrowBack /></IconButton></Link>}
      headerButtons={() => (
        <></>
      )}
      footerButtons={() => (
        <></>
      )}
    >
      <FinalResultListTable />
    </RefineShowView>
  );
};
