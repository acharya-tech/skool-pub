import { Box, Paper, Typography } from "@mui/material";
import { IRepoCollection } from "../interface";
import FolderIcon from "@mui/icons-material/Folder";

type FolderProps = {
    collection: IRepoCollection;
    setMenu: (target: any) => void;
    currentId: string | undefined;
    navigate: (item: IRepoCollection | undefined) => void
};

export const FolderThumb = ({ collection, setMenu, currentId,navigate }: FolderProps) => {
    const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenu(event);
    };
    return (
        <Box
            width="100%"
            height="100%"
            textAlign="center"
            onContextMenu={(e) => handleContextMenu(e)}
            onDoubleClick={() => navigate(collection)}
        >
            <Paper
                elevation={1}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 2,
                    cursor: "pointer",
                    backgroundColor: currentId === collection.id ? "beige" : "white",
                    height: "125px", // Adjust height to match FileThumb for consistency
                }}
            >
                <FolderIcon sx={{ fontSize: "64px", color: "#3f51b5" }} />
            </Paper>
            <Typography
                variant="body2"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                width="100%"
                mt={1}
            >
                {collection.label}
            </Typography>
        </Box>
    );
};
