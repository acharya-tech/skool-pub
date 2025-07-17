import { Breadcrumbs, Button, Grid2 as Grid, LinkProps, Menu, MenuItem, Typography } from "@mui/material";
import { useInvalidate, useLink, useRouterContext, useRouterType } from "@refinedev/core";
import MLink from "@mui/material/Link";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useXmSubject } from "@hooks/useXmSubject";
import { getQueryParam } from "@utils/other";
import { EXAM_ROUTINE_LIST, EXAM_ROUTINE_SUBJECT_VIEW, EXAM_ROUTINE_VIEW } from "@exam/constant/local.urls";
import { IExmSubject } from "@exam/interface";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_EXAM } from "@common/constant";

export const XmSubjectBreadcrumbs = () => {
    const t = useTranslate(LANG_EXAM);
    const subjects = useXmSubject()
    const routerType = useRouterType();
    const NewLink = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : NewLink;
    const invalidate = useInvalidate();
    const currentSubject = subjects?.current;
    const neb = [
        {
            label: t("routine.routine"),
            href: '/' + EXAM_ROUTINE_LIST
        },
        {
            label: currentSubject?.routine?.code,
            href: '/' + getQueryParam(EXAM_ROUTINE_VIEW, {
                id: currentSubject?.routine_id
            }),
        },
        {
            label: currentSubject?.subject_name,
            href: "#toxmsubject",
            icon: "",
        },
    ]

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
    const LinkRouter = (props: LinkProps & { to?: string }) => (
        <MLink {...props} component={ActiveLink} />
    );
    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                aria-labelledby="with-menu-demo-breadcrumbs"
            >
                {subjects?.subjects?.map((e: IExmSubject) => {
                    const newroute = getQueryParam(EXAM_ROUTINE_SUBJECT_VIEW, {
                        subjectid: e.id,
                        id: e.routine_id
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
                            {e.subject_name}
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
                    if ("#toxmsubject" == href) {
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