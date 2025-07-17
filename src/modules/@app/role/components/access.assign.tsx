import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Checkbox,
    IconButton,
    Collapse,
    Box,
    TableContainer,
    Typography,
    Stack,
    Button,
    Card,
    CardHeader,
    CardContent
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { CanAccess, useOne, useUpdate } from "@refinedev/core";
import { IApplicationResources, IPermission, IRoles } from "@app/interface";
import { RoleAccessEnum } from "@app/constant/enums";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_APP } from "@common/constant";
import { APP_ROLE_URL } from "@app/constant";

import { useMemo } from "react";

// Memoize once at the top-level
const pathCache = new WeakMap();

const getAllPaths = (node: any) => {
    if (pathCache.has(node)) {
        return pathCache.get(node);
    }

    let paths = [node.path];
    if (node.children) {
        for (const child of node.children) {
            paths = paths.concat(getAllPaths(child));
        }
    }

    pathCache.set(node, paths);
    return paths;
};

const permissions = Object.keys(RoleAccessEnum);

const TreeRow = ({ node, depth = 0, checkedMap, setCheckedMap }: any) => {
    const [open, setOpen] = useState(false);
    const hasChildren = Array.isArray(node.children);
    const allPaths = getAllPaths(node);

    const handlePermissionCheck = (path: any, permission: any) => (e: any) => {
        const checked = e.target.checked;
        const newMap: any = { ...checkedMap };
        if (hasChildren || permission === "all") {
            for (const p of getAllPaths(node)) {
                permissions.forEach((perm) => {
                    if (permission === "all" || perm === permission) {
                        if (checked) {
                            newMap[p + ":" + perm] = true;
                        } else {
                            delete newMap[p + ":" + perm];
                        }
                    }
                });
            }
        } else {
            if (checked) {
                newMap[path + ":" + permission] = checked;
            } else {
                delete newMap[path + ":" + permission]
            }
        }
        setCheckedMap(newMap);
    };

    const isPermissionChecked = (perm: any) => allPaths.every((p: any) => checkedMap[p + ":" + perm]);
    const isPermissionIndeterminate = (perm: any) => allPaths.some((p: any) => checkedMap[p + ":" + perm]) && !isPermissionChecked(perm);

    const allChecked = permissions.every((perm) => isPermissionChecked(perm));
    const someChecked = permissions.some((perm) => isPermissionChecked(perm) || isPermissionIndeterminate(perm));

    return (
        <>
            <TableRow sx={{ height: 32, backgroundColor: depth === 0 ? '#f9f9f9' : depth === 1 ? '#f1f1f1' : '#e9e9e9' }}>
                <TableCell>
                    <Box display="flex" alignItems="center" sx={{ pl: depth * 8 }}>
                        {hasChildren && (
                            <IconButton size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                            </IconButton>
                        )}
                        <span style={{ fontSize: "0.875rem" }}>{node.title}</span>
                    </Box>
                </TableCell>
                <TableCell align="right">
                    <Checkbox
                        checked={allChecked}
                        indeterminate={!allChecked && someChecked}
                        onChange={handlePermissionCheck(node.path, "all")}
                        size="small"
                    />
                </TableCell>
                {permissions.map((perm) => (
                    <TableCell key={perm} align="right">
                        <Checkbox
                            checked={isPermissionChecked(perm)}
                            indeterminate={isPermissionIndeterminate(perm)}
                            onChange={handlePermissionCheck(node.path, perm)}
                            size="small"
                        />
                    </TableCell>
                ))}
            </TableRow>
            {hasChildren && open && (
                node.children.map((child: any, idx: any) => (
                    <TreeRow
                        key={idx}
                        node={child}
                        depth={depth + 1}
                        checkedMap={checkedMap}
                        setCheckedMap={setCheckedMap}
                    />
                ))
            )}
        </>
    );
};
type TreeTableProps = {
    role?: IRoles
}
export default function TreeTable({ role }: TreeTableProps) {
    const t = useTranslate(LANG_APP, "roles")
    const { data: treeDataRaw } = useOne<IApplicationResources>({
        resource: "/public/resources/files/access.json?",
        id: "1"
    })

    const treeData = treeDataRaw?.data
    const [checkedMap, setCheckedMap] = useState<IApplicationResources>({});

    useEffect(() => {
        console.log(role?.permissions, !!role?.permissions)
        if (role?.permissions) {
            const newMap: any = {}
            for (const perm of role.permissions) {
                perm.access.forEach((p) => {
                    newMap[perm.path + ":" + p] = true
                })
            }
            console.log(newMap, "newMap")
            setCheckedMap(newMap)
        }
    }, [role])
    const nodes = Object.values(treeDataRaw?.data ?? {});

    const { mutate, isLoading } = useUpdate()

    const toggleColumn = (perm: any) => (e: any) => {
        const checked = e.target.checked;
        const newMap: any = { ...checkedMap };
        for (const key in treeData) {
            const allPaths = getAllPaths(treeData[key]);
            for (const p of allPaths) {
                if (checked) {
                    newMap[p + ":" + perm] = true;
                } else {
                    delete newMap[p + ":" + perm];
                }
            }
        }
        setCheckedMap(newMap);
    };

    const toggleAll = (e: any) => {
        const checked = e.target.checked;
        const newMap: any = { ...checkedMap };
        for (const key in treeData) {
            const allPaths = getAllPaths(treeData[key]);
            for (const p of allPaths) {
                permissions.forEach((perm) => {
                    if (checked) {
                        newMap[p + ":" + perm] = true;
                    } else {
                        delete newMap[p + ":" + perm];
                    }
                });
            }
        }
        setCheckedMap(newMap);
    };

    const isColumnChecked = (perm: any) => {
        const all = [];
        for (const key in treeData) {
            all.push(...getAllPaths(treeData[key]));
        }
        return all.every((p) => checkedMap[p + ":" + perm]);
    };

    const handleUpdate = () => {
        const newMap: any = {}
        for (const cm in checkedMap) {
            const [path, access] = cm.split(":")
            if (newMap[path]) {
                const nmp = { ...newMap[path] }
                nmp.access.push(access)
                newMap[path] = nmp
            } else {
                newMap[path] = { path, access: [access] }
            }
        }
        mutate({
            id: role?.id,
            resource: APP_ROLE_URL,
            values: {
                permissions: Object.values(newMap)
            }
        })
    }
    return (
        <Card>
            <CardHeader title={t("titles.access_assign")}
                action={
                    <CanAccess action="update">
                        <Button variant="contained" onClick={handleUpdate} loading={isLoading}>
                            {t("actions.update")}
                        </Button>
                    </CanAccess>
                }
            />

            <CardContent>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ height: 36 }}>
                                <TableCell>Feature</TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" alignItems="center" justifyContent={"end"}>
                                        <Typography variant="body2">All</Typography>
                                        <Checkbox
                                            checked={permissions.every((perm) => isColumnChecked(perm))}
                                            indeterminate={permissions.some((perm) => isColumnChecked(perm)) && !permissions.every((perm) => isColumnChecked(perm))}
                                            onChange={toggleAll}
                                            size="small"
                                        />
                                    </Stack>
                                </TableCell>
                                {permissions.map((perm) => (
                                    <TableCell key={perm} align="right">
                                        <Stack direction="row" alignItems="center" justifyContent={"end"}>
                                            <Typography variant="body2">{perm}</Typography>
                                            <Checkbox
                                                checked={isColumnChecked(perm)}
                                                onChange={toggleColumn(perm)}
                                                size="small"
                                            />
                                        </Stack>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {nodes.map((node, index) => (
                                <TreeRow
                                    key={index}
                                    node={node}
                                    checkedMap={checkedMap}
                                    setCheckedMap={setCheckedMap}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}
