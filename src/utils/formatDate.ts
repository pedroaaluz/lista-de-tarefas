import {format} from 'date-fns';

export const formatDate = (date: Date) => {
  const formatString = 'MM/dd/yyyy, HH:mm:ss';
  return format(date, formatString);
};
