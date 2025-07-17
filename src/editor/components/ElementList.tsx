import React from "react";
import {
  Box,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ReactSortable } from "react-sortablejs";
import { IItem, IMenuContext } from "../interface";
import { LiaElementor } from "react-icons/lia";
import { FaRegImages } from "react-icons/fa6";
import { CiText, CiViewTable } from "react-icons/ci";
import { PiLegoLight } from "react-icons/pi";
import { TfiLayoutLineSolid } from "react-icons/tfi";

type ElementListProps = {
  itemList: IItem[];
  setMenu: React.Dispatch<React.SetStateAction<IMenuContext>>;
  menuState: IMenuContext;
  onReorder: React.Dispatch<React.SetStateAction<IItem[]>>;
};

export const ElementList = ({
  itemList,
  onReorder,
  setMenu,
  menuState,
}: ElementListProps) => {
  const theme = useTheme();

  let clickTimeout: NodeJS.Timeout | null = null;

  const handleClick = (el: IItem) => {
    clickTimeout = setTimeout(() => {
      setMenu((prev: IMenuContext) => ({ ...prev, element: el }));
    }, 300);
  };

  const handleDoubleClick = (el: IItem) => {
    if (clickTimeout) clearTimeout(clickTimeout);
    setMenu((prev: IMenuContext) => ({ ...prev, element: el }));
  };

  return (
    <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 400px)" }}>
      <ReactSortable
        list={itemList}
        setList={(newList) => onReorder([...newList])}
      >
        {itemList.map((el, index) => {
          const isSelected = el.id === menuState.element?.id;

          return (
            <ListItem
              key={`${el.id}-${index}`}
              sx={{
                backgroundColor: isSelected
                  ? theme.palette.primary.light
                  : "#eee",
                py: 0,
                my: 0.5,
                cursor: "pointer",
              }}
              onClick={() => handleClick(el)}
              onDoubleClick={() => handleDoubleClick(el)}
            >
              <ListItemIcon sx={{ pr: 1, minWidth: 0 }}>
                {el.category === "filler" ? (
                  <PiLegoLight />
                ) : el.type === "text" ? (
                  <CiText />
                ) : el.type === "image" ? (
                  <FaRegImages />
                ) : el.type === "editor" ? (
                  <LiaElementor fontSize={20} />
                ) : el.type === "subjectTable" || el.type === "ledgerTable" ? (
                  <CiViewTable fontSize={20} />
                ) : el.type === "line" ? (
                  <TfiLayoutLineSolid />
                ) : (
                  <Box sx={{ width: 20, height: 20, bgcolor: "gray" }} />
                )}
              </ListItemIcon>
              <ListItemText
                sx={{
                  cursor: "grab",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
                primary={`${el.name}`}
              />
              <Box>
                <IconButton
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenu((prev: IMenuContext) => ({
                      ...prev,
                      action: el.hidden ? "show" : "hide",
                      element: el,
                    }));
                  }}
                >
                  {el.hidden ? (
                    <VisibilityOffIcon fontSize="small" />
                  ) : (
                    <VisibilityIcon fontSize="small" />
                  )}
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenu((prev: IMenuContext) => ({
                      ...prev,
                      action: el.locked ? "unlock" : "lock",
                      element: el,
                    }));
                  }}
                >
                  {el.locked ? (
                    <LockIcon fontSize="small" />
                  ) : (
                    <LockOpenIcon fontSize="small" />
                  )}
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenu((prev: IMenuContext) => ({
                      ...prev,
                      action: "delete",
                      element: el,
                    }));
                  }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Box>
            </ListItem>
          );
        })}
      </ReactSortable>
    </Box>
  );
};
