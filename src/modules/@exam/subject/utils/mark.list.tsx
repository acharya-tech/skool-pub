import { Chip } from "@mui/material";
import { ExmResultRemarkEnum } from "../../constant/enum";
import { IGradingRules, MarkListItem } from "../../interface";
import { YesNoEnum } from "@common/all.enum";

export const getMarkRemark = (row: MarkListItem) => {
  const isSet = row.is_absent == YesNoEnum.Yes || (row.cas.internal_obtained != null || row.cas.theory_obtained != null || row.cas.project_obtained != null || row.cas.engage_obtained != null);
  if (row.obtain_mark !== null) {
    return row.remark
  } else if (isSet) {
    return ExmResultRemarkEnum.Updated
  } else {
    return ExmResultRemarkEnum.Not_Set
  }
};

export const MarkRemarkLabel = ({ remark }: { remark: ExmResultRemarkEnum }) => {
  let color = "warning";
  if (remark === ExmResultRemarkEnum.Passed) {
    color = "success";
  } else if (remark === ExmResultRemarkEnum.Failed) {
    color = "error";
  } else if (remark === ExmResultRemarkEnum.Updated) {
    color = "info";
  }
  return <Chip size="small" color={color as any} label={remark} />;
};


export const setValidMark = (
  mark: MarkListItem,
  value: string,
  type: string,
  rule: IGradingRules
) => {
  if (!value && value != "0") {
    return {
      ...mark,
      cas: {
        ...mark.cas,
        [type]: null
      },
      obtain_mark: null,
      error: { ...mark.error, [type]: null },
      remark: ExmResultRemarkEnum.Not_Set,
    };
  }
  const [ruleName] = type.split("_")
  return {
    ...mark,
    cas: {
      ...mark.cas,
      [type]: Number(value)
    },
    obtain_mark: null,
    error: {
      ...mark.error,
      [type]: Number(value) > Number(rule[`${ruleName}Threshold` as keyof IGradingRules]) ? true : undefined,
    },
  };
};

export const setImportValidMark = (
  mark: MarkListItem,
  rule: IGradingRules
) => {
  if (mark.is_absent == YesNoEnum.Yes) {
    return {
      ...mark,
      cas: {},
      obtain_mark: null,
      error: {},
      remark: ExmResultRemarkEnum.Updated,
    };
  }
  Object.keys(mark.cas).forEach((key) => {
    const [ruleName] = key.split("_")
    if (mark.cas[key as keyof typeof mark.cas] == null) return

    if (Number(mark.cas[key as keyof typeof mark.cas]) > Number(rule[`${ruleName}Threshold` as keyof IGradingRules])) {
      mark.error = {
        ...mark.error,
        [key]: true,
      };
    }
  })
  return {
    ...mark,
    remark: ExmResultRemarkEnum.Updated,
  };
};