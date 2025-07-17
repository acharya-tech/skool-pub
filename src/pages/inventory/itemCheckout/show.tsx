import { RefineShowView } from "@components/view";
import { Outlet } from "react-router-dom";
import { ItemCheckoutShowModule } from "@inventory/itemCheckout/show";

export default () => {
  return (
    <>
      <RefineShowView>
        <ItemCheckoutShowModule />
      </RefineShowView>
      <Outlet />
    </>
  );
};