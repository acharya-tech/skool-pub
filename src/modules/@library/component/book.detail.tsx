import { Grid2 as Grid, Typography } from "@mui/material";
import { ILibBook } from "../interface";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_LIBRARY } from "@common/constant";
import { DateLabel } from "@components/label/date.label";

interface KeyValueRowProps {
    title: string;
    value: any;
    titleXs?: number
    valueXs?: number
}

const KeyValueRow: React.FC<KeyValueRowProps> = ({ titleXs, valueXs, title, value }) => {
    return (
        <>
            <Grid
                size={titleXs ?? 4}
            >
                <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                    {title}
                </Typography>
            </Grid>
            <Grid
                size={valueXs ?? 6}
            >
                {(typeof value === "undefined" || typeof value !== "object") ? <Typography variant="body2">: {value}</Typography> : value}
            </Grid>
        </>
    );
};

type BookDetailViewProps = {
    book: ILibBook
}
export const BookDetailView = ({ book }: BookDetailViewProps) => {
    const t = useTranslate(LANG_LIBRARY, "book");
    return <Grid container spacing={2} padding={2}>

        <Grid size={6} >
            <Grid container spacing={1}>
                <KeyValueRow
                    title={t("fields.title")}
                    value={book?.title}
                />
                <KeyValueRow
                    title={t("fields.classification")}
                    value={book?.classification}
                />
                <KeyValueRow
                    title={t("fields.publish_date")}
                    value={<DateLabel date={book?.publish_date} prefix={<>: &nbsp;</>} />}
                />
                <KeyValueRow
                    title={t("fields.publisher")}
                    value={book?.publisher?.name}
                />
                <KeyValueRow
                    title={t("fields.edition")}
                    value={book?.edition}
                />
                <KeyValueRow
                    title={t("fields.language")}
                    value={book?.language}
                />
                <KeyValueRow
                    title={t("fields.type")}
                    value={book?.book_type}
                />
            </Grid>
        </Grid>
        <Grid size={6} >
            <Grid container spacing={1}>
                <KeyValueRow
                    title={t("fields.cutter_no")}
                    value={book?.cutter_no}
                />
                <KeyValueRow
                    title={t("fields.min_qty")}
                    value={book?.shortage_threshold}
                />

                <KeyValueRow
                    title={t("fields.series_no")}
                    value={book?.series_no}
                />
                <KeyValueRow
                    title={t("fields.is_reference")}
                    value={book?.is_reference}
                />
                <KeyValueRow
                    title={t("fields.price")}
                    value={book?.price}
                />
                <KeyValueRow
                    title={t("fields.isbn")}
                    value={book?.isbn}
                />
                <KeyValueRow
                    title={t("fields.lccn")}
                    value={book?.lccn}
                />
            </Grid>
        </Grid>
        <Grid size={6} >
            <Grid container spacing={1}>

                <KeyValueRow
                    title={t("fields.pages")}
                    value={book?.pages}
                />
                <KeyValueRow
                    title={t("fields.authors")}
                    value={book?.authors.map((author) => author.name).join(", ")}
                />
                <KeyValueRow
                    title={t("fields.biblography")}
                    value={book?.biblography}
                />

                <KeyValueRow
                    title={t("fields.series")}
                    value={book?.series}
                />
                <KeyValueRow
                    title={t("fields.subject")}
                    value={book?.subject.map((subject) => subject.name).join(", ")}
                />
            </Grid>
        </Grid>
    </Grid>
}