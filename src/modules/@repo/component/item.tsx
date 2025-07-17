import { Box, Paper, Typography } from "@mui/material"
import { IRepoCollection } from "../interface"
import { CollectionType } from "../constant/enum";
import { FileThumb } from "./file";
import { FolderThumb } from "./folder";

type ItemProps = {
    collection: IRepoCollection
    setMenu: (target: any) => void
    navigate: (item: IRepoCollection | undefined) => void
    onClick: (item: IRepoCollection | undefined) => void
    currentId: string | undefined
}

export const ItemThumb = ({ collection, navigate, setMenu, onClick, currentId }: ItemProps) => {
    return <Box
        m={2}
        width={150}
        height={150}
        onClick={() => onClick(collection.id == currentId ? undefined : collection)}
    >
        {collection.type == CollectionType.File && (<FileThumb {...{ collection, setMenu, onClick, currentId }} />)}
        {collection.type == CollectionType.Folder && (<FolderThumb  {...{ collection, setMenu, onClick, currentId,navigate }} />)}
    </Box>
}