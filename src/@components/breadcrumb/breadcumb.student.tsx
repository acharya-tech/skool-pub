import { Breadcrumbs, Button, Grid2 as Grid, LinkProps, Menu, MenuItem, Typography } from "@mui/material";
import { matchResourceFromRoute, useBreadcrumb, useInvalidate, useLink, useResource, useRouterContext, useRouterType } from "@refinedev/core";
import { useClassProgram } from "@hooks/useClassProgram";
import { useLocation } from "react-router-dom";
import MLink from "@mui/material/Link";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { STUDENT_CURRENT_LIST, STUDENT_PROGRAM_LIST } from "@student/constant";
import { FaUsers } from "react-icons/fa";
import { getQueryParam } from "@utils/other";
import { LANG_STUDENT } from "@common/constant";
import { useTranslate } from "@hooks/useTranslate";

export const StudentBreadcrumbs = ({ label }: { label?: string }) => {
    const t = useTranslate(LANG_STUDENT)
    const programs = useClassProgram();
    const routerType = useRouterType();
    const NewLink = useLink();
    const { Link: LegacyLink } = useRouterContext();
    const { resources } = useResource();

    const rootRouteResource = matchResourceFromRoute("/", resources);

    const ActiveLink = routerType === "legacy" ? LegacyLink : NewLink;
    const program = programs?.current;
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
            label: label ?? t('info.student'),
        },
    ]

    const LinkRouter = (props: LinkProps & { to?: string }) => (
        <MLink {...props} component={ActiveLink} />
    );
    return (
        <>
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
                    {rootRouteResource?.resource?.meta?.icon ?? (
                        <HomeOutlined
                            sx={{
                                fontSize: "18px",
                            }}
                        />
                    )}
                </LinkRouter>
                {neb.map(({ label, icon, href }) => {
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