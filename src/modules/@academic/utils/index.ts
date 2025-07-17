import {
  IAcademicTimeline,
  IPeriod,
  ISection,
  ISubject,
  ITimelineClassSection,
  ITimetableCreate,
} from "@academic/interface";
import { IStaff } from "@employee/interface";

type IGetScheduleProps = {
  sections: ISection[];
  periods: IPeriod[];
  classSection: ITimelineClassSection;
  teachers: Record<string, IStaff>;
  subjects: Record<string, ISubject>;
  schedules: ITimetableCreate;
};

export const getTimelineScheduleConverted = (
  schedule: IAcademicTimeline[]
): IGetScheduleProps => {
  let classSection: ITimelineClassSection = {};
  const periods: Record<string, IPeriod> = {};
  const teachers: Record<string, IStaff> = {};
  const subjects: Record<string, ISubject> = {};
  const schedules: ITimetableCreate = {};
  const sections: Record<string, ISection> = {};
  schedule.forEach((item) => {
    periods[item.period_id] = item.period;
    teachers[item.staff_id] = item.staff;
    subjects[item.subject_id] = item.subject;
    if (!classSection[item.class_id]) {
      classSection[item.class_id] = {
        id: item.class_id,
        sort: item.aclass.sort,
        name: item.aclass.name,
        sections: [item.section as ISection],
      };
    } else {
      classSection[item.class_id].sections.push(item.section);
    }
    sections[item.section_id] = item.section;
    item.session.week.forEach((day) => {
      schedules[
        `${item.class_id}-${item.section_id}-${item.period_id}-${day}`
      ] = {
        classId: item.class_id,
        periodId: item.period_id,
        sectionId: item.section_id,
        teacherId: item.staff_id,
        subjectId: item.subject_id,
      };
    });
  });

  Object.keys(classSection).forEach((class_id) => {
    const classSectionItem = classSection[class_id];
    const sectionIds = classSectionItem.sections.map((section) => section.id);
    const uniqueSectionIds = Array.from(new Set(sectionIds));
    const uniqueSections = classSectionItem.sections.filter((section) =>
      uniqueSectionIds.includes(section.id)
    );
    classSection[class_id] = {
      ...classSectionItem,
      sections: uniqueSections.sort((a, b) => a.name.localeCompare(b.name)),
    };
  });

  return {
    sections: Object.values(sections).sort((a, b) =>
      a.name.localeCompare(b.name)
    ),
    classSection,
    periods: Object.values(periods).sort((a, b) => a.sort - b.sort),
    teachers,
    subjects,
    schedules,
  };
};

export const getScheduleConverted = (
  schedule: IAcademicTimeline[]
): IGetScheduleProps => {
  const sections: Record<string, ISection> = {};
  const periods: Record<string, IPeriod> = {};
  const teachers: Record<string, IStaff> = {};
  const subjects: Record<string, ISubject> = {};
  const schedules: ITimetableCreate = {};

  schedule.forEach((item) => {
    sections[item.section_id] = item.section;
    periods[item.period_id] = item.period;
    teachers[item.staff_id] = item.staff;
    subjects[item.subject_id] = item.subject;
    item.session.week.forEach((day) => {
      schedules[`${item.section_id}-${item.period_id}-${day}`] = {
        classId: item.class_id,
        periodId: item.period_id,
        sectionId: item.section_id,
        teacherId: item.staff_id,
        subjectId: item.subject_id,
      };
    });
  });

  return {
    classSection: {},
    sections: Object.values(sections).sort((a, b) =>
      a.name.localeCompare(b.name)
    ),
    periods: Object.values(periods).sort((a, b) => a.sort - b.sort),
    teachers,
    subjects,
    schedules,
  };
};

interface ITimetableForTeacher {
  [key: string]: {
    class_name: string;
    section_name: string;
    subject_name: string;
  };
}

interface IGetScheduleConvertedForTeacher {
  periods: IPeriod[];
  schedules: ITimetableForTeacher;
}

export const getScheduleConvertedForTeacher = (
  schedule: IAcademicTimeline[]
): IGetScheduleConvertedForTeacher => {
  const periods: Record<string, IPeriod> = {};
  const schedules: ITimetableForTeacher = {};

  schedule.forEach((item) => {
    periods[item.period_id] = item.period;
    item.session.week.forEach((day) => {
      schedules[`${item.period_id}-${day}`] = {
        class_name: item.aclass.name,
        section_name: item.section.name,
        subject_name: item.subject.name,
      };
    });
  });

  return {
    periods: Object.values(periods).sort((a, b) => a.sort - b.sort),
    schedules,
  };
};
