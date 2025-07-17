import React, { useEffect, useState } from "react";
import {
    Box,
    Grid2 as Grid,
    Snackbar,
} from "@mui/material";
import { MenuList } from "../component/menu";
import { IMenuOptions, IRepoCollection } from "../interface";
import { RenameDialog } from "../component/dialog/rename";
import { ItemThumb } from "../component/item";
import { NewFolderDialog } from "../component/dialog/folder";
import { UploadDialog } from "../component/dialog/upload";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_REPO } from "@common/constant";
import { useCreate, useDelete } from "@refinedev/core";
import { REPO_COLLECTION_URL, REPO_STARRED_URL } from "../constant/server.urls";
import { CollectionType } from "../constant/enum";
import EmptyData from "@components/error/EmptyData";
import { useConfirm } from "@hooks/confirm.hook";
import { MoveDialog } from "../component/dialog/move";
import { RestoreDialog } from "./dialog/restore";
import { ItemSkeleton } from "./item.skeleton";
import { PropertiesDialog } from "./dialog/properties";

type RepoManagerProps = {
    files?: IRepoCollection[],
    refetch: () => void
    setCurrentFolder: React.Dispatch<React.SetStateAction<IRepoCollection | undefined>>,
    menuAction: IMenuOptions | undefined,
    setMenuAction: React.Dispatch<React.SetStateAction<IMenuOptions | undefined>>,
    selectedFile: IRepoCollection | undefined,
    setSelectedFile: React.Dispatch<React.SetStateAction<IRepoCollection | undefined>>,
}
export const RepoManager = ({ files, refetch, setCurrentFolder, selectedFile, menuAction, setMenuAction, setSelectedFile }: RepoManagerProps) => {
    const t = useTranslate(LANG_REPO, "repo")
    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
        file: IRepoCollection | null;
    } | null>(null);
    useEffect(() => {
        document.addEventListener("click", handleCloseContextMenu);
        return () => {
            document.removeEventListener("click", handleCloseContextMenu);
        }
    }, [])


    /* Perform delete action on user confirmation*/
    const { mutate } = useDelete()
    const [setConfirm, ConfirmEle] = useConfirm({
        onConfirm: (data: IRepoCollection) => {
            mutate({
                resource: REPO_COLLECTION_URL,
                id: data.id,
            }, {
                onSuccess: () => {
                    setSelectedFile(undefined)
                }
            })
        }
    })

    /* Handle menu starred and delete action */
    const { mutate: createStarred } = useCreate()
    useEffect(() => {
        if (menuAction?.delete) {
            setConfirm(selectedFile)
        }

        if (menuAction?.starred) {
            createStarred({
                resource: REPO_STARRED_URL,
                values: { collection: selectedFile }
            }, {
                onSuccess: () => {
                    handleCloseMenu()
                    refetch()
                }
            })
        }
    }, [menuAction])



    const handleCloseMenu = () => {
        setMenuAction(undefined)
    }

    // Open context menu
    const handleContextMenu = (event: React.MouseEvent<HTMLElement>, file: IRepoCollection) => {
        event.preventDefault();
        setSelectedFile(file);
        setContextMenu({
            mouseX: event.clientX,
            mouseY: event.clientY,
            file,
        });
    };

    // Close context menu
    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    if (!files) {
        return <Box>
            <Grid container spacing={1} gap={2}>
                <Grid size={6} >
                    <ItemSkeleton />
                </Grid>
                <Grid size={6} >
                    <ItemSkeleton />
                </Grid>
                <Grid size={6} >
                    <ItemSkeleton />
                </Grid>
            </Grid>
        </Box>
    }

    return (
        <Box minHeight="100vh">
            <Box>
                <Grid container>
                    {files.map((file) => {
                        return <Grid size={3}>
                            <ItemThumb
                                key={file.id}
                                navigate={() => {
                                    if (file.type == CollectionType.Folder) {
                                        setCurrentFolder(file)
                                    }
                                }}
                                currentId={selectedFile?.id}
                                collection={file}
                                onClick={setSelectedFile}
                                setMenu={(e) => {
                                    handleContextMenu(e, file)
                                }} />

                        </Grid>
                    }
                    )}
                    {files.length == 0 && <Grid size={12}>
                        <EmptyData height="60vh" title={t("message.noData")} description={t("message.createNew")} />
                    </Grid>}
                </Grid>
            </Box>
            {contextMenu && selectedFile && (
                <MenuList
                    anEle={{
                        top: contextMenu.mouseY,
                        left: contextMenu.mouseX,
                    }}
                    action={setMenuAction}
                    onClose={handleCloseContextMenu}
                    collection={contextMenu.file!}
                />
            )}
            {menuAction?.rename && selectedFile && (
                <RenameDialog onClose={handleCloseMenu} collection={selectedFile} />
            )}
            {menuAction?.upload && (
                <UploadDialog onClose={handleCloseMenu} selected={selectedFile} />
            )}
            {menuAction?.newfolder && (
                <NewFolderDialog onClose={handleCloseMenu} selected={selectedFile} />
            )}
            {menuAction?.move && selectedFile && (
                <MoveDialog onClose={handleCloseMenu} selected={selectedFile} />
            )}
            {menuAction?.restore && selectedFile && (
                <RestoreDialog onClose={handleCloseMenu} selected={selectedFile} />
            )}
            {menuAction?.properties && selectedFile && (
                <PropertiesDialog onClose={handleCloseMenu} selected={selectedFile} />
            )}
            {menuAction?.copylink && selectedFile && (
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={true}
                    onClose={handleCloseMenu}
                    message="Link copied to clipboard"
                />
            )}
            {ConfirmEle}
        </Box>
    );
};
