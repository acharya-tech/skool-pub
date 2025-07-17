import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IMenuOptions, IRepoCollection } from "../interface";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_REPO } from "@common/constant";
import { useList } from "@refinedev/core";
import { REPO_COLLECTION_URL } from "../constant/server.urls";
import { FileBreadcrumbs } from "../component/breadcrumb";
import { RepoManager } from "../component/manager";

export const FileManager: React.FC = () => {
  const t = useTranslate(LANG_REPO, "repo")
  const [currentFolder, setCurrentFolder] = useState<IRepoCollection | undefined>()
  const [selectedFile, setSelectedFile] = useState<IRepoCollection | undefined>();
  const [menuAction, setMenuAction] = useState<IMenuOptions | undefined>({
    rename: false,
    newfolder: false,
    upload: false,
    move: false,
    share: false,
    delete: false,
    restore: false,
    starred: false,
    properties: false,
    copylink: false
  });

  const { data, refetch } = useList<IRepoCollection>({
    pagination: { pageSize: 100 },
    resource: REPO_COLLECTION_URL,
    meta: { customQuery: { parent_id: currentFolder?.id ?? 'root', file: true, starred: true } },
    sorters: [{
      field: 'type',
      order: 'asc'
    },
    {
      field: 'label',
      order: 'asc'
    }
    ]
  })
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", ...(menuAction?.properties && selectedFile ? { mr: "300px" } : {}) }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Typography variant="h5">{t("repo")}</Typography>
        <Stack spacing={2} direction={'row'}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedFile(currentFolder)
              setMenuAction({ newfolder: true })
            }}
          >
            {t("actions.newFolder")}
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedFile(currentFolder)
              setMenuAction({ upload: true })
            }}
          >
            {t("actions.upload")}
          </Button>
        </Stack>
      </Box>
      <FileBreadcrumbs current={currentFolder} setCurrent={setCurrentFolder} />
      <Divider />
      <RepoManager
        files={data?.data}
        refetch={refetch}
        menuAction={menuAction}
        setMenuAction={setMenuAction}
        setCurrentFolder={setCurrentFolder}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile} />
    </Box>
  );
};
