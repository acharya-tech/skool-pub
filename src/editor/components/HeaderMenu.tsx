import { Button, ButtonGroup, IconButton, MenuItem, Paper, Select, Stack, Typography } from "@mui/material"
import { ITempConstrants, PrintablePaperEnum } from "../interface"
import { ZoomIn, ZoomOut } from "@mui/icons-material"
import { FaRegSave } from "react-icons/fa";
import { RxRotateCounterClockwise } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";

type HeaderMenuProps = {
    title: string,
    paperSize: PrintablePaperEnum
    constrants: ITempConstrants
    setPaperSize: (size: PrintablePaperEnum) => void
    setZoom: (zoom: boolean) => void
    zoom: number
    onSave: (value: any) => void
    onRotate: () => void
    onClose: () => void
}
export const HeaderMenu = ({ onRotate, onSave, onClose, constrants, title, paperSize, setPaperSize, setZoom }: HeaderMenuProps) => {
    return (
        <Paper
            elevation={2}
            sx={{
                borderRadius: 0,
                position: 'absolute', zIndex: 10,
                p: 1,
                backgroundColor: 'white',
                width: '100%'
            }}>
            <Stack direction={'row'} spacing={2} justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                    <IconButton onClick={onClose}><IoMdArrowBack /></IconButton>
                    <Typography width={350} sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{title}</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                    <IconButton size="medium" onClick={onSave} color="success"><FaRegSave fontSize={18} /></IconButton>
                    {constrants.paperOrientation && constrants.paperOrientation.length > 1 && (
                        <IconButton size="medium" onClick={onRotate}><RxRotateCounterClockwise fontSize={18} /></IconButton>
                    )}
                    {constrants.paperSize && (
                        <Select
                            size='small'
                            variant='standard'
                            value={paperSize}
                            onChange={(e) => setPaperSize(e.target.value as PrintablePaperEnum)}
                        >
                            {Object.values(constrants.paperSize).map((size) => (
                                <MenuItem key={size} value={size}>
                                    {size}
                                </MenuItem>
                            ))}
                        </Select>
                    )}

                    <ButtonGroup size="small" variant="outlined">
                        <Button onClick={() => setZoom(true)}><ZoomIn /></Button>
                        <Button onClick={() => setZoom(false)}><ZoomOut /></Button>
                    </ButtonGroup>
                </Stack>
            </Stack>
        </Paper>
    )
}