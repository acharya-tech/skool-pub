import { TeacherTimetable } from "@academic/timetable";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const { close } = useNav("list")
  return <TeacherTimetable action="create" onClose={close} />
};