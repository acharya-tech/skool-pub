import { IconButton, Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { Table } from "@mui/material"
import { ILibEBook } from "../interface"
import { useTranslate } from "@hooks/useTranslate"
import { LANG_LIBRARY } from "@common/constant"
import { DeleteOutline } from "@mui/icons-material"
import { useDelete, useInvalidate } from "@refinedev/core"
import { LIBRARY_BOOK_SHOW, LIBRARY_EBOOK_URL } from "../constant"
import { useParams } from "react-router-dom"
import { useConfirm } from "@hooks/confirm.hook"

type EBookDetailProps = {
    ebooks?: Partial<ILibEBook>[]
}
export const EBookDetail = ({ ebooks }: EBookDetailProps) => {
    const t = useTranslate(LANG_LIBRARY, "ebook");
    const { id: libraryId } = useParams()
    const { mutate } = useDelete()
    const invalidate = useInvalidate()
    const [confirmDelete, confirmEle] = useConfirm({
        onConfirm: ({ id }) => {
            handleDelete(id)
        },
        confirmTitle: t("info.confirm")
    })
    const handleDelete = (id: string) => {
        mutate({
            resource: LIBRARY_EBOOK_URL,
            id: id,
        }, {
            onSuccess: () => {
                // TODO : this is not working
                invalidate({
                    id: libraryId,
                    resource: LIBRARY_BOOK_SHOW,
                    invalidates: ['detail']
                })
            }
        })
    }
    return (
        <>
            <Table sx={{ border: '1px solid #D3D3D3' }}>
                <TableHead>
                    <TableRow>
                        <TableCell width={"7%"} sx={{ p: 1 }}>{t("fields.type")}</TableCell>
                        <TableCell width={"33%"} sx={{ p: 1 }}>{t("fields.remark")}</TableCell>
                        <TableCell width={"50%"} sx={{ p: 1 }}>{t("fields.files")}</TableCell>
                        <TableCell width={"10%"} sx={{ p: 1 }}>{t("@table.actions")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ebooks?.map((ebook) => {
                        return <TableRow key={ebook.id}>
                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{ebook.type}</TableCell>
                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>{ebook.remark}</TableCell>
                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>
                                <Stack direction={"row"} gap={2}>
                                    {ebook.files?.map((file) => {
                                        return <a href={file.url} target="_blank">{file.name}</a>
                                    })}
                                </Stack>
                            </TableCell>
                            <TableCell sx={{ p: 1, borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3' }}>
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: 'red',
                                    }}
                                    onClick={() => {
                                        confirmDelete({ id: ebook.id })
                                    }}
                                >
                                    <DeleteOutline />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
            {confirmEle}
        </>
    )
}