import { TableListProp } from "src/interfaces";
import { TabbedPane } from "@components/tabbedPane/tabbed.pane";
import { CheckInTab } from "./_check_in_tab";
import { CheckOutTab } from "./_check_out_tab";
// import { EBookTab } from "./_ebook_tab";
import { ReceiveFineTab } from "./_receive_fine_tab";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_LIBRARY } from "@common/constant";
export const CheckInOutView = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_LIBRARY, "checkInOut");
  const tabs = [
    {
      label: t("checkIn"),
      content: <CheckInTab />,
    },
    {
      label: t("checkOut"),
      content: <CheckOutTab />
    },
    {
      label: t("receiveFine"),
      content: <ReceiveFineTab />,
    },
    // {
    //   label: t("checkInOut.ebook"),
    //   content: <EBookTab/>,
    // },
  ];

  return <TabbedPane tabs={tabs} />;
};
