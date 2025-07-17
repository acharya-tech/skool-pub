import { IItemLedgerTable } from "src/editor/interface";
import Konva from "konva";
import { useRef } from "react";
import { Group, Rect, Text } from "react-konva";

type NebXIIGradesheetProps = {
    el: IItemLedgerTable;
    setSelected: (el: IItemLedgerTable | null) => void;
    handleRightClick: (e: any, el: IItemLedgerTable) => void;
    onElementUpdate: (id: string, item: Partial<IItemLedgerTable>) => void;
    onDoubleClick: (element: IItemLedgerTable) => void;
};

export const GradeLedger = ({
    el, setSelected, onElementUpdate, handleRightClick, onDoubleClick
}: NebXIIGradesheetProps) => {
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

    const cellPadding = Number(el.cellPadding)
    const rowHeight = Number(el.rowHeight)
    const colHeight = Number(el.colHeight)
    const fontSize = Number(el.fontSize)
    return (
        <Group
            ref={groupRef}
            draggable={!el.locked}
            id={el.id}
            x={Number(el.x)}
            y={Number(el.y)}
            width={Number(el.width)}
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
            onMouseOver={(e) => {
                console.log("mouse over gd");
            }}

        >
            {/* Header Row */}
            {el.columns.map((col, colIndex) => {
                const colX = el.columns.slice(0, colIndex).reduce((acc, c) => acc + (Number(c.width) + cellPadding * 2), 0);
                return (
                    <Group key={`header-${colIndex}`} x={colX}>
                        {/* Header Cell */}
                        <Rect
                            width={Number(col.width) + cellPadding * 2}
                            height={colHeight + cellPadding * 2}
                            fill="lightgray"
                            strokeWidth={0.5}
                            stroke="black" />
                        <Text
                            x={cellPadding * 2}
                            y={cellPadding * 2}
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
                    const colX = el.columns.slice(0, colIndex).reduce((acc, c) => acc + (Number(c.width) + cellPadding * 2), 0);
                    const y = ((rowIndex) * (rowHeight + cellPadding * 2) + (((colHeight + cellPadding * 2))))
                    let textValue = col.id
                    if (col.id == "sno") {
                        textValue = (rowIndex + 1).toString()
                    }
                    return (
                        <Group
                            key={`body-${colIndex}`}
                            x={Number(colX)}
                            y={Number(y)}
                        >
                            <Rect
                                key={`cell-${rowIndex}-${colIndex}`}
                                width={Number(col.width) + cellPadding * 2}
                                height={rowHeight + cellPadding * 2}
                                fill="white"
                                strokeWidth={0.5}
                                stroke="black"
                            />
                            <Text
                                x={cellPadding}
                                y={cellPadding}
                                width={Number(col.width)}
                                height={rowHeight}
                                wrap="word"
                                text={textValue}
                                fontStyle={fontStyle}
                                fontSize={+el.fontSize}
                                align={col.textAlign}
                                fill={el.color}
                            />
                        </Group>
                    );
                })
            )}
        </Group>
    );
};
