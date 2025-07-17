import {
  useList,
  type HttpError
} from "@refinedev/core";
import { Box, Divider, Grid } from "@mui/material";
import { IProgram } from "@academic/interface";
import { ProgramCardSkeleton } from "./skeleton";
import { ProgramCardList } from "./program.card";
import Error500 from "@components/error/Error500";
import { ACADEMIC_PROGRAM_LIST } from "@academic/constant/urls";
import { TableListProp } from "src/interfaces";

export const ProgramListTable = ({ search }: TableListProp) => {
  const { data, isLoading, error } = useList<
    IProgram,
    HttpError
  >({
    resource: ACADEMIC_PROGRAM_LIST,
    filters: [{
      field: "name",
      value: search,
      operator: "eq"
    }]
  });

  if (isLoading) {
    return <ProgramCardSkeleton />
  }

  if (error) {
    return <Error500 />
  }

  return (
    <Box>
      <Divider />
      <ProgramCardList programs={data.data} />
    </Box>
  );

};

