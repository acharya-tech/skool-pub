import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Stack, Typography } from "@mui/material";
import { IExmResult, IExmVersion } from "../interface";
import { PrintViewSheet } from "./component/print.view";
import { ITemplateData } from "src/editor/interface";
import PrintIcon from "@mui/icons-material/Print";  // Import the print icon
import { useState } from "react";
import Konva from "konva";
import { handleStagePrint } from "@utils/stage.print";

type ViewResultProps = {
  title: string;
  results: IExmResult[];
  version: IExmVersion;
  onClose: () => void;
};

export const ViewResult = ({ title, results, version, onClose }: ViewResultProps) => {
  const [stageRefs, setRefs] = useState<Record<number, Konva.Stage>>({});

  const template = JSON.parse(version.template as string ?? "{}") as ITemplateData;

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
                    key={result.id + version.id}
                    template={template}
                    result={result}
                    version={version}
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
