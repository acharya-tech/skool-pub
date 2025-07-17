import { RefineListView } from "@components/view";
import { PropsWithChildren } from "react";
import { PayrollEmployeeListTable } from "@account/employee";

export default({ children }: PropsWithChildren) => {
  return (
    <RefineListView
      noCard
    >
      <PayrollEmployeeListTable />
    </RefineListView>
  );
};