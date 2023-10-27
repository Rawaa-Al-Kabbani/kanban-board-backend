export enum TaskStatus {
  New = 'New',
  Active = 'Active',
  InProgress = 'In progress',
  Done = 'Done',
  Closed = 'Closed',
  Cancelled = 'Cancelled',
}

export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
};

export type NewTask = {
  title: string;
  status: TaskStatus;
};
