import { IconButton } from "@mui/material";
import { LANG_EMPLOYEE } from "@common/constant";
import { RefineCreateView } from "@components/view/create";
import { useNav } from "@hooks/useNavlHook";
import { useTranslate } from "@hooks/useTranslate";
import { MdArrowBack } from "react-icons/md";
import { GroupView } from "@employee/group/show";
export default () => {
  const { close } = useNav("list");
  const t = useTranslate(LANG_EMPLOYEE, "groups");
  return (
    <RefineCreateView
      title={t("titles.show")}
      goBack={
        <IconButton onClick={close}>
          <MdArrowBack />
        </IconButton>
      }
      footerButtons={() => (
        <></>
      )}
    >
      <GroupView />
    </RefineCreateView>
  );
};
