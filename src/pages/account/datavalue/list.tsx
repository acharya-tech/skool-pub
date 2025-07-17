import { RefineListView } from "@components/index";
import { ACCOUNT_DATAVALUE_LIST } from "@account/constant/urls";
import { ModuleNameEnum } from "@datavalue/constant/enum";
import { DataValueListTable } from "@datavalue/list";

export default () => {
    return <RefineListView
        headerButtons={<></>}
    >
        <DataValueListTable module={ModuleNameEnum.Account} nav={ACCOUNT_DATAVALUE_LIST} />
    </RefineListView>
};