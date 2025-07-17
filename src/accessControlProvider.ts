import { IPermission } from "@app/interface";
import { USER_ACCESS, USER_DETAIL } from "@common/options";
import { AccessControlProvider } from "@refinedev/core";
import { exclude_feature } from "./assets/data/custom_feature";

type PermissionMap = Record<string, boolean>;

const buildPermissionMap = (): PermissionMap => {
  try {
    const permissions = JSON.parse(
      localStorage.getItem(USER_ACCESS) ?? "[]"
    ) as IPermission[];

    const map: PermissionMap = {};
    for (const perm of permissions) {
      for (const access of perm.access) {
        map[`${perm.path}:${access}`] = true;
      }
    }
    return map;
  } catch {
    return {};
  }
};

const permissionMap: PermissionMap = buildPermissionMap();

const normalizeAccess = (action: string): string => {
  if (action === "list" || action === "show") return "Read";
  return action.charAt(0).toUpperCase() + action.slice(1);
};

const normalizeResource = (resource?: string): string => {
  if (!resource) return "";
  return resource.startsWith("/") ? resource : `/${resource}`;
};

const getUserDetail = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_DETAIL) ?? "{}");
  } catch {
    return {};
  }
};

const userDetail: any = getUserDetail();

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action, params }) => {
    resource = normalizeResource(resource);
    const isExclude = exclude_feature.some((feature) =>
      resource.startsWith(feature)
    );
    if (isExclude) {
      return {
        can: false,
        reason: "Unauthorized",
      };
    }
    if (userDetail.hasAdmin) {
      return {
        can: true,
        reason: "Authorized",
      };
    }
    action = normalizeAccess(action);
    const key = `${resource}:${action}`;
    const hasPermission = permissionMap[key] === true;
    return {
      can: hasPermission,
      reason: hasPermission ? "Authorized" : "Unauthorized",
    };
  },
  options: {
    buttons: {
      hideIfUnauthorized: true,
    },
  },
};
