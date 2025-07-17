import { useNav } from "@hooks/useNavlHook";
import { IconButton } from "@mui/material";
import { LANG_LIBRARY } from "@common/constant";
import { RefineCreateView } from "@components/view/create";
import { useTranslate } from "@hooks/useTranslate";
import { BarcodeForm } from "@library/barcode";
import { MdArrowBack } from "react-icons/md";


export default () => {
	const { close } = useNav("list")
	const t = useTranslate(LANG_LIBRARY, "barcode");
	const title = t("actions.add");
	return (
	  <RefineCreateView
		title={title}
		goBack={<IconButton onClick={close}><MdArrowBack /></IconButton>}
		footerButtons={() => (
		  <></>
		)}
	  >
		<BarcodeForm
		  onClose={close}
		  action="create"
		/>
	  </RefineCreateView>
	);
  };