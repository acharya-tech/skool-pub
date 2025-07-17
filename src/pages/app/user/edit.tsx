import { RefineCreateView } from "@components/view/create";
import { MdArrowBack } from "react-icons/md";
import { IconButton } from "@mui/material";
import { useNav } from "@hooks/useNavlHook";
import { UserForm } from "@app/users";

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
      <UserForm action="edit" onClose={close} />
    </RefineCreateView>
  );
};
