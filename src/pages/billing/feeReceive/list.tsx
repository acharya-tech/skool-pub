import { RefineListView } from "@components/view";
import { FeeReceiveView } from "@billing/feeReceive/list";
export default() => {
  return (
    <>
      <RefineListView
        noCard
      >
        <FeeReceiveView />
      </RefineListView>
    </>
  );
};