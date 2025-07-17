import { RefineListView } from "@components/index";
import { ModuleNameEnum } from "@datavalue/constant/enum";
import { DataValueListTable } from "@datavalue/list";
import { LIBRARY_DATAVALUE_LIST } from "@library/constant";

export default () => {
    return <RefineListView
        headerButtons={<></>}
    >
        <DataValueListTable module={ModuleNameEnum.Library} nav={LIBRARY_DATAVALUE_LIST} />
    </RefineListView>
};