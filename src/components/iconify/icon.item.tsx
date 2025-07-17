import { styled } from "@mui/material";
import { navItemStyles } from "../nav-section";

export const CreateStyle = styled('span')(() => ({
    ...navItemStyles.icon,
    width: 'var(--nav-icon-size)',
    height: 'var(--nav-icon-size)',
    margin: 'var(--nav-icon-margin)',
}));