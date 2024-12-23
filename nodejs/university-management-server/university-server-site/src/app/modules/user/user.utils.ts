import { IAcademicSemesterInterface } from '../academicSemister/academicSemester.interface';

export const generateStudentID = (payload: IAcademicSemesterInterface) => {
  // for the first time the id will be 0000
  const currentId = (0).toString().padStart(4, '0'); // generate 4 digit number.
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
