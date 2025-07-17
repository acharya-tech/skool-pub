import * as React from 'react';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_INVENTORY, LANG_STUDENT } from '@common/constant';
import { IconButton, ListItem, Stack } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { IStaff } from '../interface';

function not(a: readonly IStaff[], b: readonly IStaff[]) {
    return a.filter((value) => !b.includes(value));
}

function intersection(a: readonly IStaff[], b: readonly IStaff[]) {
    return a.filter((value) => b.includes(value));
}

function union(a: readonly IStaff[], b: readonly IStaff[]) {
    return [...a, ...not(b, a)];
}

type TransferListProps = {
    disabled?: boolean
    memberList: IStaff[],
    defaultList: IStaff[],
    onSave: (memberList: IStaff[]) => void
}
export default function TransferList({ disabled: disableTransfer, memberList, defaultList, onSave }: TransferListProps) {
    const t = useTranslate(LANG_INVENTORY, "groups");
    const [checked, setChecked] = React.useState<readonly IStaff[]>([]);
    const [left, setLeft] = React.useState<readonly IStaff[]>([]);
    const [right, setRight] = React.useState<readonly IStaff[]>([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: IStaff) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const numberOfChecked = (items: readonly IStaff[]) =>
        intersection(checked, items).length;

    const handleToggleAll = (items: readonly IStaff[]) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleDelete = (item: IStaff) => {
        setLeft(left.concat([item]));
        setRight(not(right, [item]));
    };

    const handleReset = () => {
        setLeft(memberList || [])
        setRight(defaultList || [])
        setChecked([])
    }
    React.useEffect(() => {
        handleReset()
    }, [memberList])

    const customList = (title: React.ReactNode, items: readonly IStaff[], side: 'left' | 'right') => (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0 || disableTransfer}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List
                sx={{
                    height: 400,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value: IStaff) => {
                    const labelId = `transfer-list-all-item-${value}-label`;
                    return (
                        <ListItemButton
                            key={value.id}
                            role="listitem"
                            disableRipple={disableTransfer}
                            onClick={disableTransfer ? () => { } : handleToggle(value)}
                        >
                            <>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.includes(value)}
                                        tabIndex={-1}
                                        disabled={!!disableTransfer}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText sx={{ width: '90%' }} id={labelId} primary={`${value?.emp_code} / ${value?.name} / ${value?.post?.name}`} />
                            </>
                            {side == 'right' && (
                                <ListItem sx={{ justifyContent: 'flex-end' }}>{<IconButton color='error' onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(value)
                                }}><DeleteOutline /></IconButton>}</ListItem>
                            )}
                        </ListItemButton>
                    );
                })}
            </List>
        </Card>
    );

    return (
        <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <Grid size={5}>{customList(t('labels.from'), left, 'left')}</Grid>
            <Grid size={2}>
                <Stack direction="column" alignItems='center'>
                    <Button disabled={right.length == 0 || disableTransfer} color='warning' variant="contained" sx={{ mb: 5 }} onClick={handleReset}>
                        {t("actions.reset")}
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0 || disableTransfer}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0 || disableTransfer}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <LoadingButton loading={disableTransfer} disabled={right.length == 0 || disableTransfer} variant="contained" sx={{ mt: 5 }} onClick={() => {
                        onSave([...right])
                    }}>
                        {t("actions.transfer")}
                    </LoadingButton>
                </Stack>
            </Grid>
            <Grid size={5}>{customList(t('labels.to'), right, 'right')}</Grid>
        </Grid>
    );
}