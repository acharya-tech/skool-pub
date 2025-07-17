import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_STUDENT } from "@common/constant";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { CSSearch } from "@components/input";
import { ClassBreadcrumbs } from "@components/other";
import { CurrentListTable } from "@student/current";
import { BasicModal } from "@components/modal/basic.modal";
import { IStudentSearch } from "@student/interface";
import { FilterForm } from "@student/components/filter.form";
import { IconButton } from "@mui/material";
import { CiFilter } from "react-icons/ci";
import { initialSelect } from "../constant";

export default () => {
  const t = useTranslate(LANG_STUDENT, "info");
  const [search, setSearch] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [advanceSearch, setAdvanceSearch] = useState<IStudentSearch>({ select: initialSelect, filter: {} })
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
            onClick={() => setOpen(true)}
          ><CiFilter /></IconButton>,
        ]}
      >
        <CurrentListTable search={search} advanceFilter={advanceSearch} setLoading={setLoading} />
      </RefineListView>
      <BasicModal
        keepMounted={true}
        onClose={() => setOpen(false)} open={open} isLoading={isLoading} size={"lg"}>
        <FilterForm
          defaultValue={advanceSearch}
          setSearch={setAdvanceSearch}
          isLoading={isLoading}
          onClose={() => setOpen(false)} />
      </BasicModal>
      <Outlet />
    </>
  );
};