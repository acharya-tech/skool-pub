import { Stage, Layer } from "react-konva";
import { IExmResult, IExmVersion } from "../../interface";
import { ITemplateData } from "src/editor/interface";
import ImageItem from "@components/editorItem/ImageItem";
import EditorItem from "@components/editorItem/EditorItem";
import { LabelItem } from "@components/editorItem/LabelItem";
import { NebXIIGradesheet } from "@components/editorItem/NebXIIGradesheet";
import { useEffect, useRef } from "react";
import Konva from "konva";
import { NebXIIMarksheet } from "@components/editorItem/NebXIIMarksheet";
type PrintViewSheetProps = {
    result: IExmResult,
    template: ITemplateData,
    version: IExmVersion
    setRefs: any
}
export const PrintViewSheet = ({ result, template, version, setRefs }: PrintViewSheetProps) => {
    const stageRef = useRef<Konva.Stage>(null);
    const routine = version.routine
    const fillers: Record<string, string | number> = {
        ...result.student_detail,
        ...result.metadata,
        result_date: routine.result_date,
        current_date: new Date().toLocaleDateString(),
    }
    useEffect(() => {
        if (stageRef.current) {
            setRefs((pre: any) => {
                return {
                    ...pre,
                    [result.id]: stageRef.current
                }
            })
        }
    }, [stageRef, setRefs])
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
                        if (item.type === 'subjectTable') {
                            if (item.tableId === 'neb_xii_gradesheet') {
                                return <NebXIIGradesheet
                                    el={item}
                                    subjects={result.subject}
                                    key={item.id}
                                />
                            } else if (item.tableId === 'neb_xii_marksheet') {
                                return <NebXIIMarksheet
                                    el={item}
                                    subjects={result.subject}
                                    key={item.id}
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
