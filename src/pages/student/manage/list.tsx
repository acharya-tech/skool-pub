import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_STUDENT } from "@common/constant";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { CSSearch } from "@components/input";
import { ClassBreadcrumbs } from "@components/other";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BasicModal } from "@components/modal/basic.modal";
import { IStudentSearch } from "@student/interface";
import { FilterForm } from "@student/components/filter.form";
import { Alert, Button, IconButton, Typography } from "@mui/material";
import { CiFilter } from "react-icons/ci";
import { ManageListTable } from "@student/manage";
import { ManageForm } from "@student/manage/_form";
import { initialSelect } from "../constant";
import { StudentStateEnum } from "@student/constant";

export default () => {
  const t = useTranslate(LANG_STUDENT, "manage");
  const [search, setSearch] = useState<string>("")
  const [students, setStudent] = useState<string[]>([])
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [openManage, setOpenManage] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [advanceSearch, setAdvanceSearch] = useState<IStudentSearch>({ select: { ...initialSelect, st: true }, filter: { state: [StudentStateEnum.Current, StudentStateEnum.Dropout, StudentStateEnum.Alumni] } })
  return (
    <>
      <RefineListView
        breadcrumb={<ClassBreadcrumbs />}
        headerButtons={(props) => [
          <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
          <IconButton
            color="secondary"
            key="filter"
            sx={{ borderRadius: 1 }}
            onClick={() => setOpenFilter(true)}
          ><CiFilter /></IconButton>,
          <Button
            color="info"
            variant="contained"
            disabled={students.length === 0}
            key="manage"
            startIcon={<MdOutlineManageAccounts />}
            sx={{ borderRadius: 1 }}
            onClick={() => setOpenManage(true)}
          >{t('manage')}</Button>,
        ]}
      >
        <ManageListTable setStudent={setStudent} search={search} advanceFilter={advanceSearch} setLoading={setLoading} />
        <Alert severity="info"><Typography>{t('@labels.note')}{" : "}{t('message.requiredStudent')}</Typography></Alert>
      </RefineListView>
      <BasicModal
        keepMounted={true}
        onClose={() => setOpenManage(false)} open={openManage} isLoading={isLoading}>
        <ManageForm
          students={students}
          onClose={() => setOpenManage(false)} />
      </BasicModal>
      <BasicModal
        keepMounted={true}
        onClose={() => setOpenFilter(false)} open={openFilter} isLoading={isLoading} size={"lg"}>
        <FilterForm
          defaultValue={advanceSearch}
          setSearch={setAdvanceSearch}
          isLoading={isLoading}
          onClose={() => setOpenFilter(false)} />
      </BasicModal>
      <Outlet />
    </>
  );
};