import { RefineShowView } from "@components/view";
import { RouteShow } from "@vehicle/route/show";

export default () => {
  return (
    <>
      <RefineShowView
        goBack={false}
      >
        <RouteShow />
      </RefineShowView>
    </>
  );
};