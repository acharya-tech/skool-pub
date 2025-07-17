import { useShow } from "@refinedev/core";
import { ILibPatron } from "../interface";
import {
  Box,
  Tab,
} from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_LIBRARY } from "@common/constant";
import { useState } from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import StudentDetails from "./component/studentdetail.view";
import { PatronDetailView } from "./component/patrondetail.view";
import { Checkouts } from "./component/checkouts";
import { Activities } from "./component/activities";
import { Fines } from "./component/fines";
import { LIBRARY_PATRON_URL } from "@library/constant";
import { useRefineShow } from "@hooks/useShow";

export const PatronView = () => {
  const t = useTranslate(LANG_LIBRARY, "patron");
  const [tabIndex, setTabIndex] = useState('1');
  const {
    query: { data },
  } = useRefineShow<ILibPatron>({
    resource: LIBRARY_PATRON_URL,
    meta: { customQuery: { patronType: true, user: true } },
  });
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };
  const record = data?.data;


  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      <Box sx={{ width: '25%' }}>
        <StudentDetails id={record?.student_id} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <TabContext value={tabIndex}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label={t('tabs.patronDetail')} value={"1"} />
              <Tab label={t('tabs.checkouts')} value={"2"} />
              <Tab label={t('tabs.activities')} value={"3"} />
              <Tab label={t('tabs.fine')} value={"4"} />
            </TabList>
          </Box>
          {/* Parents Information */}
          <TabPanel value="1" sx={{ py: 2, px: 1 }}>
            <PatronDetailView patron={record} />
          </TabPanel>
          <TabPanel value="2" sx={{ py: 2, px: 1 }}>
            <Checkouts patronId={record?.id} />
          </TabPanel>
          <TabPanel value="3" sx={{ py: 2, px: 1 }}>
            <Activities patronId={record?.id} />
          </TabPanel>
          <TabPanel value="4" sx={{ py: 2, px: 1 }}>
            <Fines patronId={record?.id} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};
