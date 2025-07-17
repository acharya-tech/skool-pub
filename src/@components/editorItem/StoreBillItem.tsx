import { IItemSubjectTable } from "src/editor/interface";
import { Group, Rect, Text } from "react-konva";
import { IStoreItem } from "@inventory/interface";
import { adjustArraySize } from "@utils/other";

type StoreBillItemProps = {
    el: IItemSubjectTable;
    items: IStoreItem[]
};

export const StoreBillItem = ({
    el,
    items
}: StoreBillItemProps) => {
    let fontStyle = el.bold ? "bold" : "normal";
    const itemsList = adjustArraySize(items, el.rows);
    return (
        <Group
            key={el.id}
            id={el.id}
            x={el.x}
            y={el.y}
            scaleX={el.scaleX}
            scaleY={el.scaleY}
        >
            {/* Header Row */}
            {el.columns.map((col, colIndex) => {
                const colX = el.columns.slice(0, colIndex).reduce((acc, c) => acc + (c.width + (el.cellPadding * 2)), 0);
                return (
                    <Group key={`header-${colIndex}`} x={colX}>
                        {/* Header Cell */}
                        <Rect
                            width={col.width + (el.cellPadding * 2)}
                            height={150 + (el.cellPadding * 2)}
                            fill="lightgray"
                            strokeWidth={0.5}
                            stroke="black" />
                        <Text
                            x={el.cellPadding}
                            y={el.cellPadding}
                            width={col.width}
                            height={el.colHeight}
                            wrap="word"
                            text={col.label}
                            fontStyle={fontStyle}
                            fontSize={+el.fontSize}
                            align={col.textAlign}
                            fill={el.color}
                        />
                    </Group>
                );
            })}

            {/* Table Rows */}
            {itemsList.map((item, rowIndex) =>
                el.columns.map((col, colIndex) => {
                    let textValue = item?.[col.id] ?? ""
                    if (col.id === "sno" && item) {
                        textValue = rowIndex + 1
                    }
                    if (col.id === "description" && item) {
                        textValue = item.product_name + " (" + item.qty + " * " + item.amount + ")"
                    }
                    if (col.id === "total" && item) {
                        textValue = (Number(item.qty ?? 0) * Number(item.amount ?? 0)).toFixed(2)
                    }
                    const colX = el.columns.slice(0, colIndex).reduce((acc, c) => acc + (Number(c.width) + (el.cellPadding * 2)), 0);
                    const y = ((rowIndex) * (Number(el.rowHeight) + (el.cellPadding * 2)) + (((Number(el.colHeight) + (el.cellPadding * 2)))))
                    return (
                        <Group
                            key={`body-${colIndex}`}
                            x={Number(colX)}
                            y={Number(y)}
                        >
                            <Rect
                                key={`cell-${rowIndex}-${colIndex}`}
                                width={Number(col.width) + (el.cellPadding * 2)}
                                height={(Number(el.rowHeight) + (el.cellPadding * 2))}
                                fill="white"
                                strokeWidth={0.5}
                                stroke="black"
                            />
                            <Text
                                x={Number(el.cellPadding)}
                                y={Number(el.cellPadding)}
                                key={`text-body-${rowIndex}-${colIndex}`}
                                width={Number(col.width)}
                                height={Number(el.rowHeight)}
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
