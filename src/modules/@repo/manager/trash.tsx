import React, { useState } from "react";
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


export const TrashManager: React.FC = () => {
  const t = useTranslate(LANG_REPO, "trash")
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
    meta: { customQuery: { ...(currentFolder?.id ? { parent_id: currentFolder.id } : { is_deleted: YesNoEnum.Yes }), deleted_at: 'not null', file: true } },
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
        <Typography variant="h5">{t("trash")}</Typography>
      </Box>
      <FileBreadcrumbs current={currentFolder} setCurrent={setCurrentFolder} isDeleted={YesNoEnum.Yes} />
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
