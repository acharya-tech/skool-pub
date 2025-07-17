import { IconButton } from "@mui/material";
import { RefineShowView } from "@components/index";
import { BookView } from "@library/book/show";
import { LIBRARY_BOOK_LIST } from "@library/constant";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default() => {
  return (
    <RefineShowView
      goBack={<Link to={'/' + LIBRARY_BOOK_LIST}><IconButton><IoMdArrowBack /></IconButton></Link>}
      headerButtons={() => (
        <></>
      )}
      footerButtons={() => (
        <></>
      )}
    >
      <BookView />
    </RefineShowView>
  );
};
