import { IconButton } from "@mui/material";
import { RefineShowView } from "@components/index";
import { MdArrowBack } from "react-icons/md";
import { useNav } from "@hooks/useNavlHook";
import { FeeReleaseView } from "@billing/feeRelease/show";

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
      <FeeReleaseView />
    </RefineShowView>
  );
};
