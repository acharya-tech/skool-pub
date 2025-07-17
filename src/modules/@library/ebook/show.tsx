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
import { LIBRARY_BOOK_URL } from "../constant";
import { EBookDetail } from "../component/ebook.detail";
import { BasicModal } from "@components/modal/basic.modal";
import { AddEbook } from "../component/add.ebook";
import { useState } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useRefineShow } from "@hooks/useShow";

export const EBookView = () => {
  const t = useTranslate(LANG_LIBRARY, "book");
  const {
    query: { data },
  } = useRefineShow<ILibBook>({
    meta: { customQuery: { ebooks: true, authors: true, publisher: true, subject: true } },
    resource: LIBRARY_BOOK_URL,
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
    </>
  );
};
