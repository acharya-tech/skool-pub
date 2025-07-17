import { useList, useOne } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";

import { LANG_REPO } from "@common/constant";

import { useState, useCallback } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import { CONFIG } from 'src/global-config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Scrollbar } from 'src/components/scrollbar';

import { FileUpgrade } from '../component/file-manager/file-upgrade';
import { FileRecentItem } from '../component/file-manager/file-recent-item';
import { FileDataActivity } from '../component/file-manager/file-data-activity';
import { FileManagerPanel } from '../component/file-manager/file-manager-panel';
import { FileStorageOverview } from '../component/file-manager/file-storage-overview';
import { FileManagerFolderItem } from '../component/file-manager/file-manager-folder-item';
import { FileManagerNewFolderDialog } from '../component/file-manager/file-manager-new-folder-dialog';
import { StorageWidget } from "../component/file-manager/storage-widget";
import { REPO_COLLECTION_URL, REPO_DASHBOARD_URL } from "@repo/constant/server.urls";
import { REPO_DASHBOARD_STORAGE_STATUS_ID, REPO_DASHBOARD_STORAGE_USED_ID } from "@repo/constant/constant";
import { IRepoCollection, IRepoStorageConfig, IRepoStorageUsed } from "@repo/interface";
import { getMapFileCategoryToIcon } from "@repo/utils";
import { CollectionType } from "@repo/constant/enum";


// ----------------------------------------------------------------------
export const RepoDashboard = () => {
    const t = useTranslate(LANG_REPO, "dashboard");
    const { data: storageUsedDataRaw } = useOne<IRepoStorageUsed[]>({
        resource: REPO_DASHBOARD_URL,
        id: REPO_DASHBOARD_STORAGE_USED_ID
    })

    const { data: storageStatusData } = useOne<IRepoStorageConfig>({
        resource: REPO_DASHBOARD_URL,
        id: REPO_DASHBOARD_STORAGE_STATUS_ID
    })

    const { data: recentFileRaws } = useList<IRepoCollection>({
        resource: REPO_COLLECTION_URL,
        pagination: {
            pageSize: 10
        },
        meta: {
            customQuery: {
                type: CollectionType.File,
                starred: true,
                file: true,
                shared: true,
                user: true
            }
        }
    })

    const { data: recentFolderRaws } = useList<IRepoCollection>({
        resource: REPO_COLLECTION_URL,
        pagination: {
            pageSize: 10
        },
        meta: {
            customQuery: {
                type: CollectionType.Folder,
                starred: true,
                shared: true,
                user: true
            }
        }
    })

    const [folderName, setFolderName] = useState('');

    const [files, setFiles] = useState<(File | string)[]>([]);

    const newFilesDialog = useBoolean();
    const newFolderDialog = useBoolean();

    const handleChangeFolderName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFolderName(event.target.value);
    }, []);

    const handleCreateNewFolder = useCallback(() => {
        newFolderDialog.onFalse();
        setFolderName('');
        console.info('CREATE NEW FOLDER');
    }, [newFolderDialog]);

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            setFiles([...files, ...acceptedFiles]);
        },
        [files]
    );


    const storageUsedData = (storageUsedDataRaw?.data ?? []).map((item: IRepoStorageUsed) => {
        return {
            name: item.file_type,
            usedStorage: item.file_size,
            filesCount: item.file_count,
            icon: <Box component="img" src={getMapFileCategoryToIcon(item.file_type)} />,
        }
    })

    const renderStorageOverview = () => (
        <FileStorageOverview
            used={storageStatusData?.data?.storageUsed ?? 0}
            available={storageStatusData?.data?.storageLimit ?? 0}
            chart={{ series: Math.round((Number(storageStatusData?.data?.storageUsed ?? 0) / Number(storageStatusData?.data?.storageLimit ?? 0)) * 100) }}
            data={storageUsedData}
        />
    );

    const renderNewFilesDialog = () => (
        <FileManagerNewFolderDialog open={newFilesDialog.value} onClose={newFilesDialog.onFalse} />
    );

    const renderNewFolderDialog = () => (
        <FileManagerNewFolderDialog
            open={newFolderDialog.value}
            onClose={newFolderDialog.onFalse}
            title="New Folder"
            folderName={folderName}
            onChangeFolderName={handleChangeFolderName}
            onCreate={handleCreateNewFolder}
        />
    );

    return (
        <>
            <DashboardContent maxWidth="xl">
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <StorageWidget
                            title={t("labels.storageCapicity")}
                            value={storageStatusData?.data?.storageLimit ?? 0}
                            icon={`${CONFIG.assetsDir}/assets/icons/apps/ic-app-storage-capacity.png`}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <StorageWidget
                            title={t("labels.storageUsed")}
                            value={storageStatusData?.data?.storageUsed ?? 0}
                            icon={`${CONFIG.assetsDir}/assets/icons/apps/ic-app-storage-used.png`}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <StorageWidget
                            title={t("labels.storageAvailable")}
                            value={(Number(storageStatusData?.data?.storageLimit ?? 0) - Number(storageStatusData?.data?.storageUsed ?? 0))}
                            icon={`${CONFIG.assetsDir}/assets/icons/apps/ic-app-storage-available.png`}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                        <FileDataActivity title={t("labels.dataActivity")} />
                        <Box sx={{ mt: 5 }}>
                            <FileManagerPanel
                                title="Folders"
                                // link={paths.dashboard.fileManager}
                                onOpen={newFolderDialog.onTrue}
                            />
                            <Scrollbar sx={{ mb: 3, minHeight: 186 }}>
                                <Box sx={{ gap: 3, display: 'flex' }}>
                                    {recentFolderRaws?.data.map((folder) => (
                                        <FileManagerFolderItem
                                            key={folder.id}
                                            folder={folder}
                                            onDelete={() => console.info('DELETE', folder.id)}
                                            sx={{
                                                ...(recentFolderRaws?.data?.length > 3 && {
                                                    width: 240,
                                                    flexShrink: 0,
                                                }),
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Scrollbar>
                            <FileManagerPanel
                                title={t("labels.recentFiles")}
                                // link={paths.dashboard.fileManager}
                                onOpen={newFilesDialog.onTrue}
                            />
                            <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
                                {recentFileRaws?.data.slice(0, 5).map((file) => (
                                    <FileRecentItem
                                        key={file.id}
                                        file={file}
                                        onDelete={() => console.info('DELETE', file.id)}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{renderStorageOverview()}</Box>
                            <FileUpgrade />
                        </Box>
                    </Grid>
                </Grid>
            </DashboardContent>
            {renderNewFilesDialog()}
            {renderNewFolderDialog()}
        </>
    );
}

