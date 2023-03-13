import {parse} from 'date-fns';
import type {TaskInterface} from '../types/task';

export const sortByDate = (
  tasks: TaskInterface[],
  order: 'asc' | 'desc',
): TaskInterface[] => {
  const sortedTasks = tasks.sort((a, b) => {
    const dateA = parse(a.date, 'MM/dd/yyyy, HH:mm:ss', new Date());
    const dateB = parse(b.date, 'MM/dd/yyyy, HH:mm:ss', new Date());

    if (order === 'asc') {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  });

  return sortedTasks;
};
