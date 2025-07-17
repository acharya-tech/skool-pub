import { FormModal } from "@components/modal/form.modal";
import { useNav } from "@hooks/useNavlHook";
import { ACADEMIC_ROOM_LIST } from "@academic/constant/urls";
import { RoomForm } from "@academic/room";

export default () => {
  const { close } = useNav(ACADEMIC_ROOM_LIST)
  return (
    <FormModal
      onClose={close}
    >
      <RoomForm
        onClose={close}
        action="create"
      />
    </FormModal>
  );
};
