// SidePanel.js
import React, { useState } from 'react';
import { Tabs, Tab, Box, List, ListItem, ListItemText, Typography, ImageList } from '@mui/material';
import { IItem, IMenuContext, IItemImage, ITempConstrants, IItemSubjectTable } from './interface';
import { ElementList } from './components/ElementList';
import { LiaElementor } from "react-icons/lia";
import { FaRegImages } from "react-icons/fa";
import { PiLegoLight } from "react-icons/pi";
import { ImageListItem } from '@mui/material';
import { HttpError, useList } from '@refinedev/core';
import { IRepoCollection } from '@repo/interface';
import { REPO_COLLECTION_URL } from '@repo/constant/server.urls';
import { CollectionType } from '@repo/constant/enum';
import LoadingWrapper from '@components/other/loading';


const initialText = { category: "element", fontSize: 12, color: '#000000', bold: false, italic: false, textAlign: 'left', height: 50, width: 100, x: 0, y: 0, hidden: false, locked: false, isSelected: false, rotation: 0, scaleX: 1, scaleY: 1 }
const initialLine = { category: "element", color: '#000000', height: 2, width: 100, x: 0, y: 0, hidden: false, locked: false, isSelected: false, rotation: 0, scaleX: 1, scaleY: 1 }
const initialEditor = { category: "element", editable: 'Editor', height: 70, width: 100, x: 0, y: 0, hidden: false, locked: false, isSelected: false, rotation: 0, scaleX: 1, scaleY: 1 }
const initialSubjectTable = {
  category: "filler",
  width: 100, x: 0, y: 0, hidden: false, locked: false, isSelected: false,
  rotation: 0, scaleX: 1, scaleY: 1,
  fontSize: 12,
  color: '#000000',
  bold: false,
  rows: 10,
  cellPadding: 5,
  colHeight: 25,
  rowHeight: 15,
}

type SidePanelProps = {
  onItemDragStart?: any;
  itemList: IItem[];
  setMenu: React.Dispatch<React.SetStateAction<IMenuContext>>
  constrants: ITempConstrants
  onReorder: any
  menuState: any
}
const SidePanel = ({ onItemDragStart, constrants, itemList, setMenu, onReorder, menuState }: SidePanelProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { data, isLoading } = useList<IRepoCollection, HttpError>({
    resource: REPO_COLLECTION_URL,
    meta: {
      customQuery: {
        parent_id: 1,
        file: true,
        type: CollectionType.File,
      },
    },
  });
  const handleDragStart = (item: IItem) => (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    onItemDragStart?.(item);
  };

  return (
    <Box sx={{ width: 300, display: 'flex', flexDirection: 'column', height: '100%', borderLeft: '1px solid #ddd' }}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 350 }}>
        <Box sx={{ flex: '1 1 auto', overflowY: 'auto', px: 1 }}>
          {tabIndex === 0 && (
            <List draggable={false}>
              {/* List shapes and text items */}
              {constrants.element.filter(e => {
                if (e.type === 'line') {
                  return false
                }
                // if (e.tableId == 'neb_xii_marksheet') {
                //   return false
                // }
                return true
              }).map((item) => (
                <ListItem
                  sx={{ border: '1px solid #ddd', cursor: 'grab', m: 1 }}
                  key={item?.name + item?.type}
                  draggable
                  onDragStart={handleDragStart({
                    ...(item.type === 'text' && initialText),
                    ...(item.type === 'line' && initialLine),
                    ...(item.type === 'editor' && initialEditor),
                    ...(item.type === 'subjectTable' && initialSubjectTable),
                    ...(item.type === 'ledgerTable' && initialSubjectTable),
                    ...item,
                    category: "element",
                    id: Date.now().toString()
                  } as IItem)}
                >
                  <ListItemText primary={item?.name} />
                </ListItem>
              ))}
            </List>
          )}

          {tabIndex === 1 && (
            <List draggable={false}>
              {/* List shapes and text items */}
              {constrants.fillers.map((item) => (
                <ListItem
                  sx={{ border: '1px solid #ddd', cursor: 'grab', m: 1 }}
                  key={item?.name + item?.type}
                  draggable
                  onDragStart={handleDragStart({
                    ...item,
                    ...(item.type === 'text' && { ...initialText, text: `{{${item?.name}}}` }),
                    category: "filler",
                    id: Date.now().toString()
                  } as IItem)}
                >
                  <ListItemText primary={item?.name} />
                </ListItem>
              ))}
            </List>
          )}
          {tabIndex === 2 && (
            <LoadingWrapper value={data?.data}>
              {data?.data.length === 0 && <Typography variant="h6">No images found</Typography>}
              {data && (
                <ImageList cols={2} rowHeight={100}>
                  {data?.data.map((item: IRepoCollection) => {
                    return (
                      <ImageListItem
                        key={item?.id}
                        sx={{ cursor: 'grab', overflow: 'hidden' }}
                        draggable
                        onDragStart={handleDragStart({
                          url: item?.file?.url,
                          type: 'image',
                          name: item?.label,
                          id: Date.now().toString()
                        } as IItemImage)}
                      >
                        <img
                          src={item?.file?.url}
                          srcSet={item?.file?.url}
                          alt={item?.label}
                          loading="lazy"
                        />
                      </ImageListItem>
                    );
                  })}
                </ImageList>
              )}
            </LoadingWrapper>
          )}
        </Box>
        <Box display="flex" flexDirection="column" borderLeft="1px solid #ddd">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabIndex}
            onChange={(e, newVal) => setTabIndex(newVal)}
            sx={{
              minWidth: "50px",
              "& .MuiTab-root": {
                minWidth: "50px",
                padding: "10px",
                justifyContent: "center",
              },
              "& .MuiTabs-indicator": {
                width: "3px",
              },
            }}
          >
            <Tab
              icon={<LiaElementor size={25} />} />
            <Tab
              icon={<PiLegoLight size={25} />} />
            <Tab
              icon={<FaRegImages size={25} />} />
          </Tabs>
        </Box>
      </Box>
      {/* Lower Section: List of placed elements */}
      <Box sx={{ flex: '1 1 auto', overflowY: 'auto', borderTop: '1px solid #ccc', p: 1 }}>
        <Typography variant="h6" gutterBottom>Placed Elements</Typography>
        <ElementList
          itemList={itemList}
          menuState={menuState}
          setMenu={setMenu}
          onReorder={onReorder}
        />
      </Box>
    </Box>
  );
};

export default SidePanel;
