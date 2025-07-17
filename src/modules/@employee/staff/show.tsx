import { Grid2 as Grid, Box } from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_EMPLOYEE } from "@common/constant";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StaffDetails from "./component/staffdetail.view";
import StudentView from "./component/student.view";
import DocumentView from "./component/documents.view";
import StaffView from "./component/staff.view";
import GroupView from "./component/groups.view";
import BankPayroll from "./component/bankpayroll.view";
import { PatronDetail } from "./component/patrindetail";
import EmployeeNotes from "./component/notes";
import { TeacherClassSchedule } from "./component/teacher.class.schedule";

export const StaffInfoView = () => {
    const t = useTranslate(LANG_EMPLOYEE, "staff");
    const { id } = useParams()
    const [tabIndex, setTabIndex] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabIndex(newValue);
    };
    return <>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Box sx={{ width: '25%' }}>
                <StaffDetails id={id} />
            </Box>
            <Box sx={{ flex: 1 }}>
                <TabContext value={tabIndex}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            <Tab label={t('tabs.staffInfo')} value={"1"} />
                            {/* <Tab label={t('tabs.exams')} value={"2"} /> */}
                            <Tab label={t('tabs.periodSchedule')} value={"3"} />
                            {/* <Tab label={t('tabs.accounts')} value={"4"} />
                            <Tab label={t('tabs.leaveInfo')} value={"5"} /> */}
                            {/* <Tab label={t('tabs.certificates')} value={"6"} /> */}
                            <Tab label={t('tabs.libraryInfo')} value={"7"} />
                            <Tab label={t('tabs.notes')} value={"8"} />
                        </TabList>
                    </Box>
                    {/* Parents Information */}
                    <TabPanel value="1" sx={{ p: 0 }}>
                        <Grid container spacing={2}>
                            {/* <Grid size={12}>
                                <ParentView id={id} />
                            </Grid> */}
                            <Grid size={6}>
                                <DocumentView id={id} />
                            </Grid>
                            <Grid size={6}>
                                <StudentView id={id} />
                            </Grid>
                            <Grid size={6}>
                                <StaffView id={id} />
                            </Grid>
                            <Grid size={6}>
                                <GroupView id={id} />
                            </Grid>
                            <Grid size={6}>
                                <BankPayroll id={id} />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    {/* <TabPanel value="2" sx={{ p: 0 }}>Item Two</TabPanel> */}
                    <TabPanel value="7" sx={{ p: 0 }}>
                        <PatronDetail id={id} />
                    </TabPanel>
                    <TabPanel value="3" sx={{ p: 0 }}>
                        <TeacherClassSchedule id={id} />
                    </TabPanel>
                    <TabPanel value="8" sx={{ p: 0 }}>
                        <EmployeeNotes id={id} />
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    </>
}