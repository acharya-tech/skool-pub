import { RefineCreateView } from "@components/view/create";
import { AdmissionForm } from "@student/admission/stepForm";
import { MdArrowBack } from "react-icons/md";
import { IconButton } from "@mui/material";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const { close } = useNav("list");
  return (
    <RefineCreateView
      cardProps={{
        sx: { mt: 5 },
      }}
      goBack={
        <IconButton onClick={close}>
          <MdArrowBack />
        </IconButton>
      }
      footerButtons={() => (
        <></>
      )}
    >
      <AdmissionForm />
    </RefineCreateView>
  );
};
