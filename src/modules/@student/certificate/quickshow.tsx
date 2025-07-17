import {
  IStoreBilling,
} from "@inventory/interface";
import { Layer, Stage } from "react-konva";
import { useRef } from "react";
import Konva from "konva";
import { ITemplateData } from "src/editor/interface";
import { LabelItem } from "@components/editorItem/LabelItem";
import ImageItem from "@components/editorItem/ImageItem";
import EditorItem from "@components/editorItem/EditorItem";
import dayjs from "dayjs";
import { Box, Stack } from "@mui/material";
import { Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { handleStagePrint } from "@utils/stage.print";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_BILLING, LANG_STUDENT } from "@common/constant";
import { IStudentCertificate } from "@student/interface";

type CertificateViewProps = {
  certificate: IStudentCertificate
  template?: ITemplateData
  close?: any
}
export const CertificateQuickView = ({ certificate, template, close }: CertificateViewProps) => {
  const t = useTranslate(LANG_STUDENT, "certificate");
  const stageRef = useRef<Konva.Stage>(null);
  // TODO: check json parse
  const metadata = certificate.metadata
  // const metadata = JSON.parse(certificate.metadata as unknown as string ?? "{}")
  const handlePrint = () => {
    if (stageRef !== null && stageRef.current !== null) {
      handleStagePrint([stageRef.current]);
    }
  }
  const fillers: Record<string, string | number> = {
    ...(metadata),
    issue_date: dayjs(certificate.issue_date).format("YYYY-MM-DD"),
    current_date: dayjs(new Date()).format("YYYY-MM-DD"),
  }

  return <Box>
    <Box>
      <Stack direction={"row"} gap={2} p={1} justifyContent={"flex-end"}>
        <Button
          color="inherit"
          variant="outlined"
          size="small"
          onClick={handlePrint}
          aria-label="print"
          startIcon={<PrintIcon />}
        >
          {t('@buttons.print')}
        </Button>
      </Stack>
    </Box>
    <Box>
      <Stage ref={stageRef} width={template?.paperWidth} height={template?.paperHeight}>
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
