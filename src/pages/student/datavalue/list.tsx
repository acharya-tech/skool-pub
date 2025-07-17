import { RefineListView } from "@components/index";
import { STUDENT_DATAVALUE_LIST } from "@student/constant";
import { ModuleNameEnum } from "@datavalue/constant/enum";
import { DataValueListTable } from "@datavalue/list";

export default () => {
    return <RefineListView
        headerButtons={<></>}
    >
        <DataValueListTable module={ModuleNameEnum.Academic} nav={STUDENT_DATAVALUE_LIST} />
    </RefineListView>
};