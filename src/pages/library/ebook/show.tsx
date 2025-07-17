import { IconButton } from "@mui/material";
import { RefineShowView } from "@components/index";
import { LIBRARY_EBOOK_LIST } from "@library/constant";
import { EBookView } from "@library/ebook/show";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default () => {
  return (
    <RefineShowView
      goBack={<Link to={'/' + LIBRARY_EBOOK_LIST}><IconButton><IoMdArrowBack /></IconButton></Link>}
      headerButtons={() => (
        <></>
      )}
      footerButtons={() => (
        <></>
      )}
    >
      <EBookView />
    </RefineShowView>
  );
};
