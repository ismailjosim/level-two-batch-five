export type Months =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TSemesterNames = 'Autumn' | 'Summer' | 'Fall';
export type TSemesterCode = '01' | '02' | '03';

export type TAcademicSemesterCodeNameMapper = {
  [key: string]: string;
};

export interface IAcademicSemesterInterface {
  name: TSemesterNames;
  code: TSemesterCode;
  year: string;
  startMonth: Months;
  endMonth: Months;
}
