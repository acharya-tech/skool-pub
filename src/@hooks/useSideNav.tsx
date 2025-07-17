import { capitalize } from "@mui/material";
import { useMenu } from "@refinedev/core";
import { NavSectionProps } from "src/components/nav-section";
import { useMainRoute } from "./useMainRoute";


export const useSideNav = ((): NavSectionProps['data'] => {
    const { menuItems } = useMenu();
    const route = useMainRoute((state: any) => state.route);
    const sideNav = transformMenu(menuItems);
    return [
        {
            subheader: capitalize(route),
            items: sideNav
        }
    ]
});

function transformMenu(input: any[]): any[] {
    return input.map((item) => ({
        title: item.label,
        path: item.route ?? item.name,
        icon: item.meta.icon,
        disabled: item.meta.disabled,
        children: item.children?.length > 0 ? transformMenu(item.children) : undefined
    }))
}

function transformMenu2(input: any[]): any[] {
    return input.map((item) => ({
        title: item.label,
        path: item.route ?? item.name,
        children: item.children?.length > 0 ? transformMenu(item.children) : undefined
    }))
}