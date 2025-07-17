import { BillFeeReleaseDuplicateEnum } from "../constant";
import { IBillFeeClass } from "./interface";

export type FeeReleaseType = {
  fee: IBillFeeClass;
  amount: number;
};
export type FeeReleaseTypeList = {
  [key: string]: FeeReleaseType;
};

export type FeeReleaseTabState = {
  label: string;
  icon?: React.ReactElement;
  oldRelease: number;
  duplicate: BillFeeReleaseDuplicateEnum | null;
  loaded: boolean;
};
export type FeeReleaseTabStateObject = {
  [key: string]: FeeReleaseTabState;
};
