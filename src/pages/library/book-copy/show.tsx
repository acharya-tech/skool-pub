import { IconButton } from "@mui/material";
import { RefineShowView } from "@components/index";
import { BookCopyView } from "@library/book_copy/show";
import { LIBRARY_BOOK_COPY_LIST } from "@library/constant";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default () => {
  return (
    <RefineShowView
      goBack={<Link to={'/' + LIBRARY_BOOK_COPY_LIST}><IconButton><IoMdArrowBack /></IconButton></Link>}
      headerButtons={() => (
        <></>
      )}
      footerButtons={() => (
        <></>
      )}
    >
      <BookCopyView />
    </RefineShowView>
  );
};
