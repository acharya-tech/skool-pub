import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Stack, Box, Button, CardHeader, useTheme, Menu, MenuItem } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IRouteLocation } from '../../interface';
import { VEHICLE_ROUTE_LOCATION_URL } from '../../constant';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_VEHICLE } from '@common/constant';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useConfirmButton } from '@hooks/delete.confirm.hook';

type LocationCardProps = {
    routeLocation: IRouteLocation
    active?: IRouteLocation
    setActive: any
    setOpenAddLocation: any
}
export const LocationCard = ({ setOpenAddLocation, setActive, active, routeLocation }: LocationCardProps) => {
    const theme = useTheme()
    const t = useTranslate(LANG_VEHICLE, "routeLocation");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const [
        {
            setOpen,
            loading,
        },
        ConfirmDialog
    ] = useConfirmButton({
        resource: VEHICLE_ROUTE_LOCATION_URL,
        onSuccess: handleClose,
        onCancel: handleClose
    });

    return <>
        <Card variant="outlined" sx={{ mb: 1, borderRadius: 2 }}>
            <Box
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '10px',
                    backgroundColor: active?.id == routeLocation.id ? theme.palette.primary.main : '', // Blue color
                    borderRadius: '4px 0 0 4px' // Rounded edges on top-left and bottom-left
                }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: "10px", paddingBottom: "10px" }}>
                <Box onClick={() => setActive(routeLocation)} sx={{ cursor: 'pointer', flex: 1, marginLeft: "10px" }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{routeLocation.location.name}</Typography>
                    <Stack direction="row" gap={2} justifyContent={"flex-start"}>
                        <Box display={'flex'} mt={1}>
                            <AttachMoneyIcon fontSize="small" />
                            <Typography variant="body2">{routeLocation.price}</Typography>
                        </Box>
                        <Box display={'flex'} mt={1}>
                            <PersonIcon fontSize="small" />
                            <Typography variant="body2">{routeLocation.student_count}</Typography>
                        </Box>
                    </Stack>
                </Box>
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            setOpenAddLocation(routeLocation.id)
                            handleClose()
                        }}>
                        <Stack direction={'row'} gap={2}>
                            <EditOutlinedIcon fontSize="small" /><Typography>{t("@actions.edit")}</Typography>
                        </Stack>
                    </MenuItem>
                    <MenuItem
                        disabled={loading}
                        onClick={() => setOpen(routeLocation.id)}>
                        <Stack direction={'row'} gap={2}>
                            <DeleteOutlinedIcon color='error' fontSize="small" /><Typography>{t("@actions.delete")}</Typography>
                        </Stack>
                    </MenuItem>
                </Menu>
            </Box>
        </Card>
        {ConfirmDialog}
    </>
};