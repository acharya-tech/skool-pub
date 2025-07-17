import { Card, Grid2 as Grid, Typography, Box, CardHeader, Divider } from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_STUDENT } from "@common/constant";
import StudentDetails from "./component/studentdetail.view";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ParentView from "./component/parent.view";
import DocumentView from "./component/documents.view";
import AcademicView from "./component/academic.view";
import SiblingView from "./component/sibling.view";
import VehicleView from "./component/vehicle.view";
import ClassTimeline from "./component/timeline";
import StudentNotes from "./component/notes";
import { StudentCertificateList } from "./component/certificate.view";
import { PatronDetail } from "./component/patrindetail";
import { StudentResultList } from "./component/exam.view";
import { FeeLedger } from "@billing/feeReceive/components/fee.ledger";

export const StudentShow = () => {
    const t = useTranslate(LANG_STUDENT, "info");
    const { id } = useParams()
    const [tabIndex, setTabIndex] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabIndex(newValue);
    };
    return <>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Box sx={{ width: '25%' }}>
                <StudentDetails id={id} />
            </Box>
            <Box sx={{ flex: 1 }}>
                <TabContext value={tabIndex}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            <Tab label={t('tabs.studentInfo')} value={"1"} />
                            <Tab label={t('tabs.exams')} value={"2"} />
                            <Tab label={t('tabs.timeline')} value={"3"} />
                            <Tab label={t('tabs.accounts')} value={"4"} />
                            {/* <Tab label={t('tabs.leaveInfo')} value={"5"} /> */}
                            <Tab label={t('tabs.certificates')} value={"6"} />
                            <Tab label={t('tabs.libraryInfo')} value={"7"} />
                            <Tab label={t('tabs.notes')} value={"8"} />
                        </TabList>
                    </Box>
                    {/* Parents Information */}
                    <TabPanel value="1" sx={{ p: 0 }}>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <ParentView id={id} />
                            </Grid>
                            <Grid size={6}>
                                <SiblingView id={id} />
                            </Grid>
                            <Grid size={6}>
                                <DocumentView id={id} />
                            </Grid>
                            <Grid size={12}>
                                <AcademicView id={id} />
                            </Grid>
                            <Grid size={12}>
                                <Card sx={{ p: 2 }}>
                                    <CardHeader
                                        title={<Typography variant="h6" gutterBottom>{t('titles.vehicleInfo')}</Typography>}
                                        sx={{ p: 0 }}
                                    />
                                    <Divider sx={{ mb: 2 }} />
                                    <VehicleView id={id} />
                                </Card>
                            </Grid>

                        </Grid>
                    </TabPanel>
                    <TabPanel value="2" sx={{ p: 0 }}>
                        <StudentResultList student_id={id} />
                    </TabPanel>
                    <TabPanel value="3" sx={{ p: 0 }}>
                        <ClassTimeline id={id} />
                    </TabPanel>
                    <TabPanel value="4" sx={{ p: 0 }}>
                        <FeeLedger student_id={id} />
                    </TabPanel>
                    <TabPanel value="6" sx={{ p: 0 }}>
                        <StudentCertificateList student_id={id} />
                    </TabPanel>
                    <TabPanel value="7" sx={{ p: 0 }}>
                        <PatronDetail id={id} />
                    </TabPanel>
                    <TabPanel value="8" sx={{ p: 0 }}>
                        <StudentNotes id={id} />
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    </>
}