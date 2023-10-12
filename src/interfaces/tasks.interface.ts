export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface Task {
  id?: number;
  title: string;
  status: TaskStatus;
}

export interface Metric {
  open_tasks: number;
  inprogress_tasks: number;
  completed_tasks: number;
}

export interface TaskMetrics {
  date: string;
  metrics: Metric;
}

