import { TaskMetrics } from "@/interfaces/tasks.interface";

export function sortMonthYearDates(a: TaskMetrics, b: TaskMetrics): number {
  const [monthA, yearA] = a.date.split(' ');
  const [monthB, yearB] = b.date.split(' ');

  const yearComparison = yearA.localeCompare(yearB);

  if (yearComparison === 0) {
    const monthOrder = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);

  }
  return yearComparison;
}
