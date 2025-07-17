import { Breadcrumbs, Button, Grid2 as Grid, LinkProps, Menu, MenuItem, Typography } from "@mui/material";
import { matchResourceFromRoute, useBreadcrumb, useInvalidate, useLink, useResource, useRouterContext, useRouterType } from "@refinedev/core";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MLink from "@mui/material/Link";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import { STUDENT_CURRENT_LIST, STUDENT_PROGRAM_LIST, STUDENT_SUBJECT_LIST, STUDENT_SUBJECT_VIEW } from "@student/constant";
import { FaUsers } from "react-icons/fa";
import { getQueryParam } from "@utils/other";
import { LANG_STUDENT } from "@common/constant";
import { useTranslate } from "@hooks/useTranslate";
import { useStudentSubject } from "@hooks/useStudentSubject";
import { IClassSubject } from "@academic/interface";
import { useState } from "react";

export const StudentSubjectBreadcrumbs = () => {
    const t = useTranslate(LANG_STUDENT)
    const subject = useStudentSubject();

    const routerType = useRouterType();
    const NewLink = useLink();
    const { Link: LegacyLink } = useRouterContext();
    const ActiveLink = routerType === "legacy" ? LegacyLink : NewLink;
    const program = subject?.current?.class.program
    const neb = [
        {
            label: t("program.program"),
            href: STUDENT_PROGRAM_LIST,
            icon: <FaUsers />,
        },
        {
            label: `${program?.name}`,
            href: '/' + getQueryParam(STUDENT_CURRENT_LIST, {
                programid: program?.id
            }),
        },
        {
            label: t("subject.subject"),
            href: '/' + getQueryParam(STUDENT_SUBJECT_LIST, {
                programid: program?.id
            }),
        },
        {
            label: subject?.current?.subject.name,
            href: "#toclasssubject",
            icon: "",
        },
    ]

    const LinkRouter = (props: LinkProps & { to?: string }) => (
        <MLink {...props} component={ActiveLink} />
    );
    const invalidate = useInvalidate();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
        if (event) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                aria-labelledby="with-menu-demo-breadcrumbs"
            >
                {subject?.subjects?.map((e: IClassSubject) => {
                    const newroute = getQueryParam(STUDENT_SUBJECT_VIEW, {
                        programid: e.class.program.id,
                        classid: e.class.id,
                        id: e.id
                    });
                    return <LinkRouter
                        key={e.id}
                        to={'/' + newroute}
                        underline="hover"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "14px",
                        }}
                        color="inherit"
                        variant="subtitle1"
                        onClick={() => {
                            invalidate({
                                invalidates: ['all'],
                            });
                        }}
                        marginLeft={0.5}
                    >
                        <MenuItem onClick={handleClose}>
                            {e.subject.name}
                        </MenuItem>
                    </LinkRouter>
                })}
            </Menu>
            <Breadcrumbs
                aria-label="breadcrumb"
            >
                <LinkRouter
                    underline="hover"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                    color="inherit"
                    to="/"
                >
                    <HomeOutlined
                        sx={{
                            fontSize: "18px",
                        }}
                    />
                </LinkRouter>
                {neb.map(({ label, icon, href }) => {
                    if ("#toclasssubject" == href) {
                        return <Grid
                            key={label}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                "& .MuiSvgIcon-root": {
                                    fontSize: "16px",
                                },
                            }}
                        >
                            <Button variant="text" onClick={handleClick}><Typography fontSize="14px">{label}</Typography>&nbsp;<ExpandMoreIcon /></Button>
                        </Grid>
                    }
                    return (
                        <Grid
                            key={label}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                "& .MuiSvgIcon-root": {
                                    fontSize: "16px",
                                },
                            }}
                        >
                            {icon}
                            {href ? (
                                <LinkRouter
                                    underline="hover"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: "14px",
                                    }}
                                    color="inherit"
                                    to={href}
                                    variant="subtitle1"
                                    marginLeft={0.5}
                                >
                                    {label}
                                </LinkRouter>
                            ) : (
                                <Typography fontSize="14px">{label}</Typography>
                            )}
                        </Grid>
                    );
                })}
            </Breadcrumbs>
        </>
    );
}