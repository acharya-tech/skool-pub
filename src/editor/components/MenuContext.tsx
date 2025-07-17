import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { IMenuContext } from "../interface";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTranslate } from "@hooks/useTranslate";
import { LANG_DATAVALUE } from "@common/constant";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { FaRegClone } from "react-icons/fa";
import { Edit } from "@mui/icons-material";

type MenuContextProps = {
    menuState: IMenuContext;
    setMenu: any;
}

export const MenuContext = ({ menuState, setMenu }: MenuContextProps) => {
    const t = useTranslate(LANG_DATAVALUE, "editor")
    return (
        <Menu
            open
            onClose={() => setMenu({ ...menuState, element: null })}
            anchorReference="anchorPosition"
            anchorPosition={
                menuState.position
                    ? { top: menuState.position?.y, left: menuState.position?.x }
                    : undefined
            }
        >
            <MenuItem
                onClick={() => {
                    setMenu((e: IMenuContext) => ({ ...e, action: "edit" }))
                }}
            >
                <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
                <ListItemText>{t("menu.edit")}</ListItemText>
            </MenuItem>
            <MenuItem
                onClick={() => {
                    setMenu((e: IMenuContext) => ({ ...e, action: "hide" }))
                }}
            >
                <ListItemIcon>{<VisibilityOffIcon fontSize="small" />}</ListItemIcon>
                <ListItemText>{t("menu.hide")}</ListItemText>
            </MenuItem>
            <MenuItem
                onClick={() => {
                    setMenu((e: IMenuContext) => ({ ...e, action: menuState.element?.locked ? "unlock" : "lock" }))
                }}
            >
                <ListItemIcon>{menuState.element?.locked ? <LockOpenIcon fontSize="small" /> : <LockIcon fontSize="small" />}</ListItemIcon>
                <ListItemText>{menuState.element?.locked ? t("menu.unlock") : t("menu.lock")}</ListItemText>
            </MenuItem>
            <MenuItem
                onClick={() => {
                    setMenu((e: IMenuContext) => ({ ...e, action: "clone" }))
                }}
            >
                <ListItemIcon><FaRegClone fontSize="small" /></ListItemIcon>
                <ListItemText>{t("menu.clone")}</ListItemText>
            </MenuItem>
            <MenuItem
                onClick={() => {
                    setMenu((e: IMenuContext) => ({ ...e, action: "top" }))
                }}
            >
                <ListItemIcon><FaArrowUp fontSize="small" /></ListItemIcon>
                <ListItemText>{t("menu.top")}</ListItemText>
            </MenuItem>
            <MenuItem
                onClick={() => {
                    setMenu((e: IMenuContext) => ({ ...e, action: "bottom" }))
                }}
            >
                <ListItemIcon><FaArrowDown fontSize="small" /></ListItemIcon>
                <ListItemText>{t("menu.bottom")}</ListItemText>
            </MenuItem>
            <MenuItem
                onClick={() => {
                    setMenu((e: IMenuContext) => ({ ...e, action: "delete" }))
                }}
            >
                <ListItemIcon>{<DeleteOutlineIcon color="error" fontSize="small" />}</ListItemIcon>
                <ListItemText>{t("menu.delete")}</ListItemText>
            </MenuItem>
        </Menu>

    )
}