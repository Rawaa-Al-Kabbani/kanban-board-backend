import { Controller, Get } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

// Controller is for REST API
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findall(): Promise<Task[]> {
    const result = await this.tasksService.findAll();
    return result;
  }
}
