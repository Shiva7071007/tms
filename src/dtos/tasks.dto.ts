import { Task, TaskMetrics, TaskStatus } from '@/interfaces/tasks.interface';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  status: TaskStatus;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: TaskStatus;
}
