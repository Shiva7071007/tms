import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Task, TaskMetrics } from '@interfaces/tasks.interface';
import { TaskService } from '@services/tasks.service';

export class TaskController {
  public task = Container.get(TaskService);

  public getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const findAllTasksData: Task[] = await this.task.findAllTask(page, limit);

      res.status(200).json(findAllTasksData);
    } catch (error) {
      next(error);
    }
  };

  public getTaskById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskId = Number(req.params.id);
      const findOneTaskData: Task = await this.task.findTaskById(taskId);

      res.status(200).json(findOneTaskData);
    } catch (error) {
      next(error);
    }
  };

  public createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskData: Task = req.body;
      const createTaskData: Task = await this.task.createTask(taskData);

      res.status(201).json(createTaskData);
    } catch (error) {
      next(error);
    }
  };

  public updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskId = Number(req.params.id);
      const taskData: Task = req.body;
      const updateTaskData: Task = await this.task.updateTask(taskId, taskData);

      res.status(200).json(updateTaskData);
    } catch (error) {
      next(error);
    }
  };

  public deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskId = Number(req.params.id);
      const deleteTaskData: Task = await this.task.deleteTask(taskId);

      res.status(200).json(deleteTaskData);
    } catch (error) {
      next(error);
    }
  };

  public getTasksMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findTasksMetrics: TaskMetrics[] = await this.task.findTasksMetrics();

      res.status(200).json(findTasksMetrics);
    } catch (error) {
      next(error);
    }
  };

  public populateTasks = async (req: Request, res: Response, next: NextFunction): Promise<Task[]> => {
    try {
      const populateTasksData: Task[] = await this.task.populateFakeTasks();
      res.status(200).json({ data: populateTasksData, message: 'populated' });
      return populateTasksData;
    } catch (error) {
      next(error);
    }
  }
}
