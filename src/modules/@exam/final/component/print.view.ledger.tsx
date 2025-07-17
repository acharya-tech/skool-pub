import { Stage, Layer } from "react-konva";
import { IExmResult, IExmVersion } from "../../interface";
import { ITemplateData } from "src/editor/interface";
import ImageItem from "@components/editorItem/ImageItem";
import EditorItem from "@components/editorItem/EditorItem";
import { LabelItem } from "@components/editorItem/LabelItem";
import { GradeLedger } from "@components/editorItem/Gradeledger";
import { Typography } from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_EXAM } from "@common/constant";
import { useEffect, useRef, useState } from "react";
import Konva from "konva";
type PrintViewLedgerProps = {
    results: IExmResult[],
    template: ITemplateData,
    version: IExmVersion,
    setRefs: any
}
export const PrintViewLedger = ({ results, template, version, setRefs }: PrintViewLedgerProps) => {
    const t = useTranslate(LANG_EXAM, "result")
    const rowSize = template.items.find(item => item.type === "ledgerTable")?.rows ?? 0
    if (rowSize == 0) {
        return <Typography>{t("info.datatableMissing")}</Typography>
    }
    const chunkList = chunkArray(results, rowSize)
    return chunkList.map((chunk, index) => {
        return <Ledger
            key={index}
            results={chunk}
            template={template}
            version={version}
            pageNumber={index + 1}
            setRefs={setRefs}
            rowSize={rowSize}
        />
    })
};

type LedgerProps = {
    results: IExmResult[],
    template: ITemplateData,
    version: IExmVersion
    pageNumber: number
    setRefs: any
    rowSize: number
}
const Ledger = ({ rowSize, results, template, version, pageNumber, setRefs }: LedgerProps) => {
    const stageRef = useRef<Konva.Stage>(null);

    useEffect(() => {
        if (stageRef.current) {
            setRefs((pre: any) => {
                return {
                    ...pre,
                    [pageNumber]: stageRef.current
                }
            })
        }
    }, [stageRef, setRefs])

    const routine = version.routine
    const fillers: Record<string, string | number> = {
        result_date: routine.result_date,
        class_name: routine.class?.name!,
        batch_name: routine.batch?.name!,
        exam_type_name: routine.type?.name!,
        program_name: routine.class?.name!,
        routine_code: routine.code,
        total_student: version.total_student,
        passed_student: version.passed_student,
        page_number: pageNumber
    }
    return (
        <Stage ref={stageRef} width={template.paperWidth} height={template.paperHeight}>
            <Layer>
                {template.items.slice().reverse().map((item, index) => {
                    if (item.category === 'element') {
                        if (item.type === 'text') {
                            return <LabelItem
                                el={item}
                                key={item.id}
                            />
                        }
                        if (item.type === 'image') {
                            return <ImageItem
                                el={item}
                                key={item.id}
                            />
                        }
                        if (item.type === 'editor') {
                            return <EditorItem
                                el={item}
                                key={item.id}
                            />
                        }
                        if (item.type === 'ledgerTable') {
                            if (item.tableId === 'neb_xii_gradeledger') {
                                return <GradeLedger
                                    el={item}
                                    subjects={routine.esubjects}
                                    results={results}
                                    key={item.id}
                                    pageNumber={pageNumber}
                                    rowSize={rowSize}
                                />
                            } else {
                                return <></>
                            }
                        }
                    } else {
                        if (item.type === 'text') {
                            return <LabelItem
                                el={item}
                                key={item.id}
                                text={fillers[item.name]?.toString() as string}
                            />
                        }
                        if (item.type === 'image') {
                            return <ImageItem
                                el={item}
                                url={fillers[item.name]?.toString() as string}
                                key={item.id}
                            />
                        }
                    }
                })}
            </Layer>
        </Stage>
    );
};

function chunkArray(array: IExmResult[], size: number) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}