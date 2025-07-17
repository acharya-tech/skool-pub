import { RefineShowView } from "@components/view";
import { UserProfileView } from "@app/users/view";

export default () => {
  return (
    <>
      <RefineShowView
        goBack={false}
      >
        <UserProfileView />
      </RefineShowView>
    </>
  );
};