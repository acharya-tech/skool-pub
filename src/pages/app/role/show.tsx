import { RefineShowView } from "@components/view";
import { RoleView } from "@app/role/view";

export default () => {
  return (
    <RefineShowView
      goBack={false}

    >
      <RoleView />
    </RefineShowView>
  );
};