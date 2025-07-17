import { LANG_ACCOUNT } from "@common/constant";
import { RefineCreateView } from "@components/view/create";
import { useNav } from "@hooks/useNavlHook";
import { useTranslate } from "@hooks/useTranslate";
import { ContraEntryForm } from "@account/voucher/contra.form";

export default () => {
    const t = useTranslate(LANG_ACCOUNT, "entry");
    const { close } = useNav("list")
    const title = t("titles.contra");
    return (
        <RefineCreateView
            title={title}
            goBack={false}
            footerButtons={() => (
                <></>
            )}
            noCard
        >
            <ContraEntryForm action="create" onClose={close} />
        </RefineCreateView>
    );
};
