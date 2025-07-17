import { IconButton } from "@mui/material";
import { RefineShowView } from "@components/index";
import { LIBRARY_PATRON_LIST } from "@library/constant";
import { PatronView } from "@library/patron";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default () => {
  return (
    <RefineShowView
      goBack={<Link to={'/' + LIBRARY_PATRON_LIST}><IconButton><IoMdArrowBack /></IconButton></Link>}
      headerButtons={() => (
        <></>
      )}
      footerButtons={() => (
        <></>
      )}
    >
      <PatronView />
    </RefineShowView>
  );
};
