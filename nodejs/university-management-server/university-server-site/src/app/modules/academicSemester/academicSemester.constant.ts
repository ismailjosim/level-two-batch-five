import {
  Months,
  TAcademicSemesterCodeNameMapper,
  TSemesterCode,
  TSemesterNames,
} from './academicSemester.interface';

export const AcademicSemesterMonths: Months[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterNames: TSemesterNames[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const AcademicSemesterCode: TSemesterCode[] = ['01', '02', '03'];

export const AcademicSemesterCodeNameMapper: TAcademicSemesterCodeNameMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
