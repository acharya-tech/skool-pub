import { RefineListView } from "@components/index";
import { ModuleNameEnum } from "@datavalue/constant/enum";
import { DataValueListTable } from "@datavalue/list";
import { NOTICE_DATAVALUE_LIST } from "@notice/constant";

export default () => {
    return <RefineListView
        headerButtons={<></>}
    >
        <DataValueListTable module={ModuleNameEnum.Notice} nav={NOTICE_DATAVALUE_LIST} />
    </RefineListView>
};