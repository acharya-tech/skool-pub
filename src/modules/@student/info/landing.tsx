import { HttpError, useList } from "@refinedev/core";
import { useNavigate, useParams } from "react-router-dom"
import { IStudentInfo } from "../interface";
import { STUDENT_CURRENT_VIEW, STUDENT_INFO_URL } from "../constant";
import { getQueryParam } from "@utils/other";
import Error500 from "@components/error/Error500";
import LoadingComponent from "@components/other/loading";

export const StudentLocator = () => {
    const { id } = useParams()
    const { data, isLoading } = useList<IStudentInfo, HttpError>({
        meta: { customQuery: {
            
             id, 
            // regid: id, 
            //  uni_reg: id
             }
            },
        resource: STUDENT_INFO_URL,
    });
    const navigate = useNavigate()
    if (data?.data?.length && data.data.length > 0) {
        navigate('/' + getQueryParam(STUDENT_CURRENT_VIEW, { id: data.data[0].id, programid: data.data[0]?.program_id }))
        return <></>
    }
    return <LoadingComponent value={!isLoading} loadingText="Loading">
        <Error500 title="Student not found" description={`Student with parameter '${id}' not found`} />
    </LoadingComponent>

}