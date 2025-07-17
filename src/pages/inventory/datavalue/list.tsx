import { RefineListView } from "@components/index";
import { ModuleNameEnum } from "@datavalue/constant/enum";
import { DataValueListTable } from "@datavalue/list";
import { INVENTORY_DATAVALUE_LIST } from "@inventory/constant";

export default () => {
    return <RefineListView
        headerButtons={<></>}
    >
        <DataValueListTable module={ModuleNameEnum.Store} nav={INVENTORY_DATAVALUE_LIST} customQuery={{ module_id: 1 }} />
    </RefineListView>
};