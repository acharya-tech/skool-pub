import { IItemSubjectTable } from "src/editor/interface";
import { Group, Rect, Text } from "react-konva";
import { ExmResultSubjectMeta } from "../../modules/@exam/interface";
import { ExmResultRemarkEnum } from "../../modules/@exam/constant/enum";
import { adjustArraySize } from "@utils/other";

type NebXIIMarksheetProps = {
    el: IItemSubjectTable;
    subjects: ExmResultSubjectMeta[]
};

export const NebXIIMarksheet = ({
    el,
    subjects
}: NebXIIMarksheetProps) => {

    let fontStyle = el.bold ? "bold" : "normal";
    const subjectsList: any[] = adjustArraySize(subjects, el.rows);
    return (
        <Group
            key={el.id}
            id={el.id}
            x={Number(el.x)}
            y={Number(el.y)}
            scaleX={Number(el.scaleX)}
            scaleY={Number(el.scaleY)}
        >
            {/* Header Row */}
            {el.columns.map((col, colIndex) => {
                const cellPadding = Number(el.cellPadding)
                const width = Number(col.width)
                const colX = el.columns.slice(0, colIndex).reduce((acc, c) => acc + (c.width + (cellPadding * 2)), 0);
                return (
                    <Group key={`header-${colIndex}`} x={colX}>
                        {/* Header Cell */}
                        <Rect
                            width={width + (cellPadding * 2)}
                            height={150 + (cellPadding * 2)}
                            fill="lightgray"
                            strokeWidth={0.5}
                            stroke="black" />
                        <Text
                            x={cellPadding}
                            y={cellPadding}
                            width={width}
                            height={Number(el.colHeight)}
                            wrap="word"
                            text={col.label}
                            fontStyle={fontStyle}
                            fontSize={Number(el.fontSize)}
                            align={col.textAlign}
                            fill={el.color}
                        />
                    </Group>
                );
            })}

            {/* Table Rows */}
            {subjectsList.map((subject, rowIndex) =>
                el.columns.map((col, colIndex) => {
                    let textValue = subject?.[col.id] ?? subject?.markResult?.[col.id as any] ?? ""
                    if (col.id === "remark") {
                        textValue = subject?.markResult?.remark === ExmResultRemarkEnum.Failed ? "*" : ""
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