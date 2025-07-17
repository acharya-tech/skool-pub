import { create } from "zustand";
// import { MAIN_DASHBOARD } from "@dashboard/constant/urls";

export const useMainRoute = create((set) => {
    const route = window.localStorage.getItem("MAIN_ROUTE") ?? "MAIN_DASHBOARD"
    return {
        route: route,
        getItem: () => {
            return window.localStorage.getItem("MAIN_ROUTE") ?? "MAIN_DASHBOARD"
        },
        updateRoute: (route: string) => {
            window.localStorage.setItem("MAIN_ROUTE", route)
            return set(() => {
                return { route }
            })
        }
    };
});