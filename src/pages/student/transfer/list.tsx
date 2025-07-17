import { useTranslate } from "@hooks/useTranslate";
import { LANG_STUDENT } from "@common/constant";
import { Outlet } from "react-router-dom";
import { TransferForm } from "@student/transfer";
import { ClassBreadcrumbs } from "@components/other";
import { RefineDefaultListView } from "@components/view/default.list";

export default () => {
  const t = useTranslate(LANG_STUDENT, "transfer");
  return (
    <>
      <RefineDefaultListView
        title={t('transfer')}
        breadcrumb={<ClassBreadcrumbs />}
      >
        <TransferForm />
      </RefineDefaultListView>
      <Outlet />
    </>
  );
};