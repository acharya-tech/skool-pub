import { Box, Paper, Skeleton, Typography } from "@mui/material"

export const ItemSkeleton = () => {
    const textWidth = Math.floor(Math.random() * 100);
    return <Box
        m={2}
        width={150}
        height={150}
    >
        <Box
            width="100%"
            height="100%"
            textAlign="center"
        >
            <Skeleton variant="rounded" width={125} height={125} />
            <Typography
                variant="body2"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                width="100%"
                mt={1}
            >
                <Skeleton variant="text" height={30} width={(textWidth < 50 ? 50 : textWidth)} />
            </Typography>
        </Box>
    </Box>
}