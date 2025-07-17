import {
    HttpError,
} from "@refinedev/core";
import { ATFormProps, Nullable } from "src/interfaces";
import { Card, CardContent, CardHeader} from "@mui/material";
import { IDataValue, IDataValueFormProps } from "./interface";
import { DataTypeEnum } from "./constant/enum";
import { StringForm } from "./component/string.form";
import { NumberForm } from "./component/number.form";
import { DateForm } from "./component/date.form";
import { TimeForm } from "./component/time.form";
import { DateTimeForm } from "./component/datetime.form";
import { DATAVALUE_URL } from "./constant/server.url";
import { TemplateEditor } from "src/editor";
import { JsonForm } from "./component/json.form";
import { useRefineForm } from "@hooks/useForm";

type DataValueEditFormProps = {
    template: boolean
} & ATFormProps
export const DataValueEditForm = (props: DataValueEditFormProps) => {
    const refineForm = useRefineForm<IDataValue, HttpError, Nullable<IDataValue>>({
        refineCoreProps: {
            resource: DATAVALUE_URL,
            redirect: false,
            action: 'edit',
            onMutationSuccess: props.template ? undefined : props.onClose,
        }
    });
    const dataValue = refineForm?.refineCore.query?.data?.data
    if (!dataValue) return null
    if (props.template) {
        return <TemplateEditor
            onClose={props.onClose}
            template={dataValue}
            constrants={dataValue?.constrants!}
            onSave={(value: object) => {
                refineForm.refineCore.onFinish({ ...dataValue, data_value: value })
            }} />
    }
    return (
        <Card>
            <CardHeader
                title={dataValue?.name}
            />
            <CardContent>
                {dataValue?.data_type === DataTypeEnum.String &&
                    <StringForm {...props} {...refineForm as unknown as IDataValueFormProps} />}
                {dataValue?.data_type === DataTypeEnum.Number &&
                    <NumberForm {...props} {...refineForm as unknown as IDataValueFormProps} />}
                {dataValue?.data_type === DataTypeEnum.Date &&
                    <DateForm {...props} {...refineForm as unknown as IDataValueFormProps} />}
                {dataValue?.data_type === DataTypeEnum.Time &&
                    <TimeForm {...props} {...refineForm as unknown as IDataValueFormProps} />}
                {dataValue?.data_type === DataTypeEnum.Datetime &&
                    <DateTimeForm {...props} {...refineForm as unknown as IDataValueFormProps} />}
                {dataValue?.data_type === DataTypeEnum.Template &&
                    <TimeForm {...props} {...refineForm as unknown as IDataValueFormProps} />}
                {dataValue?.data_type === DataTypeEnum.Json &&
                    <JsonForm {...props} {...refineForm as unknown as IDataValueFormProps} />}
            </CardContent>
        </Card>
    );
};
