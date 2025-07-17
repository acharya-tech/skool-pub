import { Autocomplete, Box, Button, Checkbox, Chip, FormControlLabel, Stack, TextField, Typography } from "@mui/material"
import { INoticeAudienceTemp, NoticePreconditionListTypes, NoticePreconditionTypes } from "../interface";
import { TabbedPane } from "@components/tabbedPane/tabbed.pane";
import { LANG_NOTICE } from "@common/constant";
import { useTranslate } from "@hooks/useTranslate";
import { useState } from "react";
import { useAutocomplete } from "@refinedev/mui";
import { IParent, IStudentInfo } from "@student/interface";
import { STUDENT_INFO_URL, STUDENT_PARENT_LIST } from "@student/constant";
import { YesNoEnum } from "@common/all.enum";
import { NoticeUserTypeEnum } from "../constant/enum";
import { ACADEMIC_CLASS_LIST } from "@academic/constant/urls";
import { IClass } from "@academic/interface";
import { IEmpGroup, IStaff } from "@employee/interface";
import { EMPLOYEE_GROUP_LIST, EMPLOYEE_STAFF_LIST } from "@employee/constant";
import { Divider } from "@mui/material";

type AudianceFilterProps = {
    audiances: INoticeAudienceTemp[]
    setAudiance: (audiance: INoticeAudienceTemp[], preconditions: NoticePreconditionListTypes) => void
    initialPrecondition: NoticePreconditionListTypes
    handleDeleteAudiance: (uid: string) => void
}
export const AudianceFilter = ({ setAudiance, initialPrecondition, audiances, handleDeleteAudiance }: AudianceFilterProps) => {
    const t = useTranslate(LANG_NOTICE, "sms");
    const [students, setStudents] = useState<IStudentInfo[]>([]);
    const [preconditions, setPrecondition] = useState<NoticePreconditionListTypes>(initialPrecondition);
    const [classes, setClasses] = useState<IClass[]>([]);
    const [staffGroup, setStaffGroup] = useState<IEmpGroup[]>([]);
    const [staffs, setStaff] = useState<IStaff[]>([]);
    const [parents, setParents] = useState<IParent[]>([]);

    const setClassPc = (precondition: NoticePreconditionListTypes) => {
        setPrecondition((pre: any) => {
            return {
                ...pre,
                [NoticeUserTypeEnum.Class]: precondition
            }
        })
    }

    const setStdPc = (precondition: NoticePreconditionListTypes) => {
        setPrecondition((pre: any) => {
            return {
                ...pre,
                [NoticeUserTypeEnum.Student]: precondition
            }
        })
    }

    const setStaffGroupPc = (precondition: NoticePreconditionListTypes) => {
        setPrecondition((pre: any) => {
            return {
                ...pre,
                [NoticeUserTypeEnum.StaffGroup]: precondition
            }
        })
    }

    const setStaffPc = (precondition: NoticePreconditionListTypes) => {
        setPrecondition((pre: any) => {
            return {
                ...pre,
                [NoticeUserTypeEnum.Staff]: precondition
            }
        })
    }

    const setParentPc = (precondition: NoticePreconditionListTypes) => {
        setPrecondition((pre: any) => {
            return {
                ...pre,
                [NoticeUserTypeEnum.Parent]: precondition
            }
        })
    }

    const tabs = [
        {
            label: t("tabs.class"),
            content: <ClassTab
                selected={classes}
                setSelected={setClasses}
                setPc={setClassPc}
                precondition={preconditions[NoticeUserTypeEnum.Class]}
                audiances={audiances.filter((a) => a.group === NoticeUserTypeEnum.Class)}
                handleDeleteAudiance={handleDeleteAudiance}
            />,
        },
        {
            label: t("tabs.student"),
            content: <StudentTab
                selected={students}
                setSelected={setStudents}
                setPc={setStdPc}
                precondition={preconditions[NoticeUserTypeEnum.Student]}
                audiances={audiances.filter((a) => a.group === NoticeUserTypeEnum.Student)}
                handleDeleteAudiance={handleDeleteAudiance}
            />,
        },
        {
            label: t("tabs.staffGroup"),
            content: <StaffGroupTab
                selected={staffGroup}
                setSelected={setStaffGroup}
                setPc={setStaffGroupPc}
                precondition={preconditions[NoticeUserTypeEnum.StaffGroup]}
                audiances={audiances.filter((a) => a.group === NoticeUserTypeEnum.StaffGroup)}
                handleDeleteAudiance={handleDeleteAudiance}
            />,
        },
        {
            label: t("tabs.staff"),
            content: <StaffTab
                selected={staffs}
                setSelected={setStaff}
                setPc={setStaffPc}
                precondition={preconditions[NoticeUserTypeEnum.Staff]}
                audiances={audiances.filter((a) => a.group === NoticeUserTypeEnum.Staff)}
                handleDeleteAudiance={handleDeleteAudiance}
            />,
        },
        {
            label: t("tabs.parent"),
            content: <ParentTab
                selected={parents}
                setSelected={setParents}
                setPc={setParentPc}
                precondition={preconditions[NoticeUserTypeEnum.Parent]}
                audiances={audiances.filter((a) => a.group === NoticeUserTypeEnum.Parent)}
                handleDeleteAudiance={handleDeleteAudiance}
            />,
        }
    ]
    const handleClickAdd = () => {
        let newAudiance: INoticeAudienceTemp[] = [];
        addAudiance(newAudiance, students, preconditions, NoticeUserTypeEnum.Student);
        addAudiance(newAudiance, classes, preconditions, NoticeUserTypeEnum.Class);
        addAudiance(newAudiance, staffGroup, preconditions, NoticeUserTypeEnum.StaffGroup);
        addAudiance(newAudiance, staffs, preconditions, NoticeUserTypeEnum.Staff);
        addAudiance(newAudiance, parents, preconditions, NoticeUserTypeEnum.Parent);

        setAudiance(newAudiance, preconditions);
        setStudents([]);
        setClasses([]);
        setStaffGroup([]);
        setStaff([]);
        setParents([]);
    }
    return <Box height={500}>
        <TabbedPane tabs={tabs} />
        <Box sx={{ p: 2 }}>
            <Button
                variant="contained"
                onClick={handleClickAdd}
            >
                {t("actions.addAudiance")}
            </Button>
        </Box>
    </Box>

};
type FilterProps = {
    setPc: any
    precondition: NoticePreconditionTypes
    setSelected: any
    selected: any[]
    audiances: INoticeAudienceTemp[]
    handleDeleteAudiance: (uid: string) => void
}
const StudentTab = ({ selected, setSelected, setPc, precondition, audiances, handleDeleteAudiance }: FilterProps) => {
    const t = useTranslate(LANG_NOTICE, "sms");
    const { autocompleteProps: studentAutoProps } = useAutocomplete<IStudentInfo>({
        resource: STUDENT_INFO_URL,
        meta: {
            customQuery: {
                class: true
            }
        },
        onSearch: (value: string) => {
            return [
                {
                    field: "full_name",
                    operator: "eq",
                    value,
                },
                {
                    field: "regid",
                    operator: "eq",
                    value,
                },
            ];
        },
    });
    return <Box>
        <Autocomplete
            fullWidth
            {...studentAutoProps}
            getOptionLabel={(option) => `${option.class?.name} | ${option.regid} | ${option.full_name}`}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {`${option.class?.name} | ${option.regid} | ${option.full_name}`}
                </li>
            )}
            size="small"
            multiple
            value={selected}
            onChange={(_, value) => {
                setSelected((pre: IStudentInfo[]) => {
                    return [...value];
                });
            }}
            getOptionDisabled={(option) => selected.includes(option)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={t("labels.student")}
                />
            )}
        />
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
            <FormControlLabel
                label={t("labels.markAll")}
                control={
                    <Checkbox
                        checked={precondition.markAll === YesNoEnum.Yes}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPc({
                                ...precondition,
                                markAll: event.target.checked ? YesNoEnum.Yes : YesNoEnum.No
                            })
                        }}
                    />
                }
            />
            <FormControlLabel
                label={t("labels.students")}
                control={
                    <Checkbox
                        checked={precondition.students === YesNoEnum.Yes}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPc({
                                ...precondition,
                                students: event.target.checked ? YesNoEnum.Yes : YesNoEnum.No
                            })
                        }}
                    />
                }
            />
            <FormControlLabel
                label={t("labels.parents")}
                control={
                    <Checkbox
                        checked={precondition.parents === YesNoEnum.Yes}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPc({
                                ...precondition,
                                parents: event.target.checked ? YesNoEnum.Yes : YesNoEnum.No
                            })
                        }}
                    />
                }
            />
        </Stack>
        <Typography variant="h6">{t("titles.audiance")}</Typography>
        <Divider sx={{ my: 2 }} />
        <Box gap={5} minHeight={100}>
            {audiances.map((item) => {
                return (<Chip onDelete={() => handleDeleteAudiance(item.uid)} key={item.uid} sx={{ m: 0.4 }} label={`${item.name}`} />)
            })}
        </Box>
    </Box>
}

const ClassTab = ({ selected, setSelected, setPc, precondition, audiances, handleDeleteAudiance }: FilterProps) => {
    const t = useTranslate(LANG_NOTICE, "sms");
    const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
        resource: ACADEMIC_CLASS_LIST,
        onSearch: (value: string) => {
            return [
                {
                    field: "name",
                    operator: "eq",
                    value,
                },
            ];
        },
    });
    return <Box>
        <Autocomplete
            fullWidth
            {...classAutoProps}
            getOptionLabel={(option) => `${option.name}`}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {`${option.name}`}
                </li>
            )}
            size="small"
            multiple
            value={selected}
            onChange={(_, value) => {
                setSelected((pre: IClass[]) => {
                    return [...value];
                });
            }}
            getOptionDisabled={(option) => selected.includes(option)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={t("labels.class")}
                />
            )}
        />
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
            <FormControlLabel
                label={t("labels.markAll")}
                control={
                    <Checkbox
                        checked={precondition.markAll === YesNoEnum.Yes}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPc({
                                ...precondition,
                                markAll: event.target.checked ? YesNoEnum.Yes : YesNoEnum.No
                            })
                        }}
                    />
                }
            />
            <FormControlLabel
                label={t("labels.students")}
                control={
                    <Checkbox
                        checked={precondition.students === YesNoEnum.Yes}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPc({
                                ...precondition,
                                students: event.target.checked ? YesNoEnum.Yes : YesNoEnum.No
                            })
                        }}
                    />
                }
            />
            <FormControlLabel
                label={t("labels.parents")}
                control={
                    <Checkbox
                        checked={precondition.parents === YesNoEnum.Yes}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPc({
                                ...precondition,
                                parents: event.target.checked ? YesNoEnum.Yes : YesNoEnum.No
                            })
                        }}
                    />
                }
            />
        </Stack>
        <Typography variant="h6">{t("titles.audiance")}</Typography>
        <Divider sx={{ my: 2 }} />
        <Box gap={5} minHeight={100}>
            {audiances.map((item) => {
                return (<Chip onDelete={() => handleDeleteAudiance(item.uid)} key={item.uid} sx={{ m: 0.4 }} label={`${item.name}`} />)
            })}
        </Box>
    </Box>
}

const StaffGroupTab = ({ selected, setSelected, setPc, precondition, audiances, handleDeleteAudiance }: FilterProps) => {
    const t = useTranslate(LANG_NOTICE, "sms");
    const { autocompleteProps: groupAutoProps } = useAutocomplete<IEmpGroup>({
        resource: EMPLOYEE_GROUP_LIST,
        onSearch: (value: string) => {
            return [
                {
                    field: "name",
                    operator: "eq",
                    value,
                },
            ];
        },
    });
    return <Box>
        <Autocomplete
            fullWidth
            {...groupAutoProps}
            getOptionLabel={(option) => `${option.name}`}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {`${option.name}`}
                </li>
            )}
            size="small"
            multiple
            value={selected}
            onChange={(_, value) => {
                setSelected((pre: IEmpGroup[]) => {
                    return [...value];
                });
            }}
            getOptionDisabled={(option) => selected.includes(option)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={t("labels.staffgroup")}
                />
            )}
        />
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
            <FormControlLabel
                label={t("labels.markAll")}
                control={
                    <Checkbox
                        checked={precondition.markAll === YesNoEnum.Yes}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPc({
                                ...precondition,
                                markAll: event.target.checked ? YesNoEnum.Yes : YesNoEnum.No
                            })
                        }}
                    />
                }
            />
        </Stack>
        <Typography variant="h6">{t("titles.audiance")}</Typography>
        <Divider sx={{ my: 2 }} />
        <Box gap={5} minHeight={100}>
            {audiances.map((item) => {
                return (<Chip onDelete={() => handleDeleteAudiance(item.uid)} key={item.uid} sx={{ m: 0.4 }} label={`${item.name}`} />)
            })}
        </Box>
    </Box>
}

const StaffTab = ({ selected, setSelected, setPc, precondition, audiances, handleDeleteAudiance }: FilterProps) => {
    const t = useTranslate(LANG_NOTICE, "sms");
    const { autocompleteProps: staffAutoProps } = useAutocomplete<IStaff>({
        resource: EMPLOYEE_STAFF_LIST,
        onSearch: (value: string) => {
            return [
                {
                    field: "name",
                    operator: "eq",
                    value,
                },
            ];
        },
    });
    return <Box>
        <Autocomplete
            fullWidth
            {...staffAutoProps}
            getOptionLabel={(option) => `${option.emp_code} | ${option.name}`}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {`${option.emp_code} | ${option.name}`}
                </li>
            )}
            size="small"
            multiple
            value={selected}
            onChange={(_, value) => {
                setSelected((pre: IStaff[]) => {
                    return [...value];
                });
            }}
            getOptionDisabled={(option) => selected.includes(option)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={t("labels.staff")}
                />
            )}
        />
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
            <FormControlLabel
                label={t("labels.markAll")}
                control={
                    <Checkbox
                        checked={precondition.markAll === YesNoEnum.Yes}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPc({
                                ...precondition,
                                markAll: event.target.checked ? YesNoEnum.Yes : YesNoEnum.No
                            })
                        }}
                    />
                }
            />
        </Stack>
        <Typography variant="h6">{t("titles.audiance")}</Typography>
        <Divider sx={{ my: 2 }} />
        <Box gap={5} minHeight={100}>
            {audiances.map((item) => {
                return (<Chip onDelete={() => handleDeleteAudiance(item.uid)} key={item.uid} sx={{ m: 0.4 }} label={`${item.name}`} />)
            })}
        </Box>
    </Box>
}

const ParentTab = ({ selected, setSelected, setPc, precondition, audiances, handleDeleteAudiance }: FilterProps) => {
    const t = useTranslate(LANG_NOTICE, "sms");
    const { autocompleteProps: parentAutoProps } = useAutocomplete<IParent>({
        resource: STUDENT_PARENT_LIST,
        onSearch: (value: string) => {
            return [
                {
                    field: "name",
                    operator: "eq",
                    value,
                },
            ];
        },
    });
    return <Box>
        <Autocomplete
            fullWidth
            {...parentAutoProps}
            getOptionLabel={(option) => `${option.name}`}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {`${option.name}`}
                </li>
            )}
            size="small"
            multiple
            value={selected}
            onChange={(_, value) => {
                setSelected((pre: IParent[]) => {
                    return [...value];
                });
            }}
            getOptionDisabled={(option) => selected.includes(option)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={t("labels.parent")}
                />
            )}
        />
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
            <FormControlLabel
                label={t("labels.markAll")}
                control={
                    <Checkbox
                        checked={precondition.markAll === YesNoEnum.Yes}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPc({
                                ...precondition,
                                markAll: event.target.checked ? YesNoEnum.Yes : YesNoEnum.No
                            })
                        }}
                    />
                }
            />
        </Stack>
        <Typography variant="h6">{t("titles.audiance")}</Typography>
        <Divider sx={{ my: 2 }} />
        <Box gap={5} minHeight={100}>
            {audiances.map((item) => {
                return (<Chip onDelete={() => handleDeleteAudiance(item.uid)} key={item.uid} sx={{ m: 0.4 }} label={`${item.name}`} />)
            })}
        </Box>
    </Box>
}

function addAudiance(audianceList: INoticeAudienceTemp[], audiance: any[], precondition: any, userType: NoticeUserTypeEnum) {
    if (precondition[userType].markAll === YesNoEnum.Yes) {
        audianceList.push({
            group: userType,
            uid: `${userType}_all`,
            name: "All",
            id: "all",
            audiance: []
        });
    } else {
        audiance.forEach((audiance) => {
            let name = ""
            if (NoticeUserTypeEnum.Student === userType) {
                name = `${audiance.class?.name} | ${audiance.regid} | ${audiance.full_name}`
            } else if (NoticeUserTypeEnum.Staff === userType) {
                name = `${audiance.emp_code} | ${audiance.name}`
            } else {
                name = `${audiance.name}`
            }
            audianceList.push({
                name: name,
                uid: `${userType}_${audiance.id}`,
                group: userType,
                id: audiance.id,
                audiance: audiance
            });
        })
    }
}