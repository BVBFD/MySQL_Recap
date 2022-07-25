import { EmployeeType } from './App';

export const checkNullTaskData = (infoData?: EmployeeType) => {
  return infoData?.hour === null &&
    infoData?.taskId === null &&
    infoData?.taskName === null &&
    infoData?.userId === null
    ? false
    : true;
};
