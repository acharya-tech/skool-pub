import { IconButton } from "@mui/material";
import { RefineShowView } from "@components/index";
import { useNav } from "@hooks/useNavlHook";
import { DataValueEditForm } from "@datavalue/update";
import { NOTICE_DATAVALUE_LIST } from "@notice/constant";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default () => {
    const { close } = useNav("list")
    return (
        <RefineShowView
            goBack={<Link to={'/' + NOTICE_DATAVALUE_LIST}><IconButton><IoMdArrowBack /></IconButton></Link>}
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
