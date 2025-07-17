import { useShow } from "@refinedev/core";
import { ILibBookCopy } from "../interface";
import {
  Paper,
  Divider,
  Typography,
} from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_LIBRARY } from "@common/constant";
import { BookDetailView } from "../component/book.detail";
import LoadingWrapper from "@components/other/loading";
import { BookCopyDetail } from "../component/book.copy.detail";
import { LIBRARY_BOOK_COPY_URL } from "@library/constant";
import { useRefineShow } from "@hooks/useShow";

export const BookCopyView = () => {
  const t = useTranslate(LANG_LIBRARY, "book");
  const {
    query: { data },
  } = useRefineShow<ILibBookCopy>({
    resource: LIBRARY_BOOK_COPY_URL,
    meta: { customQuery: { authors: true, publisher: true, subject: true } },
  });

  const record = data?.data;
  return (
    <>
      <Paper elevation={4} sx={{ padding: 2 }}>
        <Typography variant="h5">{t("titles.detail")}</Typography>
        <LoadingWrapper value={record}>
          <BookDetailView book={record?.book!} />
        </LoadingWrapper>
      </Paper>
      <Divider sx={{ my: 2 }} />
      <Paper elevation={4} sx={{ padding: 2 }}>
        <Typography variant="h5">{t("titles.copies")}</Typography>
        <LoadingWrapper value={record}>
          <BookCopyDetail bookCopies={[record!]} />
        </LoadingWrapper>
      </Paper>
    </>
  );
};
