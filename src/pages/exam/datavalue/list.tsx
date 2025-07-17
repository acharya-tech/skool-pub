import { RefineListView } from "@components/index";
import { ModuleNameEnum } from "@datavalue/constant/enum";
import { DataValueListTable } from "@datavalue/list";
import { EXAM_DATAVALUE_NAME } from "@exam/constant/local.urls";

export default () => {
    return <RefineListView
        headerButtons={<></>}
    >
        <DataValueListTable module={ModuleNameEnum.Exam} nav={EXAM_DATAVALUE_NAME} />
    </RefineListView>
};