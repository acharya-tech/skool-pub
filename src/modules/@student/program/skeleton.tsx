import { Card, Grid2 as Grid, Skeleton, Stack } from "@mui/material";


const CardSkeleton = () => {
    return <Grid size={3}>
        <Card>
            <Stack
                direction="row"
                gap={4}
                justifyItems={"center"}
                alignItems={"center"}
                height={100}
                padding={5}
            >
                <Skeleton variant="circular" width={60} height={60} />
                <Skeleton variant="text" sx={{ fontSize: '1.2rem' }} width={100} />
            </Stack>
        </Card>
    </Grid>
}

export const ProgramCardSkeleton = () => {

    return (
        <Grid
            container
            spacing={3}
            sx={{
                marginTop: "24px",
            }}
        >
            <CardSkeleton />
            <CardSkeleton />
        </Grid >
    );
};