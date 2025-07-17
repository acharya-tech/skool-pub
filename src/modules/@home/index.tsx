import { useTranslate } from "@hooks/useTranslate";
import { Box, Grid2 as Grid, Link, ListItemIcon, Paper, Typography } from "@mui/material";
import { getMainResource } from "src/layouts/nav-config-main";
import { Link as RouterLink } from "react-router-dom";
import { useMainRoute } from "@hooks/useMainRoute";
import { useEffect, useState } from "react";

export const ApplicationHome = () => {
    const t = useTranslate()
    const updateRoute = useMainRoute((state: any) => state.updateRoute)
    const [mainRoute, setRoutes] = useState<any[]>([])
    useEffect(() => {
        getMainResource(t).then(setRoutes)
    }, [])
    return (
        <Box sx={{ p: 2 }}>
            <Grid container gap={2} spacing={2}>
                {mainRoute.map((e, i) => {
                    return <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Link component={RouterLink} key={i} to={e.name} onClick={() => updateRoute(e.name)}>
                            <Paper elevation={2} sx={{ p: 2 }}>
                                <Box alignItems={'center'} sx={{ p: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                                    <ListItemIcon sx={{ fontSize: 32, mr: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 } }}>
                                        {e.meta.icon}
                                    </ListItemIcon>
                                    <Typography>{e.meta.label.toUpperCase()}</Typography>
                                </Box>
                            </Paper>
                        </Link>
                    </Grid>
                })}
            </Grid>
        </Box>
    )
};