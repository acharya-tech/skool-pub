import {  RefineShowView } from "@components/view";
import { Outlet } from "react-router-dom";
import { RequisitionShowModule } from "@inventory/requsition/show";

export default () => {
  return (
    <>
      <RefineShowView>
        <RequisitionShowModule/>
      </RefineShowView>
      <Outlet />
    </>
  );
};