import { IconButton, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { Table } from "@mui/material"
import { ILibBookCopy } from "../interface"
import { useTranslate } from "@hooks/useTranslate"
import { LANG_LIBRARY } from "@common/constant"
import { NotSetLabel } from "@components/label/notset.label"
import { BookCopyStatus } from "./common"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { BasicModal } from "@components/modal/basic.modal"
import { BookCopyForm } from "./_copy_form"
import { useState } from "react"

type BookCopyDetailProps = {
    bookCopies?: Partial<ILibBookCopy>[]
}
export const BookCopyDetail = ({ bookCopies }: BookCopyDetailProps) => {
    const [open, setOpen] = useState<string | null>(null);
    const t = useTranslate(LANG_LIBRARY, "bookCopy");
    return (
        <>
            <Table sx={{ border: '1px solid #D3D3D3' }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ p: 1 }}>{t("fields.accession_no")}</TableCell>
                        <TableCell sx={{ p: 1 }}>{t("fields.edition")}</TableCell>
                        <TableCell sx={{ p: 1 }}>{t("fields.price")}</TableCell>
                        <TableCell sx={{ p: 1 }}>{t("fields.is_gifted")}</TableCell>
                        <TableCell sx={{ p: 1 }}>{t("fields.status")}</TableCell>
                        <TableCell sx={{ p: 1 }}>{t("fields.issued_to")}</TableCell>
                        <TableCell sx={{ p: 1 }}>{t("fields.issue_date")}</TableCell>
                        <TableCell sx={{ p: 1 }}>{t("@table.actions")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookCopies?.map((bookCopy) => {
                        return <TableRow key={bookCopy.id}>
                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{bookCopy.accession_no}</TableCell>
                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{bookCopy.edition}</TableCell>
                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{bookCopy.price}</TableCell>
                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{bookCopy.is_gifted}</TableCell>
                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}><BookCopyStatus status={bookCopy.status} /></TableCell>
                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{bookCopy.takenBy?.name ?? <NotSetLabel />}</TableCell>
                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{bookCopy.taken_date ?? <NotSetLabel />}</TableCell>
                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>
                                <IconButton size="small" onClick={() => { setOpen(bookCopy?.id!) }}><EditOutlinedIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
            {Boolean(open) &&
                <BasicModal
                    open={true}
                    onClose={() => { setOpen(null) }}
                >
                    <BookCopyForm action="edit" id={open} onClose={() => { setOpen(null) }} />
                </BasicModal>
            }

        </>
    )
}