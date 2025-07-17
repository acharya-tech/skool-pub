import { Avatar, Box, Paper, Typography } from "@mui/material";
import { IRepoCollection } from "../interface";

type FolderProps = {
    collection: IRepoCollection;
    setMenu: (target: any) => void;
    currentId: string | undefined;
};

export const FileThumb = ({ collection, setMenu, currentId }: FolderProps) => {
    const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenu(event);
    };

    return (
        <Box
            width={"100%"}
            height={"100%"}
            textAlign={"center"}
            onContextMenu={(e) => handleContextMenu(e)}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Paper
                sx={{
                    p: 1,
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: currentId === collection.id ? "beige" : "transparent",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Avatar
                    variant="square"
                    sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover", // Ensures the image fits the grid cell
                        borderRadius: "4px", // Optional for better aesthetics
                    }}
                    src={collection.file?.url}
                />
            </Paper>
            <Typography
                variant="body2"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                width={"100%"}
                mt={1}
            >
                {collection.label}
            </Typography>
        </Box>
    );
};
