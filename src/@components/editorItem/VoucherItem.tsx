import { IItemSubjectTable } from "src/editor/interface";
import { Group, Rect, Text } from "react-konva";
import { IBillInvoiceItem } from "@billing/interface";
import { adjustArraySize } from "@utils/other";
import { IAccountVoucherItem } from "@account/interface";
import { DrCrEnum } from "@common/all.enum";

type VoucherItemProps = {
    el: IItemSubjectTable;
    items: IAccountVoucherItem[]
};

export const VoucherItem = ({
    el,
    items
}: VoucherItemProps) => {
    let fontStyle = el.bold ? "bold" : "normal";
    const itemsList: IAccountVoucherItem[] = adjustArraySize(items, el.rows);
    let totalCr = 0
    let totalDr = 0
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
                    let textValue = "";
                    if (col.id === "sno" && item) {
                        textValue = String(rowIndex + 1)
                    }
                    if (col.id === "particular" && item) {
                        textValue = item.meta.ledger_name
                    }
                    if (col.id === "ledger" && item) {
                        textValue = item.meta?.ledger_code ?? ""
                    }
                    if (col.id === "dr_amount" && item?.dr_cr == DrCrEnum.Dr) {
                        textValue = String(item.amount ?? 0)
                        totalDr += Number(item.amount ?? 0)
                    }
                    if (col.id === "cr_amount" && item?.dr_cr == DrCrEnum.Cr) {
                        textValue = String(item.amount ?? 0)
                        totalCr += Number(item.amount ?? 0)
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
            {/* Table Footer */}
            {el.columns.map((col, colIndex) => {
                const colX = el.columns.slice(0, colIndex).reduce((acc, c) => acc + (c.width + (el.cellPadding * 2)), 0);
                let textValue = ""
                if (col.id === "particular") {
                    textValue = "TOTAL"
                }
                if (col.id === "dr_amount") {
                    textValue = totalDr.toString()
                }
                if (col.id === "cr_amount") {
                    textValue = totalCr.toString()
                }
                const y = ((el.rows) * (Number(el.rowHeight) + (el.cellPadding * 2)) + (((Number(el.colHeight) + (el.cellPadding * 2)))))

                return (
                    <Group key={`header-${colIndex}`} x={colX} y={Number(y)}>
                        <Rect
                            width={col.width + (el.cellPadding * 2)}
                            height={(Number(el.rowHeight) + (el.cellPadding * 2))}
                            fill="lightgray"
                            strokeWidth={0.5}
                            stroke="black" />
                        <Text
                            x={el.cellPadding}
                            y={el.cellPadding}
                            width={col.width}
                            height={el.colHeight}
                            wrap="word"
                            text={textValue}
                            fontStyle={fontStyle}
                            fontSize={+el.fontSize}
                            align={col.textAlign}
                            fill={el.color}
                        />
                    </Group>
                );
            })}
        </Group>
    );
};