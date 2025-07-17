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
import { RxCrossCircled } from "react-icons/rx";
import { CiCircleCheck } from "react-icons/ci";
import { handleStagePrint } from "@utils/stage.print";
import { useUpdate } from "@refinedev/core";
import { useConfirm } from "@hooks/confirm.hook";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_ACCOUNT } from "@common/constant";
import { ACCOUNT_VOUCHER_URL } from "../constant/server.urls";
import { IAccountVoucher } from "../interface";
import { AccountVoucherStatusEnum } from "../constant/enum";
import { VoucherItem } from "@components/editorItem/VoucherItem";

type VoucherViewProps = {
  voucher: IAccountVoucher
  template?: ITemplateData
  close?: any
}
export const VoucherQuickView = ({ voucher, template, close }: VoucherViewProps) => {
  const t = useTranslate(LANG_ACCOUNT, "voucher");
  const stageRef = useRef<Konva.Stage>(null);
  const handlePrint = () => {
    if (stageRef !== null && stageRef.current !== null) {
      handleStagePrint([stageRef.current]);
    }
  }

  const fillers: Record<string, string | number> = {
    ...(voucher.meta ?? {}),
    current_date: dayjs(new Date()).format("YYYY-MM-DD"),
    approved_date: voucher.approved_date ? dayjs(voucher.approved_date).format("YYYY-MM-DD") : "",
    transaction_date: dayjs(voucher.transaction_date).format("YYYY-MM-DD"),
    voucher_state: voucher.state,
    voucher_type: voucher.type,
    discard_reason: voucher.discard_reason,
    narration: voucher.narration,
    transaction_amount: voucher.amount,
    transaction_no: voucher.transaction_no,
    voucher_no: voucher.voucher_no
  }

  const { mutate } = useUpdate()
  const [confirmApprove, confirmApproveEle] = useConfirm({
    confirmTitle: t("info.approve"),
    onConfirm: () => {
      mutate({
        resource: ACCOUNT_VOUCHER_URL,
        id: voucher.id,
        values: {
          state: AccountVoucherStatusEnum.Approved
        }
      }, {
        onSuccess: close
      })
    }
  })
  const [confirmDiscard, confirmDiscardEle] = useConfirm({
    confirmTitle: t("info.discard.title"),
    reason: {
      required: true,
      rows: 3,
      label: t("info.discard.label")
    },
    onConfirm: (_, reason) => {
      mutate({
        resource: ACCOUNT_VOUCHER_URL,
        id: voucher.id,
        values: {
          state: AccountVoucherStatusEnum.Discarded,
          reason
        }
      }, {
        onSuccess: close
      })
    }
  })


  return <Box>
    <Box>
      <Stack direction={"row"} gap={2} mt={2} mr={2} justifyContent={"flex-end"}>
        {voucher.state === AccountVoucherStatusEnum.Pending && (
          <>
            <Button
              color="success"
              size="small"
              variant="outlined"
              onClick={confirmApprove}
              aria-label="approve"
              startIcon={<CiCircleCheck />}
              // disabled={stageRef === null || stageRef.current === null}
            >
              {t('@buttons.approve')}
            </Button>
            <Button
              color="error"
              size="small"
              variant="outlined"
              onClick={confirmDiscard}
              aria-label="discard"
              startIcon={<RxCrossCircled />}
              // disabled={stageRef === null || stageRef.current === null}
            >
              {t('@buttons.discard')}
            </Button>
          </>
        )}

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
              if (item.type === 'subjectTable') {
                return <VoucherItem
                  el={item}
                  key={item.id}
                  items={voucher.items}
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
    {confirmApproveEle}
    {confirmDiscardEle}
  </Box>
};
