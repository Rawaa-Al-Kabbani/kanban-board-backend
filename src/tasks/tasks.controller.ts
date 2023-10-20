import { Controller, Get, Post } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  findall(): string {
    return 'This action returns all tasks.';
  }

  @Post()
  create(): string {
    return 'This action adds a new task..';
  }
}
