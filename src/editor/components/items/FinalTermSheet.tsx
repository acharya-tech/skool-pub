import { IItemSubjectTable } from "src/editor/interface";
import Konva from "konva";
import { useRef } from "react";
import { Group, Rect, Text } from "react-konva";

type FinalTermSheetProps = {
    el: IItemSubjectTable;
    setSelected: (el: IItemSubjectTable | null) => void;
    handleRightClick: (e: any, el: IItemSubjectTable) => void;
    onElementUpdate: (id: string, item: Partial<IItemSubjectTable>) => void;
    onDoubleClick: (element: IItemSubjectTable) => void;
};

export const FinalTermSheet = ({
    el, setSelected, onElementUpdate, handleRightClick, onDoubleClick
}: FinalTermSheetProps) => {
    const groupRef = useRef<Konva.Group | null>(null);

    const handleTransformEnd = () => {
        if (groupRef.current) {
            const node = groupRef.current;
            const scaleX = node.scaleX();
            const prevWidth = el.width;
            const newWidth = Math.max(50, prevWidth * scaleX);
            const diffWidth = newWidth - prevWidth
            const columns = el.columns.map((col) => {
                const ratio = col.width / prevWidth
                return {
                    ...col,
                    width: (col.width + (diffWidth * ratio))
                }
            })
            onElementUpdate(el.id, {
                ...el,
                rotation: parseFloat(node.rotation().toFixed(2)),
                width: parseFloat(newWidth.toFixed(2)), // Update width without distortion
                columns
            });
            node.scaleX(1);
            node.scaleY(1);
        }
    };

    let fontStyle = el.bold ? "bold" : "normal";

    const cellPadding = Number(el.cellPadding) * 2
    const rowHeight = Number(el.rowHeight)
    const colHeight = Number(el.colHeight)
    const fontSize = Number(el.fontSize)
    const elX = Number(el.x)
    const elY = Number(el.y)
    const elWidth = Number(el.width)
    // const elHeight = Number(el.height)
    // const rowTextY = (rowHeight - fontSize) / 2
    // const colTextY = (colHeight - fontSize) / 2
    const rowTextX = cellPadding / 2
    const colTextX = cellPadding / 2
    const rowTextY = cellPadding / 2
    const colTextY = cellPadding / 2
    const footerY = ((Number(el.rows) + 1) * (rowHeight + cellPadding) + (colHeight + cellPadding))
    const colWidth = el.columns.reduce((acc, c) => acc + Number(c.width), 0)
    console.log(colHeight, rowHeight, 'colHeight, rowHeight')
    return (
        <Group
            ref={groupRef}
            draggable={!el.locked}
            id={el.id}
            x={elX}
            y={elY}
            width={elWidth}
            // height={elHeight}
            hitStrokeWidth={20}
            scaleX={el.scaleX}
            scaleY={el.scaleY}
            onDragStart={() => setSelected(el)}
            onClick={() => setSelected(el)}
            onContextMenu={(e) => {
                e.evt.preventDefault();
                handleRightClick(e, el);
            }}
            onDragEnd={(e) =>
                onElementUpdate(el.id, {
                    x: e.target.x(),
                    y: e.target.y(),
                    scaleX: e.target.scaleX(),
                    scaleY: e.target.scaleY(),
                })
            }
            onDblClick={(e) => onDoubleClick(el)}
            onTransform={handleTransformEnd}
        >
            {/* Title Row */}
            <Group key={`header-title`}>
                <Rect
                    width={colWidth + (cellPadding * el.columns.length)}
                    height={rowHeight + cellPadding}
                    fill="#eeeeee"
                    strokeWidth={0.5}
                    stroke="black" />
                <Text
                    x={rowTextX}
                    y={rowTextY}
                    width={(colWidth)}
                    height={rowHeight}
                    wrap="word"
                    text={el.name}
                    fontStyle={fontStyle}
                    fontSize={fontSize}
                    align={"center"}
                    fill={el.color}
                />
            </Group>
            {/* Header Row */}
            {el.columns.map((col, colIndex) => {
                const colX = el.columns.slice(0, colIndex).reduce((acc, c) => acc + (Number(c.width) + cellPadding), 0);
                return (
                    <Group key={`header-${colIndex}`} x={colX} y={rowHeight + cellPadding}>
                        <Rect
                            width={Number(col.width) + cellPadding}
                            height={colHeight + cellPadding}
                            fill="lightgray"
                            strokeWidth={0.5}
                            stroke="black" />
                        <Text
                            x={colTextX}
                            y={colTextY}
                            width={Number(col.width)}
                            height={colHeight}
                            wrap="word"
                            text={col.label}
                            fontStyle={fontStyle}
                            fontSize={fontSize}
                            align={col.textAlign}
                            fill={el.color}
                        />
                    </Group>
                );
            })}

            {/* Table Rows */}
            {Array.from({ length: el.rows }).map((_, rowIndex) =>
                el.columns.map((col, colIndex) => {
                    const colX = el.columns.slice(0, colIndex).reduce((acc, c) => acc + (Number(c.width) + cellPadding), 0);
                    const y = ((rowIndex + 1) * (rowHeight + cellPadding) + (colHeight + cellPadding))
                    return (
                        <Group
                            key={`body-${colIndex}`}
                            x={Number(colX)}
                            y={Number(y)}
                        >
                            <Rect
                                key={`cell-${rowIndex}-${colIndex}`}
                                width={Number(col.width) + cellPadding}
                                height={rowHeight + cellPadding}
                                fill="white"
                                strokeWidth={0.5}
                                stroke="black"
                            />
                        </Group>
                    );
                })
            )}

            {/* Footer Row 1*/}
            {el.columns.map((col, colIndex) => {
                const colX = el.columns.slice(0, colIndex).reduce((acc, c) => acc + (Number(c.width) + cellPadding), 0);
                return (
                    <Group key={`footer-${colIndex}`} x={colX} y={footerY}>
                        <Rect
                            width={Number(col.width) + cellPadding}
                            height={rowHeight + cellPadding}
                            strokeWidth={0.5}
                            fill="#eeeeee"
                            stroke="black" />
                        {col.id == "subject_name" &&
                            <Text
                                x={rowTextX}
                                y={rowTextY}
                                width={Number(col.width)}
                                height={rowHeight}
                                wrap="word"
                                text={"Total Credits"}
                                fontStyle={fontStyle}
                                fontSize={fontSize}
                                align={"right"}
                                fill={el.color}
                            />
                        }
                    </Group>
                );
            })}
            {el.columns.map((col, colIndex) => {
                const colX = el.columns.slice(0, colIndex).reduce((acc, c) => acc + (Number(c.width) + cellPadding), 0);
                return (
                    <Group key={`footer-${colIndex}`} x={colX} y={footerY + rowHeight + cellPadding}>
                        <Rect
                            width={Number(col.width) + cellPadding}
                            height={rowHeight + cellPadding}
                            strokeWidth={0.5}
                            fill="#eeeeee"
                            stroke="black" />
                        {col.id == "subject_name" &&
                            <Text
                                x={rowTextX}
                                y={rowTextY}
                                width={Number(col.width)}
                                height={colHeight}
                                wrap="word"
                                text={"TGPA"}
                                fontStyle={fontStyle}
                                fontSize={fontSize}
                                align={"right"}
                                fill={el.color}
                            />
                        }
                    </Group>
                );
            })}
        </Group>
    );
};
