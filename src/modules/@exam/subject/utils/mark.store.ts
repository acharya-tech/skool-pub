import { ExamMarkCasType, IGradingRules, MarkListItem } from "@exam/interface";
import { create } from "zustand";

interface MarkState {
  markList: Record<number, MarkListItem>;
  gradingRules: IGradingRules | null;
  resetVal: number;
  search: string;
  inputColumn: ExamMarkCasType;
  fullScreen: boolean;
  setFullScreen: (fullScreen: boolean) => void;
  setGradingRule: (rule: IGradingRules) => void;
  setInputColumn: (column: ExamMarkCasType) => void;
  addMark: (mark: MarkListItem) => void;
  addImport: (marks: Record<number, MarkListItem>) => void;
  removeMark: (id: number) => void;
  setSearch: (search: string) => void;
  resetMarks: () => void;
}

export const useMarkStore = create<MarkState>((set, get) => ({
  inputColumn: {},
  resetVal: 0,
  search: "",
  markList: {},
  gradingRules: null,
  originalMarks: {},
  fullScreen: false,
  setFullScreen: (fullScreen: boolean) => set({ fullScreen }),
  setGradingRule: (rule: IGradingRules) => set({ gradingRules: rule }),
  setInputColumn: (column: ExamMarkCasType) => set({ inputColumn: column }),
  addImport: (marks: Record<number, MarkListItem>) => {
    set({ markList: { ...get().markList, ...marks } });
  },
  addMark: (mark: MarkListItem) =>
    set({ markList: { ...get().markList, [mark.id]: { ...mark } } }),
  removeMark: (id: number) => {
    const { markList } = get();
    console.log("markList before", markList);
    delete markList[id];
    console.log("markList after", markList);
    set({ markList });
  },
  setSearch: (search: string) => set({ search }),
  resetMarks: () => set({ markList: {} }),
}));
