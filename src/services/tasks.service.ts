import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { TaskEntity } from '@entities/tasks.entity';
import { HttpException } from '@/exceptions/HttpException';
import { Task, TaskMetrics, TaskStatus } from '@interfaces/tasks.interface';
import { sortMonthYearDates } from '@/utils/dateSort';
import { faker } from '@faker-js/faker';

@Service()
@EntityRepository()
export class TaskService extends Repository<TaskEntity> {
  public async findAllTask(page, limit): Promise<Task[]> {
    const tasks: Task[] = await TaskEntity.find(
      {
        skip: (page - 1) * limit,
        take: limit,
      }
    );
    return tasks;
  }

  public async findTaskById(taskId: number): Promise<Task> {
    const findTask: Task = await TaskEntity.findOne({ where: { id: taskId } });
    if (!findTask) throw new HttpException(409, "Task doesn't exist");

    return findTask;
  }

  public async createTask(taskData: Task): Promise<Task> {
    const findTask: Task = await TaskEntity.findOne({ where: { title: taskData.title } });
    if (findTask) throw new HttpException(409, `This task ${taskData.title} already exists`);

    const createTaskData: Task = await TaskEntity.create(taskData).save();

    return createTaskData;
  }

  public async updateTask(taskId: number, taskData: Task): Promise<Task> {
    const findTask: Task = await TaskEntity.findOne({ where: { id: taskId } });
    if (!findTask) throw new HttpException(409, "Task doesn't exist");

    await TaskEntity.update(taskId, taskData);

    const updateTask: Task = await TaskEntity.findOne({ where: { id: taskId } });
    return updateTask;
  }

  public async deleteTask(taskId: number): Promise<Task> {
    const findTask: Task = await TaskEntity.findOne({ where: { id: taskId } });
    if (!findTask) throw new HttpException(409, "Task doesn't exist");

    await TaskEntity.delete({ id: taskId });
    return findTask;
  }


  public async findTasksMetrics(): Promise<any> {
    const tasksMetrics: any[] = await TaskEntity.query(`
      SELECT
      TO_CHAR("updatedAt" , 'Month YYYY') AS date,
      COUNT(CASE WHEN status = 'OPEN' THEN 1 END)::INTEGER AS open_tasks,
      COUNT(CASE WHEN status = 'IN_PROGRESS' THEN 1 END)::INTEGER AS  inprogress_tasks,
      COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END)::INTEGER AS  completed_tasks
      FROM task_entity
      GROUP BY TO_CHAR("updatedAt", 'Month YYYY')
    `);
    const transformedMetrics: TaskMetrics[] = tasksMetrics.map((item: any) => ({
      date: item.date.replace(/\s+/g, ' '),
      metrics: {
        open_tasks: item.open_tasks,
        inprogress_tasks: item.inprogress_tasks,
        completed_tasks: item.completed_tasks,
      },
    }));
    console.log(transformedMetrics)
    transformedMetrics.sort(sortMonthYearDates)
    return transformedMetrics;
  }

  /**
   * populate task table with fake data using faker
   */
  public async populateFakeTasks(): Promise<Task[]> {
    const tasks: TaskEntity[] = [];
    for (let i = 0; i < 15; i++) {
      const task: any = {
        title: faker.lorem.sentence(),
        status: faker.helpers.enumValue(TaskStatus),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      tasks.push(task);
    }
    await TaskEntity.save(tasks);
    return tasks
  }
}


