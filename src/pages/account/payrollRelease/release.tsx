import { RefineListView } from "@components/view";
import { PropsWithChildren } from "react";
import { PayrollRelease } from "@account/payrollRelease";

export default ({ children }: PropsWithChildren) => {
  return (
    <RefineListView
      noCard
      headerButtons={(props) => [

      ]}
    >
      <PayrollRelease />
    </RefineListView>
  );
};