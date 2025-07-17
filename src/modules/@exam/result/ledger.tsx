import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Stack, Typography } from "@mui/material";
import { useList } from "@refinedev/core";
import { IExmResult, IExmVersion } from "../interface";
import LoadingWrapper from "@components/other/loading";
import { IDataValue } from "@datavalue/interface";
import { DATAVALUE_URL } from "@datavalue/constant/server.url";
import { PrintViewLedger } from "./component/print.view.ledger";
import { useEffect, useState } from "react";
import Konva from "konva";
import { handleStagePrint } from "@utils/stage.print";
import PrintIcon from "@mui/icons-material/Print";
import { DataKeyTemplateEnum } from "@datavalue/constant/enum";

type ViewResultProps = {
  results: IExmResult[]
  version: IExmVersion
  title: string
  type: "grade" | "mark"
  onClose: () => void
}
export const ViewLedger = ({ type, results, version, title, onClose }: ViewResultProps) => {
  const [stageRefs, setRefs] = useState<Record<number, Konva.Stage>>({});
  const [template, setTemplate] = useState<any>({})
  const { data: templateQuery, isLoading: templateLoading } = useList<IDataValue>({
    resource: DATAVALUE_URL,
    meta: {
      customQuery: {
        data_key: [DataKeyTemplateEnum.EXAM_MARK_LEDGER, DataKeyTemplateEnum.EXAM_GRADE_LEDGER],
        id: type == "grade" ? version.routine.grade_ledger_template_id : version.routine.mark_ledger_template_id,
      }
    }
  });

  useEffect(() => {
    if (templateQuery) {
      const temp = JSON.parse(templateQuery?.data[0]?.data_value as string ?? "{}")
      setTemplate(temp)
    }
  }, [templateQuery])

  const handlePrint = () => {
    handleStagePrint(Object.values(stageRefs));
  }
  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth={"xl"}
      onClose={onClose}
      keepMounted={false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h6">{title}</Typography>
          <Button
            color="inherit"
            size="small"
            onClick={handlePrint}
            aria-label="print"
          >
            <PrintIcon />
          </Button>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box>
          <LoadingWrapper value={template}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
              <PrintViewLedger setRefs={setRefs} template={template} results={results} version={version} />
            </Box>
          </LoadingWrapper>
        </Box>
      </DialogContent>
    </Dialog>
  );
};


