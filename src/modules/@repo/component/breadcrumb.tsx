import Breadcrumbs from '@mui/material/Breadcrumbs';
import MuiLink from '@mui/material/Link';
import { LinkProps } from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IRepoCollection } from '../interface';
import { useEffect, useRef, useState } from 'react';
import { HomeOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_REPO } from '@common/constant';
import { REPO_COLLECTION_URL } from '../constant/server.urls';
import { BASE_URL } from '@common/options';
import { YesNoEnum } from '@common/all.enum';


type MLinkProps = LinkProps & {
    onClick: (e: any) => void
}

const Link = (props: MLinkProps) => {
    const { onClick, ...rest } = props
    return <div
        onClick={onClick}
    >
        <MuiLink
            {...rest}
            href="#"
        />
    </div>
}

type FileBreadcrumbsProps = {
    current?: IRepoCollection
    isDeleted?:YesNoEnum
    setCurrent: (target: IRepoCollection | undefined) => void
}

function splitNav(nav: IRepoCollection[], order: string[]) {
    const A = order.map((id) => nav.find((item) => item.id == id)).filter(e => !!e);
    // const A = nav
    const B: IRepoCollection[] = [];
    const C: IRepoCollection[] = [];
    if (A.length > 5) {
        const firstTwo = A.slice(0, 2); // First 2 items
        const lastTwo = A.slice(-2);   // Last 2 items
        const remaining = A.slice(2, -2); // All items except the first 2 and last 2

        A.length = 0; // Clear array A
        A.push(...firstTwo); // Update A with first 2 items
        B.push(...remaining); // Add remaining items to B
        C.push(...lastTwo);   // Add last 2 items to C
    }
    return [A, B, C]
}

const fetchBc = async (path: string[],param:Record<string,string>={}) => {
    const params= [...(path.map(e => "ids=" + e)),...(Object.keys(param).map(e=>`${e}=${param[e]}`))].join("&")
    return await fetch(`${BASE_URL}/${REPO_COLLECTION_URL}?${params}`,);
}

export function FileBreadcrumbs({ current, setCurrent,isDeleted=YesNoEnum.No}: FileBreadcrumbsProps) {
    const t = useTranslate(LANG_REPO)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const path = useRef<string[]>([])
    const [data, setData] = useState<IRepoCollection[]>([])
    const open = Boolean(anchorEl);
    useEffect(() => {
        const pth = [...(current?.path?.split(".") ?? []), current?.id].filter(e => !!e) as unknown as string[]
        if (pth.length > 0) {
            const params:Record<string,string>=isDeleted==YesNoEnum.Yes?{deleted_at:'not null'}:{} 
            path.current = pth
            fetchBc(pth,params)
                .then(e => e.json())
                .then(e => {
                    setData(e.elements)
                })
        }
    }, [current])

    if (!current) {
        return <Breadcrumbs aria-label="breadcrumbs">
            <Link
                onClick={(e) => setCurrent(undefined)}>
                <HomeOutlined />
            </Link>
        </Breadcrumbs>
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
        if (event) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!data) {
        return <></>
    }

    const [first, second, third] = splitNav(data, path.current)

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                aria-labelledby="with-menu-demo-breadcrumbs"
            >
                {second.map((coll: IRepoCollection) => {
                    return <MenuItem
                        key={coll.id}
                        onClick={() => {
                            setCurrent(coll)
                            handleClose()
                        }}>
                        <Typography whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{coll?.label}</Typography>
                    </MenuItem>
                })}
            </Menu>
            <Breadcrumbs aria-label="breadcrumbs">
                <Link
                    onClick={(e) => setCurrent(undefined)}>
                    <HomeOutlined />
                </Link>
                {first.map((coll: IRepoCollection) => {
                    return <Link
                        key={coll.id}
                        onClick={() => {
                            setCurrent(coll)
                        }} style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component={"span"} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{coll?.label}</Typography>
                    </Link>
                })}
                {second.length > 0 && (
                    <IconButton color="primary" size="small" onClick={handleClick}>
                        <MoreHorizIcon />
                    </IconButton>
                )}
                {third.map((coll: IRepoCollection) => {
                    return <Link
                        key={coll.id}
                        onClick={() => {
                            setCurrent(coll)
                        }} style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component={"span"} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{coll?.label}</Typography>
                    </Link>
                })}
            </Breadcrumbs>
        </>
    );
}