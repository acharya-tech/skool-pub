import React, { useState } from 'react';
import Playground from './Playground';
import SidePanel from './SidePanel'; // Assuming you have one from earlier
import {
    Box,
} from '@mui/material';
import { MenuContext } from './components/MenuContext';
import { IItem, ITempConstrants, ITemplateData } from './interface';
import { useMenuContext } from './hooks/useMenuContext';
import { IDataValue } from '@datavalue/interface';
import { convertHTMLToSVG, editorMergeItem } from './utils';
//TODO : Fix reset item value when resized
type ITemplateEditorProps = {
    template: IDataValue
    constrants: object
    onSave: (value: any) => void
    onClose: () => void
}
export const TemplateEditor = ({ template, constrants, onSave, onClose }: ITemplateEditorProps) => {
    // Example state for placed elements
    const { items, ...tempValue } = JSON.parse(template.data_value as string ?? "{}") as ITemplateData ?? {}
    const [itemList, setItemList] = useState<IItem[]>([...(items ?? [])]);
    const { menuState, setMenu } = useMenuContext({ setItemList })

    const handleElementUpdate = (id: string, updates: Partial<IItem>) => {
        setItemList((els) =>
            els.map((el) => (el.id === id ? editorMergeItem(el, updates) : el))
        );
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const data = JSON.parse(e.dataTransfer.getData('application/json'));
        const playgroundRect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - playgroundRect.left;
        const y = e.clientY - playgroundRect.top;

        let newElement: IItem = {
            ...data,
            id: Date.now().toString(),
            x,
            y,
            hidden: false,
            locked: false,
            isSelected: false,
            width: data.width,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1
        };
        if (newElement.category === "element") {
            if (newElement.type === "text") {
                newElement = {
                    ...newElement,
                    name: "Text " + (itemList.filter((el) => el.type === "text").length + 1),
                    text: "Text " + (itemList.filter((el) => el.type === "text").length + 1),
                    width: 50,
                    fontSize: 12,
                    color: "#000000",
                    bold: false,
                    italic: false,
                    textAlign: "left",
                };
            } else if (newElement.type === "line") {
                const name = "Line " + (itemList.filter((el) => el.type === "line").length + 1)
                newElement = {
                    ...newElement,
                    name: name,
                };
            } else if (newElement.type === "editor") {
                const name = "Editor " + (itemList.filter((el) => el.type === "editor").length + 1)
                newElement = {
                    ...newElement,
                    name: name,
                    editable: "Editor",
                    uri: "data:image/svg+xml;charset=utf-8,%0A%20%20%20%20%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22792%22%20height%3D%2292%22%3E%0A%20%20%20%20%20%20%3CforeignObject%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxhtml%22%20%0A%20%20%20%20%20%20%20%20%20%20style%3D%22white-space%3A%20pre-wrap%3Bpadding%3A%2010px%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20p%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20margin%3A%200%3B%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20padding%3A%200%3B%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20line-height%3A%20normal%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cp%3EEditor%3C%2Fp%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3C%2FforeignObject%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20",
                    width: 792,
                    height: 92,
                };
            }
        }
        setItemList((prev) => [newElement, ...prev]);
    };

    return (
        <Box sx={{ display: 'flex', overflow: 'hidden' }}>
            <Box
                sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <Playground
                    onSave={onSave}
                    title={template.name}
                    tempValue={tempValue}
                    elements={itemList}
                    onElementUpdate={handleElementUpdate}
                    setMenu={setMenu}
                    menuState={menuState}
                    onClose={onClose}
                    constrants={constrants as ITempConstrants}
                />
                {menuState.open && (
                    <MenuContext menuState={menuState} setMenu={setMenu} />
                )}
            </Box>
            {/* Optionally, include your SidePanel here */}
            <SidePanel
                itemList={itemList}
                onReorder={setItemList}
                setMenu={setMenu}
                menuState={menuState}
                constrants={constrants as ITempConstrants}
            />
        </Box>
    );
};