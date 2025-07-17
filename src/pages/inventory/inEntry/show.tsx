import {  RefineShowView } from "@components/view";
import { Outlet } from "react-router-dom";
import { InEntryShowModule } from "@inventory/inEntry";

export default () => {
  return (
    <>
      <RefineShowView>
        <InEntryShowModule/>
      </RefineShowView>
      <Outlet />
    </>
  );
};