import { IconButton } from "@mui/material";
import { RefineShowView } from "@components/index";
import { useNav } from "@hooks/useNavlHook";
import { ACCOUNT_DATAVALUE_LIST } from "@account/constant/urls";
import { DataValueEditForm } from "@datavalue/update";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useSearchParams } from "react-router-dom";

export default () => {
    const { close } = useNav("list")
    const [searchParam] = useSearchParams()
    const template = searchParam.get("template")
    if (template) {
        return <DataValueEditForm template={true} action="edit" onClose={close} />
    }
    return (
        <RefineShowView
            goBack={<Link to={'/' + ACCOUNT_DATAVALUE_LIST}><IconButton><IoMdArrowBack /></IconButton></Link>}
            headerButtons={() => (
                <></>
            )}
            footerButtons={() => (
                <></>
            )}
        >
            <DataValueEditForm template={false} action="edit" onClose={close} />
        </RefineShowView>
    );
};
