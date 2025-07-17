import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_BILLING } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { useState } from "react";
import { BILLING_FEE_RELEASE_LIST } from "@billing/constant";
import { CSSearch } from "@components/input";
import { FeeReleaseTable } from "@billing/feeRelease/list";
import { BsPersonCheck } from "react-icons/bs";
import { IconButton } from "@mui/material";
export default () => {
  const t = useTranslate(LANG_BILLING, "feeStudent");
  const { create, edit } = useNav(BILLING_FEE_RELEASE_LIST)
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
          <Button
            {...props.createButtonProps}
            variant="contained"
            color="inherit"
            key="multiple"
            onClick={() => edit("1")}
          >
            {t("actions.add")}
          </Button>,
          <IconButton
            color="info"
            key="single"
            size="medium"
            onClick={create}
          >
            <BsPersonCheck />
          </IconButton>,
        ]}
      >
        <FeeReleaseTable search={search} />
      </RefineListView>
    </>
  );
};