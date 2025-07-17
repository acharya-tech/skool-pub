import { Box, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { DataGrid, DataGridProps, GridColumnMenu, GridColumnMenuItemProps, GridColumnMenuProps, GridFilterModel } from "@mui/x-data-grid";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

type DataGridPropsOverride = Omit<DataGridProps, "onFilterModelChange"> & {
    onFilterModelChange: (model: GridFilterModel) => void;
};
type ITableGrid = Required<
    Pick<
        DataGridPropsOverride,
        | "rows"
    // | "sortingMode"
    // | "sortModel"
    // | "onSortModelChange"
    // | "filterMode"
    // | "onFilterModelChange"
    // | "sx"
    // | "disableRowSelectionOnClick"
    // | "onStateChange"
    // | "paginationMode"
    >
> &
    Pick<
        DataGridProps,
        | "rowCount"
        | "slotProps"
        | "getCellClassName"
        | "slots"
        | "checkboxSelection"
        | "onRowSelectionModelChange"
        | "editMode"
        | "isCellEditable"
        | "paginationModel"
        | "onPaginationModelChange"
        | "filterModel"
        | "processRowUpdate"
        | "sortingMode"
        | "sortModel"
        | "onSortModelChange"
        | "filterMode"
        | "onFilterModelChange"
        | "disableColumnFilter"
        | "disableDensitySelector"
        | "disableColumnSelector"
        | "sx"
        | "disableRowSelectionOnClick"
        | "onStateChange"
        | "paginationMode"
        | "pagination"
        | "hideFooterPagination"
        | "pageSizeOptions"
        | "autoPageSize"
        | "loading"
        | "getRowClassName"
        | "rowSelectionModel"
        | "experimentalFeatures"
        | "autoHeight"
    > & {
        columns: Array<any>
        autoColumn?: boolean
    }


export function TableGrid(props: ITableGrid) {

    const columns = props.columns.map((e: any) => {
        if (e.width) {
            return e
        }
        if (e.field === "actions") {
            return {
                ...e,
                sortable: false,
                disableColumnMenu: true,
                filterable: false,
                width: 150
            }
        }
        return {
            ...e,
            flex: 1
        }
    })
    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid
                autoHeight
                density="compact"
                pageSizeOptions={[25, 50, 100]}
                {...props}
                columns={columns}


            // slots={{ columnMenu: CustomColumnMenu }}
            />
        </Box>
    );
}


function CustomColumnMenu(props: GridColumnMenuProps) {
    return (
        <GridColumnMenu
            {...props}
            slots={{
                // Add new item
                columnMenuUserItem: CustomUserItem,
            }}
            slotProps={{
                columnMenuUserItem: {
                    // set `displayOrder` for new item
                    displayOrder: 15,
                    // pass additional props
                    // myCustomValue: 'Do custom action',
                    myCustomHandler: () => alert('Custom handler fired'),
                },
            }}
        />
    );
}

function CustomUserItem(props: GridColumnMenuItemProps) {
    const { myCustomHandler, myCustomValue } = props;
    return (
        <MenuItem onClick={myCustomHandler}>
            <ListItemIcon>
                <SettingsApplicationsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{myCustomValue}</ListItemText>
        </MenuItem>
    );
}

const calculateColumnWidth = (content: string) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context?.font) {
        context.font = '16px Arial';
    }
    // Customize font settings based on your table
    const metrics = context?.measureText(content);
    return Math.ceil(metrics?.width ?? 0) + 20; // Add padding to width
};