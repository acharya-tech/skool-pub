import { useShow } from "@refinedev/core";
import { ILibBook } from "../interface";
import {
  Paper,
  Divider,
  Typography,
  Stack,
} from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_LIBRARY } from "@common/constant";
import { BookDetailView } from "../component/book.detail";
import LoadingWrapper from "@components/other/loading";
import { BookCopyDetail } from "../component/book.copy.detail";
import { BookTypeEnum, LIBRARY_BOOK_URL } from "../constant";
import { EBookDetail } from "../component/ebook.detail";
import { BasicModal } from "@components/modal/basic.modal";
import { AddEbook } from "../component/add.ebook";
import { useState } from "react";
import { Button } from "@mui/material";
import { useRefineShow } from "@hooks/useShow";

export const BookView = () => {
  const t = useTranslate(LANG_LIBRARY, "book");
  const {
    query: { data },
  } = useRefineShow<ILibBook>({
    resource: LIBRARY_BOOK_URL,
    meta: { customQuery: { copies: true, ebooks: true, authors: true, publisher: true, subject: true } },
  });

  const record = data?.data;
  const [openEbook, setOpenEbook] = useState(false)
  return (
    <>
      <Paper elevation={4} sx={{ padding: 2 }}>
        <Typography variant="h5">{t("titles.detail")}</Typography>
        <LoadingWrapper value={record}>
          <BookDetailView book={record!} />
        </LoadingWrapper>
      </Paper>
      <Divider sx={{ my: 2 }} />
      {(record?.book_type == BookTypeEnum.Book || record?.book_type == BookTypeEnum.Book_Ebook) && (
        <Paper elevation={4} sx={{ padding: 2 }}>
          <Typography variant="h5">{t("titles.copies")}</Typography>
          <LoadingWrapper value={record}>
            <BookCopyDetail bookCopies={record?.copies!} />
          </LoadingWrapper>
        </Paper>
      )}
      {(record?.book_type == BookTypeEnum.Ebook || record?.book_type == BookTypeEnum.Book_Ebook) && (
        <Paper elevation={4} sx={{ padding: 2 }}>
          <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
            <Typography variant="h5">{t("titles.ebooks")}</Typography>
            <Button variant="outlined" onClick={() => setOpenEbook(true)} >{t("titles.addEbook")}</Button>
          </Stack>
          <LoadingWrapper value={record}>
            <EBookDetail ebooks={record?.ebooks!} />
          </LoadingWrapper>
          <BasicModal
            open={openEbook}
            onClose={() => setOpenEbook(false)}
            title={t("titles.addEbook")}
          >
            <AddEbook action="edit" id={record?.id!} onClose={() => setOpenEbook(false)} />
          </BasicModal>
        </Paper>
      )}

    </>
  );
};
