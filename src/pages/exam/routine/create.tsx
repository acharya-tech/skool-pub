import { RefineCreateView } from "@components/view/create";
import { useNav } from "@hooks/useNavlHook";
import { RoutineForm } from "@exam/routine";

export default () => {
  const { close } = useNav("list")
  return (
    <RefineCreateView
      title={false}
      goBack={false}
      noCard={true}
      footerButtons={() => (
        <></>
      )}
    >
      <RoutineForm
        onClose={close}
        action="create"
      />
    </RefineCreateView>
  );
};
