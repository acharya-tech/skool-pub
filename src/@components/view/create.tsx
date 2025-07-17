import { Create, type CreateProps } from "@refinedev/mui";
import { Scrollbar } from "../scrollbar";
import { Card, CardProps } from "@mui/material";
import { DefaultBreadcrumbs } from "../breadcrumb/breadcumb.default";

type Props = { noCard?: boolean, cardProps?: CardProps } & CreateProps;

export const RefineCreateView = ({ children, noCard, cardProps, ...props }: Props) => {
    return (
        <Create
            {...props}
            breadcrumb={props.breadcrumb === undefined ? <DefaultBreadcrumbs /> : props.breadcrumb}
            headerProps={{
                sx: {
                    padding: "5px 24px 0px",
                    display: "flex",
                    flexWrap: "wrap",
                    ".MuiCardHeader-action": {
                        alignSelf: "center",
                    },
                    height: props.title ? "72px" : "0px",
                },
            }}
            headerButtonProps={{
                alignItems: "center",
                ...props.headerButtonProps,
            }}
            wrapperProps={{
                sx: {
                    backgroundColor: "transparent",
                    backgroundImage: "none",
                    boxShadow: "none",
                    ...props.wrapperProps?.sx,
                },
            }}
        >
            {noCard ? (children) : (
                <Card {...cardProps}>
                    <Scrollbar>
                        {children}
                    </Scrollbar>
                </Card>
            )}
        </Create>
    );
};
