import { ATFormProps } from "src/interfaces";
import { TabbedPane } from "@components/tabbedPane/tabbed.pane";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_INVENTORY } from "@common/constant";
import { SingleBillingFrom } from "./_single.form";
import { MultiBillingForm } from "./_multi.form";
export const BillingForm = (props: ATFormProps) => {
    const t = useTranslate(LANG_INVENTORY, "billing");
    const tabs = [
        {
            label: t("titles.singleForm"),
            content: <SingleBillingFrom {...props} />,
        },
        {
            label: t("titles.multiForm"),
            content: <MultiBillingForm {...props} />
        }
    ];

    return <TabbedPane tabs={tabs} />;
};
