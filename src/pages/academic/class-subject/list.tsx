import { RefineListView } from "@components/view";
import { ClassSubjectListTable } from "@academic/subject-class";

export default () => {
  return (
    <>
      <RefineListView
        // headerButtons={(props) => [
        //   <Button
        //     {...props.createButtonProps}
        //     variant="contained"
        //     color="inherit"
        //     key="create"
        //     onClick={create}
        //   >
        //     {t("actions.add")}
        //   </Button>,
        // ]}
      >
        <ClassSubjectListTable />
      </RefineListView>
    </>
  );
};