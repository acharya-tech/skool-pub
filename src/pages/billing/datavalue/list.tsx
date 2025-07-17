import { RefineListView } from "@components/index";
import { BILLING_DATAVALUE_LIST } from "@billing/constant";
import { ModuleNameEnum } from "@datavalue/constant/enum";
import { DataValueListTable } from "@datavalue/list";

export default () => {
    return <RefineListView
        headerButtons={<></>}
    >
        <DataValueListTable module={ModuleNameEnum.Billing} nav={BILLING_DATAVALUE_LIST} />
    </RefineListView>
};