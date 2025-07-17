import { IItemLedgerTable } from "src/editor/interface";
import { Group, Rect, Text } from "react-konva";
import { IExmResult, IExmSubject } from "../../modules/@exam/interface";
import { SubjectTypeEnum, YesNoEnum } from "@common/all.enum";
import { adjustArraySize } from "@utils/other";

type NebXIIGradesheetProps = {
    el: IItemLedgerTable;
    subjects: IExmSubject[]
    results: IExmResult[];
    pageNumber: number,
    rowSize: number
};

export const GradeLedger = ({
    el,
    subjects,
    results,
    pageNumber,
    rowSize,
}: NebXIIGradesheetProps) => {
    const cellPadding = Number(el.cellPadding)
    const colHeight = Number(el.colHeight)
    let fontStyle = el.bold ? "bold" : "normal";
    const firstIndexof = el.columns.findIndex((c) => c.id === "subject_1");
    const lastIndexof = el.columns.findIndex((c) => c.id === "subject_8");
    const dummySubject = el.columns.find((c) => c.id === "subject_1")!;
    const firstColumns = el.columns.slice(0, firstIndexof);
    const lastColumns = el.columns.slice(lastIndexof + 1);
    const hasTHPR = subjects.some((s) => s.type == SubjectTypeEnum.IN_TH) ? 2 : 1;
    const resultList = adjustArraySize(results, el.rows);
    const firstColumnsSize = firstColumns.reduce((acc, c) => acc + (Number(c.width) + (cellPadding * 2)), 0);
    const subjectColumnsSize = (Number(dummySubject.width) + (cellPadding * 2)) * subjects.length;
    return (
        <Group
            x={el.x}
            y={el.y}
            scaleX={el.scaleX}
            scaleY={el.scaleY}
        >
            {/* Header Row */}
            {/* Header Student Section */}
            {firstColumns.map((col, colIndex) => {
                const colX = firstColumns.slice(0, colIndex).reduce((acc, c) => acc + (c.width + (cellPadding * 2)), 0);
                return (
                    <Group key={`header-${colIndex}`} x={colX}>
                        <Rect
                            width={Number(col.width) + (cellPadding * 2)}
                            height={(colHeight + (cellPadding * 2)) * hasTHPR}
                            fill="lightgray"
                            strokeWidth={0.5}
                            stroke="black" />
                        <Text
                            x={cellPadding}
                            y={cellPadding + Number(hasTHPR > 1 ? colHeight : 0)}
                            width={Number(col.width)}
                            height={colHeight}
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
            {/* Header Subject Section */}
            {subjects.map((subject, colIndex) => {
                const col = dummySubject
                const colX = firstColumnsSize + subjects.slice(0, colIndex).reduce((acc, c) => acc + (Number(col.width) + (cellPadding * 2)), 0);
                if (subject.type !== SubjectTypeEnum.IN_TH) {
                    return (
                        <Group key={`header-${colIndex}`} x={colX}>
                            <Rect
                                width={Number(col.width) + (cellPadding * 2)}
                                height={(colHeight + (cellPadding * 2)) * hasTHPR}
                                fill="lightgray"
                                strokeWidth={0.5}
                                stroke="black" />
                            <Text
                                x={cellPadding}
                                y={cellPadding + Number(hasTHPR > 1 ? colHeight : 0)}
                                width={Number(col.width)}
                                height={colHeight}
                                wrap="word"
                                text={subject.subject_name}
                                fontStyle={fontStyle}
                                fontSize={+el.fontSize}
                                align={col.textAlign}
                                fill={el.color}
                            />
                        </Group>
                    );
                }
                return (
                    <Group key={`header-${colIndex}`} x={colX}>
                        <Rect
                            width={Number(col.width) + (cellPadding * 2)}
                            height={colHeight + (cellPadding * 2)}
                            fill="lightgray"
                            strokeWidth={0.5}
                            stroke="black" />
                        <Text
                            x={cellPadding}
                            y={cellPadding}
                            width={(col.width)}
                            height={colHeight}
                            wrap="word"
                            text={subject.subject_code}
                            fontStyle={fontStyle}
                            fontSize={+el.fontSize}
                            align={col.textAlign}
                            fill={el.color}
                        />
                        <Rect
                            y={colHeight + (cellPadding * 2)}
                            width={(Number(col.width) / 2) + (cellPadding * 2)}
                            height={colHeight + (cellPadding * 2)}
                            fill="lightgray"
                            strokeWidth={0.5}
                            stroke="black" />
                        <Text
                            x={cellPadding}
                            y={colHeight + (cellPadding * 4)}
                            width={(Number(col.width) / 2)}
                            height={colHeight}
                            wrap="word"
                            text={SubjectTypeEnum.IN}
                            fontStyle={fontStyle}
                            fontSize={+el.fontSize}
                            align={col.textAlign}
                            fill={el.color}
                        />
                        <Rect
                            x={(cellPadding + (Number(col.width) / 2))}
                            y={colHeight + (cellPadding * 2)}
                            width={(Number(col.width) / 2) + (cellPadding * 2)}
                            height={colHeight + (cellPadding * 2)}
                            fill="lightgray"
                            strokeWidth={0.5}
                            stroke="black" />

                        <Text
                            x={(cellPadding + (Number(col.width) / 2))}
                            y={colHeight + (cellPadding * 4)}
                            width={(col.width / 2)}
                            height={colHeight}
                            wrap="word"
                            text={SubjectTypeEnum.TH}
                            fontStyle={fontStyle}
                            fontSize={+el.fontSize}
                            align={col.textAlign}
                            fill={el.color}
                        />
                    </Group>
                );
            })}

            {/* Header Result Section */}
            {lastColumns.map((col, colIndex) => {
                const colX = firstColumnsSize + subjectColumnsSize + lastColumns.slice(0, colIndex).reduce((acc, c) => acc + (Number(c.width) + (cellPadding * 2)), 0);
                return (
                    <Group key={`header-${colIndex}`} x={colX}>
                        <Rect
                            width={Number(col.width) + (cellPadding * 2)}
                            height={(colHeight + (cellPadding * 2)) * hasTHPR}
                            fill="lightgray"
                            strokeWidth={0.5}
                            stroke="black" />
                        <Text
                            x={cellPadding}
                            y={cellPadding + Number(hasTHPR > 1 ? colHeight : 0)}
                            width={Number(col.width)}
                            height={colHeight * hasTHPR}
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

            {/* Body Student Section */}
            {resultList.map((result, rowIndex) => {
                return firstColumns.map((col, colIndex) => {
                    let textValue = result?.student_detail?.[col.id] ?? ""
                    if (col.id === "sno") {
                        textValue = (rowSize * (pageNumber - 1) + (rowIndex + 1)).toString()
                    }
                    const colX = firstColumns.slice(0, colIndex).reduce((acc, c) => acc + (Number(c.width) + (cellPadding * 2)), 0);
                    const y = ((rowIndex) * (Number(el.rowHeight) + (cellPadding * 2)) + (((colHeight + (cellPadding * 2)) * hasTHPR)))
                    return (
                        <Group
                            key={`header-${colIndex}`}
                            x={Number(colX)}
                            y={Number(y)}
                        >
                            <Rect
                                width={Number(col.width) + (cellPadding * 2)}
                                height={(colHeight + (cellPadding * 2))}
                                fill="white"
                                strokeWidth={0.5}
                                stroke="black"
                            />
                            <Text
                                x={cellPadding}
                                y={cellPadding * 2}
                                width={Number(col.width)}
                                height={colHeight}
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
            })}
            {/* Body Subject Section */}
            {resultList.map((result: IExmResult, rowIndex) => {
                return subjects.map((subject, colIndex) => {
                    const col = dummySubject
                    const subjectData = result?.subject?.find(s => s.subject_id === subject.subject_id)
                    const colX = firstColumnsSize + subjects.slice(0, colIndex).reduce((acc, c) => acc + (Number(col.width) + (cellPadding * 2)), 0);
                    const y = ((rowIndex) * (Number(el.rowHeight) + (cellPadding * 2)) + (((colHeight + (cellPadding * 2)) * (subject.type !== SubjectTypeEnum.IN_TH ? hasTHPR : 1))))
                    if (subject.type !== SubjectTypeEnum.IN_TH) {
                        let textValue = (subject.type === SubjectTypeEnum.TH ? subjectData?.gradeResult?.th_grade : subjectData?.gradeResult?.in_grade) ?? ""
                        textValue = subjectData?.is_absent === YesNoEnum.Yes ? "Abs" : textValue
                        return (
                            <Group
                                key={`header-${colIndex}`}
                                x={Number(colX)}
                                y={Number(y)}
                            >
                                <Rect
                                    width={Number(col.width) + (cellPadding * 2)}
                                    height={(colHeight + (cellPadding * 2))}
                                    fill="white"
                                    strokeWidth={0.5}
                                    stroke="black" />
                                <Text
                                    x={cellPadding}
                                    y={cellPadding}
                                    width={Number(col.width)}
                                    height={colHeight}
                                    wrap="word"
                                    text={textValue}
                                    fontStyle={fontStyle}
                                    fontSize={+el.fontSize}
                                    align={col.textAlign}
                                    fill={el.color}
                                />
                            </Group>
                        );
                    }
                    let thValue = subjectData?.gradeResult?.in_grade ?? ""
                    let inValue = subjectData?.gradeResult?.in_grade ?? ""
                    if (subjectData?.is_absent === YesNoEnum.Yes) {
                        inValue = "Abs"
                        thValue = "Abs"
                    }
                    return (
                        <Group
                            key={`header-${colIndex}`}
                            x={Number(colX)}
                            y={Number(y)}
                        >
                            <Rect
                                y={colHeight + (cellPadding * 2)}
                                width={(Number(col.width) / 2) + (cellPadding * 2)}
                                height={colHeight + (cellPadding * 2)}
                                fill="white"
                                strokeWidth={0.5}
                                stroke="black" />
                            <Text
                                x={cellPadding}
                                y={colHeight + (cellPadding * 4)}
                                width={(col.width / 2)}
                                height={colHeight}
                                wrap="word"
                                text={inValue}
                                fontStyle={fontStyle}
                                fontSize={+el.fontSize}
                                align={col.textAlign}
                                fill={el.color}
                            />
                            <Rect
                                x={(cellPadding + (col.width / 2))}
                                y={colHeight + (cellPadding * 2)}
                                width={(Number(col.width) / 2) + (cellPadding * 2)}
                                height={colHeight + (cellPadding * 2)}
                                fill="white"
                                strokeWidth={0.5}
                                stroke="black" />

                            <Text
                                x={(cellPadding + (Number(col.width) / 2))}
                                y={colHeight + (cellPadding * 4)}
                                width={(col.width / 2)}
                                height={colHeight}
                                wrap="word"
                                text={thValue}
                                fontStyle={fontStyle}
                                fontSize={+el.fontSize}
                                align={col.textAlign}
                                fill={el.color}
                            />
                        </Group>
                    );
                })
            })}
            {/* Body Result Section */}
            {resultList.map((result, rowIndex) => {
                return lastColumns.map((col, colIndex) => {
                    let textValue = result?.metadata?.[col.id] ?? ""
                    const colX = firstColumnsSize + subjectColumnsSize + lastColumns.slice(0, colIndex).reduce((acc, c) => acc + (Number(c.width) + (cellPadding * 2)), 0);
                    const y = (rowIndex * (Number(el.rowHeight) + (cellPadding * 2)) + (((colHeight + (cellPadding * 2)) * hasTHPR)))
                    return (
                        <Group
                            key={`header-${colIndex}`}
                            x={colX}
                            y={y}
                        >
                            <Rect
                                width={Number(col.width) + (cellPadding * 2)}
                                height={(colHeight + (cellPadding * 2))}
                                fill="white"
                                strokeWidth={0.5}
                                stroke="black"
                            />
                            <Text
                                x={cellPadding}
                                y={cellPadding}
                                width={Number(col.width)}
                                height={colHeight * hasTHPR}
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
            })}

        </Group>
    );
};