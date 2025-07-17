import { IconButton } from "@mui/material";
import { RefineShowView } from "@components/index";
import { MdArrowBack } from "react-icons/md";
import { StaffInfoView } from "@employee/staff/show";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const { close } = useNav("list")
  return (
    <RefineShowView
      goBack={
        <IconButton onClick={close}>
          <MdArrowBack />
        </IconButton>
      }
      headerButtons={() => (
        <></>
      )}
      footerButtons={() => (
        <></>
      )}
    >
      <StaffInfoView />
    </RefineShowView>
  );
};
