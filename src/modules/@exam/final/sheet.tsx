import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { IExmFinalResult, IExmResult, IExmRoutine, IExmVersion } from "../interface";
import LoadingWrapper from "@components/other/loading";
import { IDataValue } from "@datavalue/interface";
import { DATAVALUE_URL } from "@datavalue/constant/server.url";
import { PrintViewSheet } from "./component/print.view";
import { ITemplateData } from "src/editor/interface";
import PrintIcon from "@mui/icons-material/Print";  // Import the print icon
import { useState } from "react";
import Konva from "konva";
import { handleStagePrint } from "@utils/stage.print";

type ViewResultProps = {
  title: string;
  results: IExmFinalResult[];
  template: IDataValue;
  onClose: () => void;
};

export const ViewResult = ({ title, results, template: tdata, onClose }: ViewResultProps) => {
  const [stageRefs, setRefs] = useState<Record<number, Konva.Stage>>({});

  const template = JSON.parse(tdata.data_value as string ?? "{}") as ITemplateData;

  const handlePrint = () => {
    handleStagePrint(Object.values(stageRefs));
  }

  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth={"md"}
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
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            {results.map((result) => (
              <>
                <PrintViewSheet
                  setRefs={setRefs}
                  key={result.id}
                  template={template}
                  result={result}
                />
                <Divider />
              </>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
