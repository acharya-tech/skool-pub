import { Link } from "react-router-dom";
import { IClass, IProgram } from "@academic/interface";
import { Card, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { getQueryParam } from "@utils/other";
import { STUDENT_CURRENT_LIST } from "../constant/local.urls";
import { SiGoogleclassroom } from "react-icons/si";

type ClassCardProps = {
    program: IProgram
}

const ProgramCard = ({ program }: ClassCardProps) => {
    return (
        <Link to={'/' + getQueryParam(STUDENT_CURRENT_LIST, { programid: program.id })}>
            <Card>
                <Stack
                    direction="row"
                    gap={4}
                    justifyItems={"center"}
                    alignItems={"center"}
                    height={100}
                    padding={5}
                >
                    <SiGoogleclassroom size={50} />
                    <Typography
                        style={{
                            marginTop: "12px",
                        }}
                    >
                        {program.name}
                    </Typography>
                </Stack>
            </Card>
        </Link>
    );
};

type ProgramCardListProps = {
    programs: IProgram[]
}

export const ProgramCardList = ({ programs }: ProgramCardListProps) => {
    return (
        <Grid
            container
            spacing={3}
            sx={{
                marginTop: "6px",
            }}
        >
            {programs.map(e => {
                return <Grid key={e.id} size={3}>
                    <ProgramCard program={e} />
                </Grid>
            })}
        </Grid >
    );
}