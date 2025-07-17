import { Scrollbar } from "@components/scrollbar";
import { Card, CardProps, TableContainer } from "@mui/material";
import { List, type ListProps } from "@refinedev/mui";
import { DefaultBreadcrumbs } from "../breadcrumb/breadcumb.default";

type Props = {
    isLoading?: boolean
    CardProps?: CardProps
    noCard?: boolean,
} & ListProps;

export const RefineListView = ({ children, noCard, CardProps, ...props }: Props) => {
    return (
        <List
            {...props}
            breadcrumb={props.breadcrumb == undefined ? <DefaultBreadcrumbs /> : props.breadcrumb}
            headerProps={{
                sx: {
                    padding: "5px 24px 0px",
                    display: "flex",
                    flexWrap: "wrap",
                    ".MuiCardHeader-action": {
                        alignSelf: "center",
                    },
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
                    // ...props.wrapperProps?.sx,
                },
            }}
        >
            {noCard ? (
                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        {children}
                    </TableContainer>
                </Scrollbar>
            ) : (
                <Card
                    {...{ sx: { ...CardProps?.sx, borderRadius: '0px' }, ...CardProps }}
                >
                    <Scrollbar>
                        <TableContainer sx={{ overflow: 'unset' }}>
                            {children}
                        </TableContainer>
                    </Scrollbar>
                </Card>
            )}
        </List>
    );
};
