import {
  Action,
  MetaQuery,
  useGetToPath,
  useGo,
  useNavigation,
} from "@refinedev/core";
import { useLocation, useSearchParams } from "react-router-dom";

export const useNav = (url: string = "list", action: Action = "list") => {
  const go = useGo();
  const { pathname } = useLocation();
  const { editUrl, createUrl, showUrl } = useNavigation();
  const getToPath = useGetToPath();
  const [searchParams] = useSearchParams();

  const edit = (id: string, meta?: MetaQuery) => {
    return go({
      to: `${editUrl(url, id, meta)}`,
      query: {
        to: pathname,
      },
      options: {
        keepQuery: true,
      },
      type: "replace",
    });
  };

  const close = () => {
    return go({
      to:
        searchParams.get("to") ??
        getToPath({
          action,
        }) ??
        "",
      query: {
        to: undefined,
      },
      options: {
        keepQuery: true,
      },
      type: "replace",
    });
  };
  const create = () => {
    return go({
      to: `${createUrl(url)}`,
      query: {
        to: pathname,
      },
      options: {
        keepQuery: true,
      },
      type: "replace",
    });
  };
  const show = (id: string, meta?: MetaQuery) => {
    return go({
      to: `${showUrl(url, id, meta)}`,
      query: {
        to: pathname,
      },
      options: {
        keepQuery: true,
      },
      type: "replace",
    });
  };
  return { edit, close, create, show };
};
