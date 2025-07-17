import { Show } from "@refinedev/mui";
import { SubjectShow } from "@academic/subject/show";
import { useParams } from "react-router-dom";

export default () => {
  const { id } = useParams()
  return <Show
    breadcrumb={false}
    canEdit={false}
  >
    <SubjectShow />
  </Show>;
};
