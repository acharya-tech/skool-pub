export const TEMPLATE_MAX_ZOOM = 3;
export const TEMPLATE_MIN_ZOOM = 0.2;

export type TextAlighTypes = "left" | "center" | "right";
export enum PrintablePaperEnum {
  A6 = "A6",
  A5 = "A5",
  A4 = "A4",
  Card = "Card",
  Custom = "Custom",
}
type ItemCategory = "filler" | "element";
export type ItemTypes =
  | "image"
  | "text"
  | "line"
  | "editor"
  | "subjectTable"
  | "ledgerTable";
interface BaseItem {
  id: string;
  name: string;
  category: ItemCategory;
  type: ItemTypes;
  height: number;
  width: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  x: number;
  y: number;
  locked: boolean;
  hidden: boolean;
  opacity: number;
  isSelected: boolean;
}
export interface IItemImage extends BaseItem {
  type: "image";
  url: string;
}

export interface IItemEditor extends BaseItem {
  type: "editor";
  editable: string;
  uri: any;
}

export interface IItemSubjectTableColumn {
  id: string;
  label: string;
  isDummy?: boolean;
  width: number;
  height: number;
  textAlign: TextAlighTypes;
}
export interface IItemSubjectTable extends BaseItem {
  type: "subjectTable";
  tableId: string;
  rows: number;
  color: string;
  cellWidth: number;
  cellHeight: number;
  fontSize: number;
  bold: boolean;
  cellPadding: number;
  colHeight: number;
  rowHeight: number;
  columns: IItemSubjectTableColumn[];
}

export interface IItemLedgerTable extends BaseItem {
  type: "ledgerTable";
  tableId: string;
  rows: number;
  color: string;
  cellWidth: number;
  cellHeight: number;
  fontSize: number;
  bold: boolean;
  cellPadding: number;
  colHeight: number;
  rowHeight: number;
  columns: IItemSubjectTableColumn[];
}

export interface IItemLabel extends BaseItem {
  type: "text";
  text: string;
  fontSize: number;
  color: string;
  bold: boolean;
  italic: boolean;
  textAlign: TextAlighTypes;
}

export interface IItemLine extends BaseItem {
  type: "line";
  color: string;
}

export type IItem =
  | IItemImage
  | IItemLabel
  | IItemLine
  | IItemEditor
  | IItemSubjectTable
  | IItemLedgerTable;

export type MenuActionType =
  | "delete"
  | "edit"
  | "hide"
  | "show"
  | "lock"
  | "unlock"
  | "clone"
  | "top"
  | "bottom"
  | null;
export interface IMenuContext {
  action: MenuActionType;
  element: IItem | null;
  open: boolean;
  position?: { x: number; y: number };
}

export const PAPER_SIZES = {
  [PrintablePaperEnum.A4]: { width: 794, height: 1123 },
  [PrintablePaperEnum.A5]: { width: 561, height: 794 },
  [PrintablePaperEnum.A6]: { width: 398, height: 561 },
  [PrintablePaperEnum.Card]: { width: 204, height: 323 },
  [PrintablePaperEnum.Custom]: { width: 500, height: 500 },
};

export enum PaperOrientationEnum {
  PORTRAIT = "portrait",
  LANDSCAPE = "landscape",
}

export interface ITemplateData {
  paperSize: PrintablePaperEnum;
  paperOrientation: PaperOrientationEnum;
  paperWidth: number;
  paperHeight: number;
  items: IItem[];
}

export interface ITempConstrants {
  element: ITempElement[];
  fillers: ITempFiller[];
  paperSize: ITempPaperSize;
  paperMargin: ITempPaperMargin;
  paperOrientation: PaperOrientationEnum;
}

export interface ITempElement {
  name: string;
  category: "element";
  tableId?: string;
  type: "text" | "image" | "line" | "editor" | "subjectTable" | "ledgerTable";
}

export interface ITempFiller {
  name: string;
  type: "image" | "text";
  category: "filler";
  url?: string;
}

export interface ITempPaperMargin {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface ITempPaperSize {
  A3: string;
  A4: string;
  A5: string;
  Custom: string;
}
