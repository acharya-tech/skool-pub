import {  RefineShowView } from "@components/view";
import { Outlet } from "react-router-dom";
import { ProductShowModule } from "@inventory/products/show";

export default () => {
  return (
	<>
	  <RefineShowView>
		<ProductShowModule/>
	  </RefineShowView>
	  <Outlet />
	</>
  );
};