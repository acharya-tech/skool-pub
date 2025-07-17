import { useList } from "@refinedev/core";
import { CollectionType } from "@repo/constant/enum";
import {
  REPO_COLLECTION_URL,
  REPO_STARRED_URL,
} from "@repo/constant/server.urls";
import { IRepoCollection } from "@repo/interface";

export const useFileList = (): [any, boolean] => {
  const { data, isLoading } = useList<IRepoCollection>({
    resource: REPO_COLLECTION_URL,
    meta: {
      customQuery: {
        parent_id: 1,
        type: CollectionType.File,
      },
    },
  });

  if (!data) {
    return [undefined, isLoading];
  } else {
    return [data?.data.map((e) => e.file?.url), isLoading];
  }
};
