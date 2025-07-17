import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { IMenuOptions, IRepoCollection } from "../interface";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_REPO } from "@common/constant";
import { useList } from "@refinedev/core";
import { REPO_COLLECTION_URL } from "../constant/server.urls";
import { FileBreadcrumbs } from "../component/breadcrumb";
import { YesNoEnum } from "@common/all.enum";
import { RepoManager } from "../component/manager";

export const StarredManager: React.FC = () => {
  const t = useTranslate(LANG_REPO, "starred")
  const [currentFolder, setCurrentFolder] = useState<IRepoCollection | undefined>()
  const [selectedFile, setSelectedFile] = useState<IRepoCollection | undefined>();
  const [menuAction, setMenuAction] = useState<IMenuOptions | undefined>({
    rename: false,
    newfolder: false,
    upload: false,
    move: false,
    share: false,
    starred: false,
    delete: false,
    restore: false,
    properties: false,
    copylink: false
  });

  const { data, refetch } = useList<IRepoCollection>({
    pagination: { pageSize: 100 },
    resource: REPO_COLLECTION_URL,
    meta: { customQuery: { ...(currentFolder?.id ? { parent_id: currentFolder.id } : { is_starred: YesNoEnum.Yes }), starred: true, file: true } },
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
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", ...(menuAction?.properties && selectedFile ? { mr: 300 } : {}) }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Typography variant="h5">{t("starred")}</Typography>
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
