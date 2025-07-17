import { ListItemIcon, ListItemText, Menu, MenuItem, styled } from "@mui/material";
import { IRepoCollection } from "../interface";
import { DeleteOutline, MoveToInbox, Share } from "@mui/icons-material";
import { BiRename } from "react-icons/bi";
import { GiEyeTarget } from "react-icons/gi";
import { FaTrashRestore } from "react-icons/fa";
import { CollectionAccess, CollectionType } from "../constant/enum";
import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_REPO } from "@common/constant";
import { copyToClipboard, downloadFile } from "@utils/other";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";


type MenuListProps = {
  collection: IRepoCollection;
  action: (action: any) => void
  confirmDelete?: (collection: IRepoCollection) => void
  anEle: { top: number; left: number };
  onClose: () => void;
};


export const MenuList = ({ collection, anEle, onClose, action }: MenuListProps) => {
  const t = useTranslate(LANG_REPO, "menu")
  const handleMenu = (value: any) => {
    action(value)
    onClose();
  };

  return (
    <Menu
      open
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        anEle ? { top: anEle.top, left: anEle.left } : undefined
      }
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      componentsProps={{
        root: {
          style: {
            position: "inherit",
          },
        },
      }}
    >
      {getMenuList(collection, handleMenu, t).map((item, index) => (
        <MenuItem key={index} onClick={item.action}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText>{item.title}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
};

interface MenuArrayProps {
  title: string
  icon: React.ReactNode
  action: (action: any) => void
}
function getMenuList(collection: IRepoCollection, action: (action: any) => void, t: (key: string) => string) {
  const menulist: MenuArrayProps[] = []

  if (!Boolean(collection.deleted_at)) {
    menulist.push(
      {
        title: collection.starred ? t("unstarred") : t("starred"),
        icon: collection.starred ? <MdOutlineStar color="yellow" fontSize={"large"} /> : <MdOutlineStarBorder fontSize={"large"} />,
        action: () => action({ starred: true })
      })
    if (collection.type == CollectionType.File) {
      menulist.push(
        {
          title: t("download"),
          icon: <IoCloudDownloadOutline fontSize={"large"} />,
          action: () => {
            downloadFile(collection.file!)
            action(undefined)
          }
        })
      menulist.push(
        {
          title: t("copylink"),
          icon: <FaRegCopy fontSize={"large"} />,
          action: () => {
            copyToClipboard(collection.file?.url!)
            action({ copylink: true })
            setTimeout(() => action((pre: MenuArrayProps) => ({ ...pre, copylink: false })), 1000)
          }
        })
    }
    if (Boolean([CollectionAccess.Private, CollectionAccess.Shared].includes(collection.access_type))) {
      menulist.push(
        {
          title: t("rename"),
          icon: <BiRename style={{ fontSize: 20 }} />,
          action: () => action({ rename: true })
        },
        {
          title: t("move"),
          icon: <MoveToInbox fontSize="small" />,
          action: () => action({ move: true })
        },
        {
          title: t("share"),
          icon: <Share fontSize="small" />,
          action: () => action({ share: true })
        })
      if (Boolean(collection.access_type == CollectionAccess.Private)) {
        menulist.push(
          {
            title: t("delete"),
            icon: <DeleteOutline color="error" fontSize="small" />,
            action: () => action({ delete: true })
          })
      }
    }
  }

  if (Boolean(collection.deleted_at)) {
    menulist.push(
      {
        title: t("restore"),
        icon: <FaTrashRestore fontSize="small" />,
        action: () => action({ restore: true })
      }
    )
  }
  menulist.push({
    title: t("properties"),
    icon: <GiEyeTarget style={{ fontSize: 20 }} />,
    action: () => action({ properties: true })
  })
  return menulist
}

