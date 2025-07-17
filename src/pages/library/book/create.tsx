import { useNav } from "@hooks/useNavlHook";
import { IconButton } from "@mui/material";
import { LANG_LIBRARY } from "@common/constant";
import { RefineCreateView } from "@components/view/create";
import { useTranslate } from "@hooks/useTranslate";
import { BookForm } from "@library/book/_form";
import { MdArrowBack } from "react-icons/md";

export default () => {
  const { close } = useNav("list")
  const t = useTranslate(LANG_LIBRARY, "book");
  const title = t("actions.add");
  return (
    <RefineCreateView
      title={title}
      goBack={<IconButton onClick={close}><MdArrowBack /></IconButton>}
      footerButtons={() => (
        <></>
      )}
    >
      <BookForm
        onClose={close}
        action="create"
      />
    </RefineCreateView>
  );
};
