import { Breadcrumbs, Button, Grid2 as Grid, LinkProps, Menu, MenuItem, Typography } from "@mui/material";
import { matchResourceFromRoute, useBreadcrumb, useInvalidate, useLink, useResource, useRouterContext, useRouterType } from "@refinedev/core";
import { useClassProgram } from "@hooks/useClassProgram";
import { useLocation } from "react-router-dom";
import MLink from "@mui/material/Link";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ClassBreadcrumbs = () => {
    const programs = useClassProgram()
    const { breadcrumbs } = useBreadcrumb();

    const routerType = useRouterType();
    const NewLink = useLink();
    const { Link: LegacyLink } = useRouterContext();
    const { resources } = useResource();

    const rootRouteResource = matchResourceFromRoute("/", resources);

    const ActiveLink = routerType === "legacy" ? LegacyLink : NewLink;
    const resource = useLocation();
    const invalidate = useInvalidate();

    const program = programs?.current;
    const programList = [{
        id: 'all',
        name: 'All'
    }, ...(programs?.programs ?? [])]
    const firstPart = breadcrumbs.slice(0, 1); // From index 0 to splitIndex (not including splitIndex)
    const secondPart = breadcrumbs.slice(1);
    const neb = [
        ...firstPart,
        {
            label: program?.name,
            href: "#toprogram",
            icon: "",
        },
        ...secondPart
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
                {programList.map((e: any) => {
                    const newroute = resource.pathname.replace(/(\/student\/c\/)[^\/]+/, `/student/c/${e?.id}`);
                    return <LinkRouter
                        key={e.id}
                        to={newroute}
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
                            {e.name}
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
                    {rootRouteResource?.resource?.meta?.icon ?? (
                        <HomeOutlined
                            sx={{
                                fontSize: "18px",
                            }}
                        />
                    )}
                </LinkRouter>
                {neb.map(({ label, icon, href }) => {
                    if ("#toprogram" == href) {
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