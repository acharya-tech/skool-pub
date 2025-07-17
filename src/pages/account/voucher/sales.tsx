import { LANG_ACCOUNT } from "@common/constant";
import { RefineCreateView } from "@components/view/create";
import { useNav } from "@hooks/useNavlHook";
import { useTranslate } from "@hooks/useTranslate";
import { SalesEntryForm } from "@account/voucher/sales.form";

export default () => {
    const t = useTranslate(LANG_ACCOUNT, "entry");
    const { close } = useNav("list")
    const title = t("titles.sales");
    return (
        <RefineCreateView
            title={title}
            goBack={false}
            footerButtons={() => (
                <></>
            )}
            noCard
        >
            <SalesEntryForm action="create" onClose={close} />
        </RefineCreateView>
    );
};
