import {  RefineShowView } from "@components/view";
import { Outlet } from "react-router-dom";
import { ProcurementView } from "@inventory/procurements/show";

export default () => {
  return (
	<>
	  <RefineShowView>
		<ProcurementView/>
	  </RefineShowView>
	  <Outlet />
	</>
  );
};