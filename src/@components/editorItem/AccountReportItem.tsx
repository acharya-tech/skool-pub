import { IItemSubjectTable, IItemSubjectTableColumn, TextAlighTypes } from "src/editor/interface";
import { Group, Rect, Text } from "react-konva";
import { IAccountHeadRes, IAccountVoucherItem, IFinalReportType } from "@account/interface";

type AccountReportItemProps = {
    el: IItemSubjectTable;
    items: IAccountHeadRes[],
    type: IFinalReportType,
    total: {
        dr: number,
        cr: number
    }
};

export const AccountReportItem = ({
    el,
    items,
    total,
    type
}: AccountReportItemProps) => {
    let fontStyle = el.bold ? "bold" : "normal";
    let rowCount = 0
    const response: any = []
    items.forEach((item, rowIndex) => {

        const bsHeadTitle = getRowItem({
            rowIndex: rowCount,
            col: el.columns[0],
            colIndex: 0,
            el: el,
            level: 0,
            value: item.bs_type,
            type: "head"
        })
        const bsHeadLF = getRowItem({
            rowIndex: rowCount,
            col: el.columns[1],
            colIndex: 1,
            el: el,
            value: "",
            level: 1,
            textAligh: "left",
            type: "head",
            fontStyle: "bold"
        })
        const textVal = item.total > 0 ? item.total.toString() : `(${Math.abs(item.total).toString()})`
        const bsHeadTotal = getRowItem({
            rowIndex: rowCount,
            col: el.columns[2],
            colIndex: 2,
            el: el,
            value: textVal,
            colSpan: 2,
            textAligh: "left",
            type: "head"
        })


        response.push(bsHeadLF)
        response.push(bsHeadTitle)
        response.push(bsHeadTotal)
        rowCount++
        item.groups.forEach(group => {
            const lgTitle = getRowItem({
                rowIndex: rowCount,
                col: el.columns[0],
                colIndex: 0,
                el: el,
                level: 1,
                value: group.group_name,
                type: "group"
            })
            const lgHeadLF = getRowItem({
                rowIndex: rowCount,
                col: el.columns[1],
                colIndex: 1,
                el: el,
                value: "",
                level: 1,
                textAligh: "left",
                type: "group",
                fontStyle: "bold"
            })
            const textVal = group.total > 0 ? group.total.toString() : `(${Math.abs(group.total).toString()})`

            const lgTotal = getRowItem({
                rowIndex: rowCount,
                col: el.columns[2],
                colIndex: 2,
                el: el,
                value: textVal,
                colSpan: 2,
                textAligh: "left",
                type: "group"
            })


            response.push(lgHeadLF)
            response.push(lgTitle)
            response.push(lgTotal)
            rowCount++
            group.ledgers.forEach(ledger => {
                el.columns.forEach((col, colIndex) => {
                    let textValue: any = ""
                    let level = 0
                    if (col.id === "particular") {
                        textValue = ledger.ledger_name
                        level = 2
                    }
                    if (col.id === "lf_no") {
                        textValue = ledger.ledger_code
                    }
                    if (col.id === "dr_amount") {
                        textValue = ledger.dr > 0 ? ledger.dr : ""
                    }
                    if (col.id === "cr_amount") {
                        textValue = ledger.cr > 0 ? ledger.cr : ""
                    }

                    const ledgerCol = getRowItem({
                        col,
                        colIndex,
                        el,
                        level,
                        rowIndex: rowCount,
                        value: textValue.toString(),
                        type: "ledger"
                    })
                    response.push(ledgerCol)
                })
                rowCount++
            })
        })
    })

    const totalTitle = getRowItem({
        rowIndex: rowCount,
        col: el.columns[0],
        colIndex: 0,
        el: el,
        value: "TOTAL",
        level: 1,
        textAligh: "left",
        type: "group",
        fontStyle: "bold"
    })

    response.push(totalTitle)
    const totalLF = getRowItem({
        rowIndex: rowCount,
        col: el.columns[1],
        colIndex: 1,
        el: el,
        value: "",
        level: 1,
        textAligh: "left",
        type: "group",
        fontStyle: "bold"
    })

    response.push(totalLF)
    const totalDr = getRowItem({
        rowIndex: rowCount,
        col: el.columns[2],
        colIndex: 2,
        el: el,
        value: total.dr.toString(),
        textAligh: "right",
        type: "group",
        fontStyle: "bold"
    })
    response.push(totalDr)
    const totalCr = getRowItem({
        rowIndex: rowCount,
        col: el.columns[3],
        colIndex: 3,
        el: el,
        value: total.cr.toString(),
        textAligh: "right",
        type: "group",
        fontStyle: "bold"
    })
    response.push(totalCr)
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
            {response}
        </Group >
    );
};

type GetTitleHeadProps = {
    rowIndex: number
    colIndex: number,
    col: IItemSubjectTableColumn,
    el: IItemSubjectTable
    value: string,
    level?: number
    fontStyle?: string
    textAligh?: TextAlighTypes
    colSpan?: number
    type: "ledger" | "group" | "head"
}

function getRowItem({ rowIndex, el, col, colIndex, value, level = 0, colSpan = 0, fontStyle, textAligh, type }: GetTitleHeadProps) {
    const colX = el.columns.slice(0, colIndex).reduce((acc, c) => acc + (c.width + (el.cellPadding * 2)), 0);
    const y = ((rowIndex) * (Number(el.rowHeight) + (el.cellPadding * 2)) + (((Number(el.colHeight) + (el.cellPadding * 2)))))
    const rectWidth = colSpan > 0 ? Number(col.width) * colSpan + (el.cellPadding * 2 * colSpan) : Number(col.width) + (el.cellPadding * 2)
    return <Group
        key={`body-${rowIndex}-${colIndex}`}
        x={Number(colX)}
        y={Number(y)}
    >
        <Rect
            key={`cell-${rowIndex}-${colIndex}`}
            width={rectWidth}
            height={(Number(el.rowHeight) + (el.cellPadding * 2))}
            fill={type === "ledger" ? "white" : type === "head" ? "#6ec8ff" : "#ddd"}
            strokeWidth={0.5}
            stroke="black"
        />
        <Text
            x={Number(el.cellPadding) + ((level) * 20)}
            y={Number(el.cellPadding)}
            key={`text-body-${rowIndex}-${colIndex}`}
            width={Number(col.width)}
            height={Number(el.rowHeight)}
            wrap="word"
            text={value}
            fontStyle={fontStyle}
            fontSize={+el.fontSize}
            align={textAligh ?? col.textAlign}
            fill={el.color}
        />
    </Group>
}