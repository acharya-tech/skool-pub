import { Box, List, ListItem, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import Sortable from 'sortablejs';

export const SubjectShow = () => {
    const sortableContainer = useRef(null);

    const nestedItems = [
        {
            id: 1,
            name: 'Item 1',
            children: [{ id: 4, name: 'Item 1.1' }, { id: 5, name: 'Item 1.2' }],
        },
        { id: 2, name: 'Item 2', children: [{ id: 6, name: 'Item 2.1' }] },
        { id: 3, name: 'Item 3', children: [] },
    ];

    useEffect(() => {
        if (sortableContainer.current) {
            // Initialize SortableJS for the main container
            Sortable.create(sortableContainer.current, {
                group: 'nested', // Allow nested sorting
                animation: 150,
                fallbackOnBody: true,
                swapThreshold: 0.65,
                onEnd: (/**Event*/evt) => {
                    // Handle sorting logic here
                    console.log('Sorted item:', evt.item);
                },
            });

            // For nested lists, initialize SortableJS for each child container
            const nestedLists = document.querySelectorAll('.nested-sortable');
            nestedLists.forEach((list: any) => {
                Sortable.create(list, {
                    group: 'nested', // Same group to allow drag-and-drop between levels
                    animation: 150,
                });
            });
        }
    }, []);

    const renderNestedItems = (children: any) => (
        <List className="nested-sortable">
            {children.map((child: any) => (
                <ListItem key={child.id} sx={{ py: 0.5, border: "1px solid #CCC", backgroundColor: "#64b9f587" }}>
                    <Typography>{child.name}</Typography>
                    {child.children && child.children.length > 0 && (
                        <ul>{renderNestedItems(child.children)}</ul>
                    )}
                </ListItem>
            ))}
        </List>
    );

    return (
        <Box>
            <Box ref={sortableContainer} >
                {nestedItems.map((item) => (
                    <Box key={item.id}>
                        <Typography sx={{ py: 0.5, border: "1px solid #CCC", backgroundColor: "#EEE" }}>{item.name}</Typography>
                        {item.children && item.children.length > 0 && (
                            <List>
                                {renderNestedItems(item.children)}
                            </List>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};