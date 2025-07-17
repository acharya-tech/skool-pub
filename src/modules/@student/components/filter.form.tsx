import { useTranslate } from "@hooks/useTranslate";
import { Box, Tab } from "@mui/material";
import { IStudentFilter, IStudentSearch, IStudentSelection } from "../interface";
import { LANG_STUDENT } from "@common/constant";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { StudentFilterForm } from "./student.filter";
import { useState } from "react";
import { StudentFilterSelectionForm } from "./student.filter.selection";

type FilterFormProps = {
    setSearch: any
    onClose: () => void,
    isLoading: boolean
    defaultValue: IStudentSearch
}

export const FilterForm = ({ setSearch, defaultValue, isLoading, onClose }: FilterFormProps) => {
    const t = useTranslate(LANG_STUDENT, "info");
    const [tabIndex, setTabIndex] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabIndex(newValue);
    };

    return (
        <Box>
            <TabContext value={tabIndex}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        <Tab label={t('filter.tabs.filter')} value={"1"} />
                        <Tab label={t('filter.tabs.select')} value={"2"} />
                        {/* Add more tabs */}
                    </TabList>
                </Box>
                {/* Filter tab */}
                <TabPanel value="1" sx={{ p: 0, pt: 5 }}>
                    <StudentFilterForm
                        defaultValues={defaultValue.filter}
                        setFilter={(filter: IStudentFilter | undefined) => {
                            setSearch((p: IStudentSearch) => {
                                return {
                                    ...p,
                                    filter: { ...filter }
                                }
                            })
                        }}
                        isLoading={isLoading} onClose={onClose} />
                </TabPanel>
                <TabPanel value="2" sx={{ p: 0, pt: 5 }}>
                    <StudentFilterSelectionForm
                        defaultValues={defaultValue.select}
                        setSelect={(select: IStudentSelection | undefined) => {
                            setSearch((p: IStudentSearch) => {
                                return {
                                    ...p,
                                    select: { ...select, student_id: true, id: true }
                                }
                            })
                        }}
                        isLoading={isLoading} onClose={onClose} />
                </TabPanel>
            </TabContext>
        </Box>
    )
}