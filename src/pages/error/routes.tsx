import { lazy } from "react";

const Page404 = lazy(() => import("./404"));
const Page500 = lazy(() => import("./500"));

export const errorRoute = [
        {
        path: "error_500",
        element: <Page500 />,
    },
    {
        path: "*",
        element: <Page404 />,
    },

]
