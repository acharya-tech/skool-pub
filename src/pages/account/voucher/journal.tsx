import { LANG_ACCOUNT } from "@common/constant";
import { RefineCreateView } from "@components/view/create";
import { useNav } from "@hooks/useNavlHook";
import { useTranslate } from "@hooks/useTranslate";
import { JournalEntryForm } from "@account/voucher/journal.form";

export default () => {
    const t = useTranslate(LANG_ACCOUNT, "entry");
    const { close } = useNav("list")
    const title = t("titles.journal");
    return (
        <RefineCreateView
            title={title}
            goBack={false}
            footerButtons={() => (
                <></>
            )}
            noCard
        >
            <JournalEntryForm action="create" onClose={close} />
        </RefineCreateView>
    );
};
