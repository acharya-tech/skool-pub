import { HttpError, useList } from "@refinedev/core";
import { useParams } from "react-router-dom";
import { IProgram } from "@academic/interface";
import { ACADEMIC_PROGRAM_LIST } from "@academic/constant/urls";

type ClassProgramRes = {
  current: IProgram | undefined;
  programs: IProgram[] | undefined;
};

export function useClassProgram(): ClassProgramRes | undefined {
  const { programid } = useParams();
  const { data } = useList<IProgram, HttpError>({
    resource: ACADEMIC_PROGRAM_LIST,
    pagination: {
      pageSize: 100,
    },
  });
  const program = data?.data.find((e) => e.id == programid);
  return {
    current:
      programid == "all"
        ? {
            name: "All",
            id: "all",
            type: "all",
            affiliation: "all",
            faculty: "all",
          }
        : program,
    programs: data?.data,
  };
}
