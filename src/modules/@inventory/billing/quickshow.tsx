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
import { StoreBillItem } from "@components/editorItem/StoreBillItem";
import { Box, Stack } from "@mui/material";
import { Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import { handleStagePrint } from "@utils/stage.print";
import { useDelete } from "@refinedev/core";
import { useConfirm } from "@hooks/confirm.hook";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_INVENTORY } from "@common/constant";
import { INVENTORY_BILLING_LIST } from "../constant";

type BillingViewProps = {
  bill: IStoreBilling
  template: ITemplateData
  close?: any
}
export const BillingQuickView = ({ bill, template, close }: BillingViewProps) => {
  const t = useTranslate(LANG_INVENTORY, "billing");
  const stageRef = useRef<Konva.Stage>(null);
  const handlePrint = () => {
    if (stageRef !== null && stageRef.current !== null) {
      handleStagePrint([stageRef.current]);
    }
  }
  const fillers: Record<string, string | number> = {
    ...(bill.meta ?? {}),
    current_date: dayjs(new Date()).format("YYYY-MM-DD"),
    bill_date: dayjs(bill.meta?.bill_date).format("YYYY-MM-DD"),
  }

  const { mutate } = useDelete()
  const [confirmDelete, confirmEle] = useConfirm({
    confirmTitle: t("info.deleteTitle"),
    onConfirm: () => {
      mutate({
        resource: INVENTORY_BILLING_LIST,
        id: bill.id
      }, {
        onSuccess: close
      })
    }
  })

  return <Box>
    <Box>
      <Stack direction={"row"} gap={2} mt={2} mr={2} justifyContent={"flex-end"}>
        <Button
          color="error"
          size="small"
          variant="outlined"
          onClick={confirmDelete}
          aria-label="delete"
          startIcon={<DeleteIcon />}
          // disabled={stageRef === null || stageRef.current === null}
        >
          {t('@buttons.delete')}
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
                return <StoreBillItem
                  el={item}
                  key={item.id}
                  items={bill.items}
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
    {confirmEle}
  </Box>
};
