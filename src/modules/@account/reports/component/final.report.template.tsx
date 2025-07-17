import { Layer, Stage } from "react-konva";
import { useRef } from "react";
import Konva from "konva";
import { IItem, ITemplateData } from "src/editor/interface";
import { LabelItem } from "@components/editorItem/LabelItem";
import ImageItem from "@components/editorItem/ImageItem";
import EditorItem from "@components/editorItem/EditorItem";
import { Box, Stack } from "@mui/material";
import { Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { handleStagePrint } from "@utils/stage.print";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_ACCOUNT } from "@common/constant";
import { AccountReportItem } from "@components/editorItem/AccountReportItem";
import dayjs from "dayjs";
import { IFinalReportRes, IFinalReportType } from "../../interface";
import { countAllItems, FinalReportToExcel } from "../../utils";
import { BsFileExcel } from "react-icons/bs";

type TrialTemplateProps = {
    data: IFinalReportRes
    template?: ITemplateData,
    type: IFinalReportType
    close?: any
}
export const FinalReportTemplate = ({ data, template, type }: TrialTemplateProps) => {
    const t = useTranslate(LANG_ACCOUNT, "voucher");
    const stageRef = useRef<Konva.Stage>(null);
    const handlePrint = () => {
        if (stageRef !== null && stageRef.current !== null) {
            handleStagePrint([stageRef.current]);
        }
    }
    const handleExport = () => {
        let fileName = "ExcelReport";
        if (type === "balancesheet") {
            fileName = "Balance sheet"
        } else if (type === "pl") {
            fileName = "Profit and loss"
        } else if (type === "trial") {
            fileName = "Trial balance"
        }
        return FinalReportToExcel(fileName, data.report, data.total)
    }

    const rowCount = countAllItems(data.report) + 18
    const subjectTable = template?.items?.find((item: IItem) => item?.type === "subjectTable")
    const cellPadding = Number(subjectTable?.cellPadding ?? 2) * 2
    const paperRowHeight = rowCount * (Number(subjectTable?.rowHeight || 15) + cellPadding)
    const fillers: Record<string, string | number> = {
        current_date: dayjs(new Date()).format("YYYY-MM-DD"),
    }
    
    const paperHeight = (template?.paperHeight || 0) > paperRowHeight ? template?.paperHeight : paperRowHeight

    return <Box>
        <Box>
            <Stack direction={"row"} gap={2} mt={2} mr={2} justifyContent={"flex-end"}>
                <Button
                    color="inherit"
                    variant="outlined"
                    size="small"
                    onClick={handleExport}
                    aria-label="print"
                    startIcon={<BsFileExcel />}
                    // disabled={stageRef === null || stageRef.current === null}
                >
                    {t('@buttons.export')}
                </Button>
                <Button
                    color="inherit"
                    variant="outlined"
                    size="small"
                    onClick={handlePrint}
                    aria-label="print"
                    startIcon={<PrintIcon />}
                    // disabled={stageRef === null || stageRef.current === null}
                >
                    {t('@buttons.print')}
                </Button>
            </Stack>
        </Box>
        <Box>
            <Stage ref={stageRef} width={template?.paperWidth} height={paperHeight}>
                <Layer>
                    {template?.items?.slice().reverse().map((item, index) => {
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
                                return <AccountReportItem
                                    type={type}
                                    el={item}
                                    key={item.id}
                                    items={data.report}
                                    total={data.total}
                                />
                            }
                        } else {
                            if (item.type === 'text') {
                                return <LabelItem
                                    el={item}
                                    key={item.id}
                                    text={fillers[item.name]?.toString() as string ?? ''}
                                />
                            }
                            if (item.type === 'image') {
                                return <ImageItem
                                    el={item}
                                    url={fillers[item.name]?.toString() as string ?? ''}
                                    key={item.id}
                                />
                            }

                        }
                    })}
                </Layer>
            </Stage>
        </Box>
    </Box>
};
